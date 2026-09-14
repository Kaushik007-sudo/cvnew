from .gemini_service import GeminiRAGService


class RAGService:
    def __init__(self):
        self.gemini = GeminiRAGService()

    def answer(self, question: str):
        return self.gemini.ask(question)
