"""
ai_engine.py — Anthropic Claude engine for AI Digital Government Officer.

Uses claude-haiku for fast, cost-effective responses.
Falls back to rule-based answers if API key is missing or call fails.
"""

from __future__ import annotations
import re
from config import Config
from gov_knowledge import KNOWLEDGE_BASE, FALLBACK_RESPONSE

# ══════════════════════════════════════════════════════════════
#  SYSTEM PROMPT — defines the officer's personality & scope
# ══════════════════════════════════════════════════════════════
SYSTEM_PROMPT = """You are Officer Rajiv Sharma IAS, a senior AI Digital Government Officer 
for the Government of India, serving under the Ministry of Electronics and Information 
Technology (MeitY) in the e-Governance Division.

YOUR SPECIALISED SERVICES (focus only on these):
1. 📚 Scholarships & Education — NSP, PM Scholarship, Pragati, state government scholarships, 
   eligibility criteria, required documents, step-by-step application process
2. 🧓 Pensions & Senior Citizen — NSAP, IGNOAPS (Old Age), IGNWPS (Widow), IGNDPS (Disability),
   state pension schemes, application via Gram Panchayat or CSC
3. 🪪 Ration Card & PDS — New card application, correction, transfer, One Nation One Ration Card (ONORC),
   AAY/PHH card types, state PDS portals
4. 🏠 Land Records & Property — Khata, Khasra-Khatauni, Record of Rights (ROR), online mutation,
   Bhu-Naksha map, Bhulekh portals for all states
5. 💼 Employment Schemes — MGNREGA job cards, PM-KISAN, PMEGP, Skill India, PM-SVANidhi,
   PMAY housing, state employment portals
6. 📄 Birth & Death Certificates — CRS registration, online application, hospital/home births,
   delayed registration, DigiLocker download

PERSONALITY & TONE:
- Warm, respectful, patient — always address citizens as "Ji" occasionally
- Use simple language; avoid jargon
- Be concise: 3–6 sentences unless a step-by-step process is needed
- Start with a brief direct answer, then give steps/details
- Mention official website links and helpline numbers when relevant
- If asked in Hindi or other Indian languages, respond in that language
- Occasionally use Namaste 🙏 or Ji for a warm government officer feel

FORMATTING:
- Use numbered steps for processes (1. 2. 3.)
- Use bullet points for lists of documents or eligibility criteria
- Keep responses under 200 words unless more detail is truly needed

BOUNDARIES:
- Only answer questions about your 6 assigned services
- For other topics, politely explain your specialisation and suggest calling 1800-111-555
- Never make up scheme names, amounts, or portal URLs — only use real information
- If genuinely unsure, say so and direct to the official helpline

OFFICIAL HELPLINES TO CITE:
- Scholarship: 0120-6619540 | scholarships.gov.in
- Pension: 1800-111-555 | nsap.nic.in  
- Ration Card: 1967 | epds.nic.in
- Land Records: State revenue department portals
- MGNREGA: 1800-111-555 | nrega.nic.in
- Certificates: crsorgi.gov.in | DigiLocker: digilocker.gov.in"""


class AIEngine:
    def __init__(self, cfg: Config):
        self.cfg = cfg
        self._client = None
        self._init_claude()

    def _init_claude(self):
        """Initialize the Anthropic client."""
        if not self.cfg.ANTHROPIC_API_KEY:
            print("  ⚠️  WARNING: ANTHROPIC_API_KEY not set in .env — using rule-based fallback")
            return

        try:
            import anthropic
            self._client = anthropic.Anthropic(api_key=self.cfg.ANTHROPIC_API_KEY)
            # Quick validation — list models to confirm key works
            print(f"  ✅ Claude client ready — model: {self.cfg.ANTHROPIC_MODEL}")
        except ImportError:
            print("  ❌ ERROR: anthropic package not installed!")
            print("     Run: pip install anthropic")
        except Exception as e:
            print(f"  ❌ ERROR: Could not init Anthropic client: {e}")

    def generate_reply(self, user_message: str, history: list, language: str = "en-IN") -> str:
        """
        Generate a reply using Claude Haiku.
        Falls back to rule-based if Claude is unavailable.
        """
        if self._client:
            try:
                return self._claude_reply(user_message, history, language)
            except Exception as e:
                print(f"  ⚠️  Claude API error: {e} — falling back to rule-based")

        # Fallback to local knowledge base
        return self._rule_based_reply(user_message)

    def _claude_reply(self, user_message: str, history: list, language: str) -> str:
        """Call Claude Haiku with full conversation history."""

        # Build messages array — include previous turns for context
        messages = []
        for msg in history[-(self.cfg.MAX_HISTORY * 2):]:
            # Skip the very last user message — it's passed as current
            if msg == history[-1] and msg["role"] == "user":
                continue
            messages.append({
                "role":    msg["role"],
                "content": msg["content"]
            })

        # Always add current user message last
        messages.append({"role": "user", "content": user_message})

        # Add language instruction to system prompt if non-English
        system = SYSTEM_PROMPT
        lang_map = {
            "hi-IN": "Respond in Hindi (हिंदी). Use Devanagari script.",
            "ta-IN": "Respond in Tamil (தமிழ்).",
            "te-IN": "Respond in Telugu (తెలుగు).",
            "bn-IN": "Respond in Bengali (বাংলা).",
            "mr-IN": "Respond in Marathi (मराठी).",
        }
        if language in lang_map:
            system += f"\n\nLANGUAGE INSTRUCTION: {lang_map[language]}"

        response = self._client.messages.create(
            model=self.cfg.ANTHROPIC_MODEL,
            max_tokens=self.cfg.MAX_TOKENS,
            temperature=self.cfg.TEMPERATURE,
            system=system,
            messages=messages,
        )

        return response.content[0].text.strip()

    def _rule_based_reply(self, message: str) -> str:
        """
        Local fallback — matches keywords to pre-written responses.
        Works with zero API calls. Good for testing or API outages.
        """
        msg = message.lower()

        for keywords, response in KNOWLEDGE_BASE.items():
            if any(kw in msg for kw in keywords.split("|")):
                return response

        # Greeting
        if any(w in msg for w in ["hello", "hi", "namaste", "hey", "good morning", "good evening"]):
            return ("Namaste! 🙏 I am Officer Rajiv Sharma, your AI Digital Government Officer. "
                    "I specialise in Scholarships, Pensions, Ration Cards, Land Records, "
                    "Employment Schemes, and Birth/Death Certificates. "
                    "How may I assist you today, Ji?")

        if any(w in msg for w in ["thank", "thanks", "shukriya", "dhanyawad"]):
            return ("You are most welcome, Ji! 😊 "
                    "Serving the citizens of India is my honour and duty. "
                    "Is there anything else I can help you with?")

        return FALLBACK_RESPONSE