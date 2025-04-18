# app/jobs/scheduler.py

import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from app.utils.logger import get_logger
from app.connectors.virustotal import VirusTotalConnector
from app.normalizer.stix_normalizer import (
    normalize_ip_report,
    normalize_url_report,
    normalize_domain_report
)
from app.utils.db import get_mongo_db

logger = get_logger(__name__)
scheduler = AsyncIOScheduler()

async def job_fetch_vt_ips():
    """
    Periodic job: fetch VirusTotal reports for a list of IPs
    and store normalized STIX Bundles into MongoDB.
    """
    connector = VirusTotalConnector()
    db = get_mongo_db()
    ips_to_check = ["8.8.8.8", "1.1.1.1"]  # You can load this from config or a collection
    for ip in ips_to_check:
        try:
            report = await connector.fetch_ip_report(ip)
            bundle = normalize_ip_report(report)
            await db.raw_reports.insert_one(bundle.serialize())
            logger.info(f"Stored STIX bundle for IP {ip}")
        except Exception as e:
            logger.error(f"Error processing IP {ip}: {e}")

async def job_fetch_vt_urls():
    """
    Periodic job: fetch VirusTotal reports for a list of URLs
    and store normalized STIX Bundles into MongoDB.
    """
    connector = VirusTotalConnector()
    db = get_mongo_db()
    urls_to_check = ["http://example.com", "https://malicious.test"]
    for url in urls_to_check:
        try:
            report = await connector.fetch_url_report(url)
            bundle = normalize_url_report(report)
            await db.raw_reports.insert_one(bundle.serialize())
            logger.info(f"Stored STIX bundle for URL {url}")
        except Exception as e:
            logger.error(f"Error processing URL {url}: {e}")

async def job_fetch_vt_domains():
    """
    Periodic job: fetch VirusTotal reports for a list of domains
    and store normalized STIX Bundles into MongoDB.
    """
    connector = VirusTotalConnector()
    db = get_mongo_db()
    domains_to_check = ["example.com", "malicious.test"]
    for domain in domains_to_check:
        try:
            report = await connector.fetch_domain_report(domain)
            bundle = normalize_domain_report(report)
            await db.raw_reports.insert_one(bundle.serialize())
            logger.info(f"Stored STIX bundle for domain {domain}")
        except Exception as e:
            logger.error(f"Error processing domain {domain}: {e}")

def start_scheduler():
    """
    Configure and start the APScheduler with defined jobs.
    """
    # Fetch IP reports every hour
    scheduler.add_job(
        lambda: asyncio.create_task(job_fetch_vt_ips()),
        IntervalTrigger(hours=1),
        id="vt_ip_job",
        name="Fetch VT IP reports"
    )
    # Fetch URL reports every 2 hours
    scheduler.add_job(
        lambda: asyncio.create_task(job_fetch_vt_urls()),
        IntervalTrigger(hours=2),
        id="vt_url_job",
        name="Fetch VT URL reports"
    )
    # Fetch domain reports every 3 hours
    scheduler.add_job(
        lambda: asyncio.create_task(job_fetch_vt_domains()),
        IntervalTrigger(hours=3),
        id="vt_domain_job",
        name="Fetch VT domain reports"
    )

    scheduler.start()
    logger.info(f"Scheduler started with jobs: {[job.id for job in scheduler.get_jobs()]}")
