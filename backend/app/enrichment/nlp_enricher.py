# app/enrichment/nlp_enricher.py

import re
from typing import List, Dict

# Regular expressions for different IOC types
IOC_REGEX: Dict[str, str] = {
    "ipv4": r"\b\d{1,3}(?:\.\d{1,3}){3}\b",
    "url": r"https?://[^\s]+",
    "domain": r"\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b",
}

def extract_iocs(text: str) -> List[str]:
    """
    Extract IOCs (IP addresses, URLs, domains) from text using regex patterns.
    """
    found = set()
    for pattern in IOC_REGEX.values():
        for match in re.findall(pattern, text):
            found.add(match)
    return list(found)

def enrich_text(text: str) -> Dict[str, List[str]]:
    """
    Perform simple NLP enrichment on the input text.

    Returns:
        A dict containing:
        - 'iocs': list of extracted IOCs
        - 'keywords': placeholder list for extracted keywords (can integrate spaCy, etc.)
    """
    iocs = extract_iocs(text)
    # Placeholder for future keyword extraction or entity recognition
    keywords: List[str] = []
    return {
        "iocs": iocs,
        "keywords": keywords,
    }
