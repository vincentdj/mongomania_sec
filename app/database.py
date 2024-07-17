import os
from motor.motor_asyncio import AsyncIOMotorClient

# Get the MongoDB connection string from the environment variable
MONGO_DETAILS = os.getenv("MONGO_URL", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_DETAILS)

database = client.get_database()
user_collection = database.get_collection("users")

def get_db():
    return database
