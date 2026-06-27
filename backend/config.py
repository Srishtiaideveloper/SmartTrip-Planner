"""
Application configuration loaded from environment variables.
Uses python-dotenv to read from .env file.
"""

import os
from dotenv import load_dotenv

load_dotenv()

# ── JWT Settings ──────────────────────────────────────────────────────────────
SECRET_KEY = os.getenv("SECRET_KEY", "fallback-secret-key-change-this")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

# ── CORS Settings ─────────────────────────────────────────────────────────────
FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

# ── Server Settings ───────────────────────────────────────────────────────────
PORT = int(os.getenv("PORT", "8000"))
