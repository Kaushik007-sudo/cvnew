import os
import re

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.rag_service import RAGService


ROOT = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(ROOT, ".env"))

origins = [
    item.strip()
    for item in os.getenv(
        "ALLOWED_ORIGINS",
        "https://thekaushikdas.com,http://localhost:5173",
    ).split(",")
    if item.strip()
]

app = FastAPI(
    title="Kaushik Das RAG API",
    version="1.0.0",
    description="Gemini File Search RAG API for thekaushikdas.com",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

_rag = None
ABUSIVE_WORDS = {
    "asshole", "bastard", "bitch", "bullshit", "cunt", "dick", "fuck", "motherfucker", "shit", "slut", "whore",
    "bhenchod", "behenchod", "bhosdi", "chudai", "chutiya", "gaand", "gandu", "harami", "madarchod", "randi",
    "বাল", "চোদা", "চোদাচুদি", "চোদন", "চুত", "চুতিয়া", "হারামি", "খানকি", "মাদারচোদ", "শুয়োর",
}


def contains_abusive_language(message: str) -> bool:
    words = re.sub(r"[^\w\s\u0980-\u09FF]+", " ", message.casefold(), flags=re.UNICODE).split()
    return any(word in ABUSIVE_WORDS for word in words)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=4000)


class ChatResponse(BaseModel):
    answer: str
    citations: list[dict] = []


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    global _rag

    if contains_abusive_language(request.message):
        raise HTTPException(
            status_code=400,
            detail="Please keep the conversation respectful. Abusive language is not allowed.",
        )

    try:
        if _rag is None:
            _rag = RAGService()

        result = _rag.answer(request.message)
        return ChatResponse(**result)

    except Exception as exc:
        raise HTTPException(
            status_code=503,
            detail="The chatbot is temporarily unavailable.",
        ) from exc
