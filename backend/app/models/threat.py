# app/models/threat.py

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Threat(BaseModel):
    """
    Internal data model for a threat event stored in MongoDB.
    """
    id: Optional[str] = Field(None, alias="_id")
    title: str
    description: Optional[str] = None
    raw_report: dict
    iocs: List[str] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        # Allow using MongoDB _id field as id
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
