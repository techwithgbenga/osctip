# app/connectors/virustotal.py

import httpx
from app.config import settings
from app.utils.logger import get_logger

logger = get_logger(__name__)

class VirusTotalConnector:
    """
    Connector for the VirusTotal v3 API.
    Requires VIRUSTOTAL_API_KEY in environment.
    """

    BASE_URL = "https://www.virustotal.com/api/v3"

    def __init__(self):
        self.api_key = settings.VIRUSTOTAL_API_KEY
        self.client = httpx.AsyncClient(
            headers={"x-apikey": self.api_key},
            timeout=httpx.Timeout(30.0, read=30.0)
        )

    async def fetch_url_report(self, url: str) -> dict:
        """
        Submit a URL to VirusTotal for analysis and retrieve the report.
        """
        try:
            # VT requires posting the URL to get an analysis ID, then fetching report
            post_resp = await self.client.post(
                f"{self.BASE_URL}/urls",
                json={"url": url}
            )
            post_resp.raise_for_status()
            analysis_id = post_resp.json()["data"]["id"]

            get_resp = await self.client.get(f"{self.BASE_URL}/analyses/{analysis_id}")
            get_resp.raise_for_status()
            return get_resp.json()
        except httpx.HTTPError as e:
            logger.error(f"Error fetching URL report for {url}: {e}")
            return {}

    async def fetch_ip_report(self, ip: str) -> dict:
        """
        Retrieve IP address intelligence report from VirusTotal.
        """
        try:
            resp = await self.client.get(f"{self.BASE_URL}/ip_addresses/{ip}")
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPError as e:
            logger.error(f"Error fetching IP report for {ip}: {e}")
            return {}

    async def fetch_domain_report(self, domain: str) -> dict:
        """
        Retrieve domain intelligence report from VirusTotal.
        """
        try:
            resp = await self.client.get(f"{self.BASE_URL}/domains/{domain}")
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPError as e:
            logger.error(f"Error fetching domain report for {domain}: {e}")
            return {}

    async def close(self):
        """
        Close the underlying HTTP client.
        """
        await self.client.aclose()
