"""
conversation.py — In-memory per-session conversation history.
Claude uses this history to give context-aware responses.
"""

from collections import defaultdict
from datetime import datetime


class ConversationManager:
    def __init__(self, max_history: int = 10):
        self.max_history = max_history
        self._sessions: dict[str, list] = defaultdict(list)

    def add_message(self, session_id: str, role: str, content: str) -> None:
        """Add a message (user or assistant) to the session."""
        self._sessions[session_id].append({
            "role":      role,        # "user" or "assistant"
            "content":   content,
            "timestamp": datetime.now().isoformat(),
        })
        # Trim to keep only the last N pairs
        cap = self.max_history * 2
        if len(self._sessions[session_id]) > cap:
            self._sessions[session_id] = self._sessions[session_id][-cap:]

    def get_history(self, session_id: str) -> list[dict]:
        """Return history as [{"role": ..., "content": ...}, ...] for Claude API."""
        return [
            {"role": m["role"], "content": m["content"]}
            for m in self._sessions[session_id]
        ]

    def clear(self, session_id: str) -> None:
        self._sessions[session_id] = []

    def session_count(self) -> int:
        return len(self._sessions)