# app/schemas/threat.py

from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ThreatCreate(BaseModel):
    """
    Schema for incoming threat creation payload.
    """
    title: str
    description: Optional[str] = None
    raw_report: dict

class ThreatResponse(BaseModel):
    """
    Schema for responses when returning threat data.
    """
    id: str
    title: str
    description: Optional[str]
    raw_report: dict
    iocs: List[str]
    created_at: datetime
