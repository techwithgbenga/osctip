# app/config.py

import os
from pydantic import BaseSettings, Field

class Settings(BaseSettings):
    # Path to .env file (defaults to project root .env)
    env_file: str = Field(".env", env="ENV_FILE")

    # MongoDB configuration
    MONGO_URI: str = Field(..., env="MONGO_URI")
    MONGO_DB: str = Field("osctip", env="MONGO_DB")

    # Neo4j configuration
    NEO4J_URI: str = Field(..., env="NEO4J_URI")
    NEO4J_USER: str = Field(..., env="NEO4J_USER")
    NEO4J_PASSWORD: str = Field(..., env="NEO4J_PASSWORD")

    # External API keys
    VIRUSTOTAL_API_KEY: str = Field(..., env="VIRUSTOTAL_API_KEY")

    class Config:
        # Tell Pydantic to read the specified env_file
        env_file = os.getenv("ENV_FILE", ".env")
        env_file_encoding = "utf-8"

# Instantiate a singleton settings object
settings = Settings()
