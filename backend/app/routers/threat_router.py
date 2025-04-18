# app/routers/threat_router.py

from fastapi import APIRouter, HTTPException
from typing import List
from bson import ObjectId

from app.schemas.threat import ThreatCreate, ThreatResponse
from app.utils.db import get_mongo_db
from app.enrichment.nlp_enricher import enrich_text
from app.correlation.correlator import Correlator
from app.utils.logger import get_logger

logger = get_logger(__name__)
router = APIRouter()

@router.post("/", response_model=ThreatResponse, summary="Create a new threat event")
async def create_threat(threat: ThreatCreate):
    """
    Insert a new threat event into MongoDB, enrich it (extract IOCs),
    store the IOCs, and correlate them in Neo4j.
    """
    db = get_mongo_db()

    # Build base document
    doc = {
        "title": threat.title,
        "description": threat.description,
        "raw_report": threat.raw_report,
        "iocs": [],
        "created_at": threat.raw_report.get("data", {}).get("attributes", {}).get("creation_date")
                     or threat.raw_report.get("meta", {}).get("created_at")
    }

    # Insert into MongoDB
    result = await db.threats.insert_one(doc)
    event_id = str(result.inserted_id)
    logger.info(f"Inserted threat event {event_id}")

    # Enrichment: extract IOCs from the raw report text
    enrichment = enrich_text(str(threat.raw_report))
    iocs = enrichment.get("iocs", [])

    # Update document with extracted IOCs
    if iocs:
        await db.threats.update_one(
            {"_id": result.inserted_id},
            {"$set": {"iocs": iocs}}
        )
        logger.info(f"Updated event {event_id} with IOCs: {iocs}")

    # Correlation: link each IOC to this threat in Neo4j
    correlator = Correlator()
    for ioc in iocs:
        correlator.correlate_ioc(ioc, {"event_id": event_id})

    # Fetch and return the stored threat
    stored = await db.threats.find_one({"_id": result.inserted_id})
    if not stored:
        raise HTTPException(status_code=500, detail="Failed to retrieve stored threat")
    stored["_id"] = str(stored["_id"])
    return ThreatResponse(**stored)


@router.get("/", response_model=List[ThreatResponse], summary="List threat events")
async def list_threats(skip: int = 0, limit: int = 10):
    """
    Retrieve a paginated list of threat events from MongoDB, sorted by creation time.
    """
    db = get_mongo_db()
    cursor = (
        db.threats
        .find()
        .skip(skip)
        .limit(limit)
        .sort("created_at", -1)
    )

    threats: List[ThreatResponse] = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        threats.append(ThreatResponse(**doc))
    return threats
