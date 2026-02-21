"""
config.py — All settings loaded from your .env file.
"""

import os
from dotenv import load_dotenv

load_dotenv()  # reads from .env in the same folder


class Config:
    # ── AI Provider — fixed to Anthropic Claude ──────────────────
    AI_PROVIDER:     str = "anthropic"
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")

    # Model: claude-haiku is fast and cost-effective
    # Upgrade to "claude-sonnet-4-6" for smarter answers
    ANTHROPIC_MODEL: str = os.getenv("ANTHROPIC_MODEL", "claude-haiku-4-5-20251001")

    # ── Generation settings ──────────────────────────────────────
    MAX_TOKENS:   int   = int(os.getenv("MAX_TOKENS",   "600"))
    TEMPERATURE:  float = float(os.getenv("TEMPERATURE", "0.5"))
    MAX_HISTORY:  int   = int(os.getenv("MAX_HISTORY",  "10"))   # last 10 exchanges kept