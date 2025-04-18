# app/main.py

from fastapi import FastAPI
from dotenv import load_dotenv

from app.config import settings
from app.utils.db import init_mongo, init_neo4j
from app.jobs.scheduler import start_scheduler
from app.routers.threat_router import router as threat_router

# Load environment variables (from .env by default)
load_dotenv(settings.env_file)

# Create FastAPI app
app = FastAPI(
    title="OSCTIP Backend",
    version="0.1.0",
    description="Open‑Source Cyber Threat Intelligence Platform API"
)

# Startup event: initialize databases and start scheduler
@app.on_event("startup")
async def on_startup():
    await init_mongo()
    init_neo4j()
    start_scheduler()

# Include threat routes under /threats
app.include_router(threat_router, prefix="/threats", tags=["Threats"])
