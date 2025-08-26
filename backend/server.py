from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from bson import ObjectId

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(str(ROOT_DIR / ".env"))

# Configure logging early
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("sea-worth-api")

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "sea_worth_traders")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# FastAPI app
app = FastAPI(title="SEA WORTH TRADERS API")

# API Router
api_router = APIRouter(prefix="/api")

# ------------------------------
# Models
# ------------------------------
class Inquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @classmethod
    def from_mongo(cls, doc: dict):
        """Convert MongoDB document (_id -> id)"""
        if not doc:
            return None
        doc["id"] = str(doc.get("_id", doc.get("id", uuid.uuid4())))
        doc.pop("_id", None)
        return cls(**doc)


class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class InquiryResponse(BaseModel):
    status: str
    message: str


# ------------------------------
# Routes
# ------------------------------
@api_router.get("/")
async def root():
    return {"message": "SEA WORTH TRADERS API", "status": "running"}


@api_router.post("/inquiries", response_model=InquiryResponse)
async def create_inquiry(inquiry: InquiryCreate):
    try:
        inquiry_obj = Inquiry(**inquiry.dict())
        result = await db.inquiries.insert_one(inquiry_obj.dict())
        if result.inserted_id:
            return InquiryResponse(
                status="success",
                message="Your inquiry has been submitted successfully. We will contact you soon!"
            )
        raise HTTPException(status_code=500, detail="Failed to submit inquiry")
    except Exception as e:
        logger.error(f"Error creating inquiry: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@api_router.get("/inquiries", response_model=List[Inquiry])
async def get_inquiries():
    try:
        docs = await db.inquiries.find().sort("timestamp", -1).to_list(1000)
        return [Inquiry.from_mongo(doc) for doc in docs]
    except Exception as e:
        logger.error(f"Error fetching inquiries: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


@api_router.get("/inquiries/count")
async def get_inquiries_count():
    try:
        count = await db.inquiries.count_documents({})
        return {"count": count}
    except Exception as e:
        logger.error(f"Error counting inquiries: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")


# ------------------------------
# Middleware & Lifecycle
# ------------------------------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_db_client():
    logger.info("Connected to MongoDB")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("MongoDB connection closed")
