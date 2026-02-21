"""
╔══════════════════════════════════════════════════════════════╗
║        AI DIGITAL GOVERNMENT OFFICER — BACKEND              ║
║        Powered by Anthropic Claude (claude-haiku)           ║
║        Services: Scholarships | Pension | Ration Card       ║
║                  Land Records | Employment | Certificates    ║
╚══════════════════════════════════════════════════════════════╝

Setup:
  1. pip install -r requirements.txt
  2. Copy .env.example → .env and add your ANTHROPIC_API_KEY
  3. python app.py
  4. Open your React frontend at localhost:3000
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from ai_engine import AIEngine
from conversation import ConversationManager
import logging

# ── Logging ────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S"
)
log = logging.getLogger(__name__)

# ── App Setup ──────────────────────────────────────────────────
app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",   # Vite dev server
    "http://127.0.0.1:5173",
])

cfg  = Config()
ai   = AIEngine(cfg)
conv = ConversationManager(max_history=cfg.MAX_HISTORY)

log.info("=" * 52)
log.info("  AI Digital Government Officer — Online")
log.info(f"  Provider : {cfg.AI_PROVIDER}")
log.info(f"  Model    : {cfg.ANTHROPIC_MODEL}")
log.info(f"  Port     : 5000")
log.info("=" * 52)

# ── Routes ─────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def health():
    """Health check — frontend can ping this to confirm server is up."""
    return jsonify({
        "status": "online",
        "officer": "AI Digital Government Officer",
        "provider": cfg.AI_PROVIDER,
        "model": cfg.ANTHROPIC_MODEL,
        "version": "2.0.0",
        "services": ["scholarships", "pension", "ration_card",
                     "land_records", "employment", "certificates"]
    })


@app.route("/chat", methods=["POST"])
def chat():
    """
    Main chat endpoint — called by React frontend on every message.

    Request JSON:
        {
            "message":    "How do I apply for a scholarship?",
            "session_id": "abc123",      (optional, default="default")
            "language":   "en-IN"        (optional, for language context)
        }

    Response JSON:
        {
            "reply":      "To apply for a National Scholarship...",
            "session_id": "abc123",
            "provider":   "anthropic"
        }
    """
    data         = request.get_json(silent=True) or {}
    user_message = data.get("message", "").strip()
    session_id   = data.get("session_id", "default")
    language     = data.get("language", "en-IN")

    if not user_message:
        return jsonify({"error": "Empty message"}), 400

    log.info(f"[{session_id}] User: {user_message[:80]}")

    # Store user message & get history for Claude's context window
    conv.add_message(session_id, "user", user_message)
    history = conv.get_history(session_id)

    # Generate reply via Claude
    reply = ai.generate_reply(
        user_message=user_message,
        history=history,
        language=language
    )

    # Store Claude's reply
    conv.add_message(session_id, "assistant", reply)

    log.info(f"[{session_id}] Officer: {reply[:80]}...")

    return jsonify({
        "reply":      reply,
        "session_id": session_id,
        "provider":   cfg.AI_PROVIDER,
    })


@app.route("/reset", methods=["POST"])
def reset():
    """Clear the conversation history for a given session."""
    data       = request.get_json(silent=True) or {}
    session_id = data.get("session_id", "default")
    conv.clear(session_id)
    log.info(f"[{session_id}] Conversation cleared")
    return jsonify({"status": "cleared", "session_id": session_id})


@app.route("/services", methods=["GET"])
def services():
    """Returns the six government service categories this officer handles."""
    return jsonify({"services": [
        {"id": "scholarships", "name": "Scholarships & Education",  "icon": "📚",
         "description": "NSP, PM Scholarship, Pragati, state scholarships"},
        {"id": "pension",      "name": "Pensions & Senior Citizen", "icon": "🧓",
         "description": "Old Age, Widow, Disability pensions (NSAP/IGNOAPS)"},
        {"id": "ration_card",  "name": "Ration Card & PDS",         "icon": "🪪",
         "description": "New card, update, ONORC, food grain entitlements"},
        {"id": "land_records", "name": "Land Records & Property",   "icon": "🏠",
         "description": "Khata, Khasra, mutation, Bhu-Naksha, ROR download"},
        {"id": "employment",   "name": "Employment Schemes",        "icon": "💼",
         "description": "MGNREGA job card, PM-KISAN, PMAY, skill schemes"},
        {"id": "certificates", "name": "Birth / Death Certificates","icon": "📄",
         "description": "Registration, download, correction via CRS portal"},
    ]})


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)