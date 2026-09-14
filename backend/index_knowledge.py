from pathlib import Path
import os
import sys
import time

from dotenv import load_dotenv
from google import genai

from services.website_loader import fetch_website


ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / ".env")

WEBSITE_URL = os.getenv("WEBSITE_URL", "https://thekaushikdas.com")
CV_PATH = Path(os.getenv("CV_PATH", str(ROOT / "knowledge_base" / "cv_kaushik_pm.pdf")))
WEBSITE_PATH = ROOT / "knowledge_base" / "website_knowledge.txt"


def save_store_name(name: str):
    env_path = ROOT / ".env"
    lines = env_path.read_text(encoding="utf-8").splitlines() if env_path.exists() else []

    key = "GEMINI_FILE_SEARCH_STORE_NAME="
    replaced = False
    output = []

    for line in lines:
        if line.startswith(key):
            output.append(key + name)
            replaced = True
        else:
            output.append(line)

    if not replaced:
        if output and output[-1].strip():
            output.append("")
        output.append(key + name)

    env_path.write_text("\n".join(output) + "\n", encoding="utf-8")
    os.environ["GEMINI_FILE_SEARCH_STORE_NAME"] = name


def wait_for_operation(client, operation, label):
    print(label, end="", flush=True)
    while not operation.done:
        time.sleep(3)
        operation = client.operations.get(operation)
        print(".", end="", flush=True)
    print(" done")


def create_store(client):
    existing = os.getenv("GEMINI_FILE_SEARCH_STORE_NAME")
    if existing:
        try:
            store = client.file_search_stores.get(name=existing)
            print(f"Using existing File Search store: {store.name}")
            return store
        except Exception:
            print("Configured File Search store was not found; creating a new one.")

    store = client.file_search_stores.create(
        config={
            "display_name": "thekaushikdas.com RAG Knowledge Base",
            "embedding_model": "models/gemini-embedding-2",
        }
    )
    save_store_name(store.name)
    print(f"Created File Search store: {store.name}")
    return store


def upload(client, store, path: Path, display_name: str):
    if not path.exists():
        raise FileNotFoundError(f"Missing file: {path}")

    print(f"Indexing {display_name}...")
    operation = client.file_search_stores.upload_to_file_search_store(
        file=str(path),
        file_search_store_name=store.name,
        config={"display_name": display_name},
    )
    wait_for_operation(client, operation, "Waiting for indexing")


def main():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("Add GEMINI_API_KEY to backend/.env")

    if not CV_PATH.exists():
        raise FileNotFoundError(
            f"CV not found at {CV_PATH}. Put cv_kaushik_pm.pdf there."
        )

    print(f"Fetching website: {WEBSITE_URL}")
    fetch_website(WEBSITE_URL, WEBSITE_PATH)

    client = genai.Client(api_key=api_key)
    store = create_store(client)

    upload(client, store, WEBSITE_PATH, "thekaushikdas.com website")
    upload(client, store, CV_PATH, "cv_kaushik_pm.pdf")

    print("\nKnowledge base indexing completed.")
    print(f"Store: {store.name}")
    print("Store name has been saved to .env.")
    print("\nStart the API with:")
    print("  uvicorn app:app --host 0.0.0.0 --port 8000")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise
