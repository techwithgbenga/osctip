# app/correlation/correlator.py

from app.utils.db import get_neo4j_driver
from app.utils.logger import get_logger

logger = get_logger(__name__)

class Correlator:
    """
    Correlator for linking IOCs to threat events using Neo4j.
    """

    def __init__(self):
        self.driver = get_neo4j_driver()

    def correlate_ioc(self, ioc_value: str, context: dict):
        """
        Merge an IOC node and link it to a Threat node in Neo4j.

        Args:
            ioc_value: The IOC string (IP, URL, domain).
            context: dict containing 'event_id' of the threat event.
        """
        def _tx(tx, ioc_val, event_id):
            tx.run(
                """
                MERGE (i:IOC {value: $ioc_val})
                MERGE (t:Threat {id: $event_id})
                MERGE (t)-[:INDICATES]->(i)
                """,
                ioc_val=ioc_val,
                event_id=event_id
            )

        with self.driver.session() as session:
            session.write_transaction(_tx, ioc_value, context.get("event_id"))
            logger.info(f"Linked IOC '{ioc_value}' to threat event '{context.get('event_id')}'")
