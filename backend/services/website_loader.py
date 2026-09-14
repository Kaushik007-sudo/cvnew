from pathlib import Path
import re
from urllib.parse import urljoin

import requests
from bs4 import BeautifulSoup


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def fetch_website(url: str, output_path: Path) -> Path:
    response = requests.get(
        url,
        timeout=30,
        headers={"User-Agent": "KaushikDas-RAG/1.0"},
    )
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")

    for tag in soup(["script", "style", "noscript", "svg"]):
        tag.decompose()

    title = normalize(soup.title.get_text(" ", strip=True)) if soup.title else ""

    lines = [
        "# Website Knowledge Base",
        f"SOURCE: {response.url}",
        f"PAGE TITLE: {title}",
        "",
        "## Visible Page Content",
        normalize(soup.get_text(" ", strip=True)),
        "",
        "## Links",
    ]

    seen = set()
    for anchor in soup.find_all("a", href=True):
        label = normalize(anchor.get_text(" ", strip=True))
        href = urljoin(response.url, anchor["href"])
        if label and href.startswith(("http://", "https://")):
            item = (label, href)
            if item not in seen:
                seen.add(item)
                lines.append(f"- {label}: {href}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return output_path
