# app/utils/db.py

from motor.motor_asyncio import AsyncIOMotorClient
from neo4j import GraphDatabase
from app.config import settings

mongo_client: AsyncIOMotorClient = None
mongo_db = None
neo4j_driver = None

async def init_mongo():
    """
    Initialize MongoDB connection (async).
    """
    global mongo_client, mongo_db
    mongo_client = AsyncIOMotorClient(settings.MONGO_URI)
    mongo_db = mongo_client[settings.MONGO_DB]
    # Optionally create indexes here, e.g.:
    # await mongo_db.threats.create_index("created_at")

def get_mongo_db():
    """
    Retrieve the initialized MongoDB database instance.
    """
    if mongo_db is None:
        raise RuntimeError("MongoDB is not initialized; call init_mongo() first")
    return mongo_db

def init_neo4j():
    """
    Initialize Neo4j driver singleton.
    """
    global neo4j_driver
    neo4j_driver = GraphDatabase.driver(
        settings.NEO4J_URI,
        auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
    )

def get_neo4j_driver():
    """
    Retrieve the initialized Neo4j driver.
    """
    if neo4j_driver is None:
        raise RuntimeError("Neo4j is not initialized; call init_neo4j() first")
    return neo4j_driver
