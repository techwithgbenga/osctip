# app/normalizer/stix_normalizer.py

from stix2 import IPv4Address, URL, DomainName, Report, Bundle
from datetime import datetime

def normalize_ip_report(ip_report: dict) -> Bundle:
    """
    Convert a VirusTotal IP report dict into a STIX Bundle.
    """
    data = ip_report.get("data", {})
    attrs = data.get("attributes", {})
    ip_value = data.get("id")  # VT uses the IP as the object id
    # Labels could be the engines that flagged it
    labels = list(attrs.get("last_analysis_results", {}).keys())
    ioc = IPv4Address(
        value=ip_value,
        labels=labels
    )
    report = Report(
        name=f"VirusTotal IP Report - {ip_value}",
        description="Normalized IP threat intelligence from VirusTotal",
        published=datetime.utcnow(),
        object_refs=[ioc.id]
    )
    return Bundle(objects=[ioc, report])

def normalize_url_report(url_report: dict) -> Bundle:
    """
    Convert a VirusTotal URL report dict into a STIX Bundle.
    """
    data = url_report.get("data", {})
    attrs = data.get("attributes", {})
    url_id = data.get("id")
    # VT URL value is in attributes.url
    url_value = attrs.get("url")
    ioc = URL(
        id=url_id,
        value=url_value,
        labels=["malicious" if attrs.get("last_analysis_stats", {}).get("malicious", 0) > 0 else "benign"]
    )
    report = Report(
        name=f"VirusTotal URL Report - {url_value}",
        description="Normalized URL threat intelligence from VirusTotal",
        published=datetime.utcnow(),
        object_refs=[ioc.id]
    )
    return Bundle(objects=[ioc, report])

def normalize_domain_report(domain_report: dict) -> Bundle:
    """
    Convert a VirusTotal domain report dict into a STIX Bundle.
    """
    data = domain_report.get("data", {})
    attrs = data.get("attributes", {})
    domain_value = data.get("id")
    ioc = DomainName(
        value=domain_value,
        labels=["malicious" if attrs.get("last_analysis_stats", {}).get("malicious", 0) > 0 else "benign"]
    )
    report = Report(
        name=f"VirusTotal Domain Report - {domain_value}",
        description="Normalized domain threat intelligence from VirusTotal",
        published=datetime.utcnow(),
        object_refs=[ioc.id]
    )
    return Bundle(objects=[ioc, report])
