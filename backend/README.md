# thekaushikdas.com — Gemini RAG Backend

This backend provides a FastAPI `/api/chat` endpoint for the React chatbot.

Knowledge base:
- `knowledge_base/website_knowledge.txt`
- `knowledge_base/cv_kaushik_pm.pdf`

It uses Google's Gemini File Search RAG capability. File Search imports,
chunks and indexes documents, then retrieves relevant information when a
question is asked. The File Search store persists independently of the local
raw files. See Google's documentation:
https://ai.google.dev/gemini-api/docs/file-search

## Folder structure

```text
backend/
├── app.py
├── index_knowledge.py
├── requirements.txt
├── .env
├── .env.example
├── .gitignore
├── README.md
│
├── knowledge_base/
│   ├── cv_kaushik_pm.pdf
│   └── website_knowledge.txt
│
└── services/
    ├── __init__.py
    ├── gemini_service.py
    ├── rag_service.py
    └── website_loader.py
```

## Setup

Create `backend/.env` from `.env.example` and add your Gemini API key:

```env
GEMINI_API_KEY=your_real_key_here
```

Put your CV here:

```text
backend/knowledge_base/cv_kaushik_pm.pdf
```

## Install

```bash
pip install -r requirements.txt
```

## Create/update the RAG knowledge base

Run:

```bash
python index_knowledge.py
```

This will:
1. Fetch `https://thekaushikdas.com`.
2. Update `knowledge_base/website_knowledge.txt`.
3. Create or reuse a Gemini File Search store.
4. Index the website knowledge file.
5. Index the CV PDF.
6. Save the File Search store name in `.env`.

Important: running the indexer against the same store adds documents. For a
clean re-index after major changes, create a new File Search store or remove
the old documents/store using the Gemini File Search API.

## Start the API

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

Health check:

```text
GET http://localhost:8000/api/health
```

Chat endpoint:

```text
POST http://localhost:8000/api/chat
Content-Type: application/json

{
  "message": "What are Kaushik Das's main skills?"
}
```

Example response:

```json
{
  "answer": "...",
  "citations": [
    {
      "file_name": "cv_kaushik_pm.pdf",
      "source": "...",
      "page_number": 1
    }
  ]
}
```

## Security

Never put `GEMINI_API_KEY` in the React frontend.

Keep `.env` on the backend server only. The browser should call:

```text
React -> POST /api/chat -> FastAPI -> Gemini File Search
```

Set `ALLOWED_ORIGINS` in `.env` to your actual frontend origin(s).

## Deployment

For production, run the FastAPI app behind HTTPS and a reverse proxy or
managed Python hosting service. The frontend should call the HTTPS API URL.
