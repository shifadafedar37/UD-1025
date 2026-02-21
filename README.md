# 🇮🇳 AI Digital Government Officer

An AI-powered multilingual e-Governance assistant with a 3D avatar, voice input/output, and support for 10 Indian languages. Built with **React** (frontend) + **Flask + Claude AI** (backend).

---

## 📁 Project Structure

```
AVATAR/
└── avatar/
    │
    ├── backend_claude/                  ← Python Flask backend
    │   ├── __pycache__/
    │   ├── .env                         ← Your API keys (you create this)
    │   ├── ai_engine.py                 ← Claude AI integration & language handling
    │   ├── app.py                       ← Flask API server (runs on port 5000)
    │   ├── config.py                    ← Settings loaded from .env
    │   ├── conversation.py              ← Chat session/history manager
    │   ├── gov_knowledge.py             ← Government schemes knowledge base
    │   └── requirements.txt             ← Python dependencies
    │
    └── my-project/                      ← React frontend
        ├── node_modules/
        ├── public/
        ├── src/
        │   ├── components/
        │   │   └── Avatar.jsx           ← 3D Three.js avatar component
        │   ├── App.css
        │   ├── App.js                   ← Main app (or replace with App.jsx)
        │   ├── App.test.js
        │   ├── index.css
        │   ├── index.js
        │   └── ...
        ├── .gitignore
        └── package-lock.json
```

---

## ✅ Prerequisites

Make sure the following are installed on your computer before starting:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 16 or higher | https://nodejs.org |
| Python | 3.10 or higher | https://python.org |
| pip | latest | comes with Python |
| Google Chrome | latest | https://google.com/chrome |

---
## 🔑 Step 1 — Get Your Anthropic API Key

1. Go to [https://console.anthropic.com](https://console.anthropic.com)
2. Sign in or create a free account
3. Click **API Keys** in the left menu → click **Create Key**
4. Copy the key — you will paste it in the next step

---

## 🖥️ Step 2 — Backend Setup

Open a terminal and follow these steps:

### 2.1 — Go to the backend folder
```bash
cd avatar/backend
```

### 2.2 — Create a Python virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` appear at the start of your terminal line.

### 2.3 — Install Python packages
```bash
pip install -r requirements.txt
```

### 2.4 — Create the `.env` file

Inside the `backend/` folder, create a new file named `.env` and paste the following:

```env
ANTHROPIC_API_KEY=paste_your_api_key_here

# Model options (uncomment one):
ANTHROPIC_MODEL=claude-haiku-4-5-20251001


> 🔒 The `.env` file already exists in your project — just open it and add your API key.

### 2.5 — Start the backend server
```bash
python app.py
```

✅ You should see this output:
```
 * Running on http://127.0.0.1:5000
INFO  AI Digital Government Officer started | Provider: anthropic
```

Keep this terminal open while using the app.

---

## 🌐 Step 3 — Frontend Setup

Open a **second terminal** and follow these steps:

### 3.1 — Go to the frontend folder
```bash
cd avatar/my-project
```

### 3.2 — Install Node.js packages
```bash
npm install
```

### 3.3 — Install Three.js (for the 3D avatar)
```bash
npm install three
```

### 3.4 — Copy the updated App file

Replace `src/App.js` with the provided `App.jsx` file.
If your project uses `App.js`, you can either:
- Rename `App.jsx` → `App.js` and paste the contents, **or**
- Keep it as `App.jsx` and update `src/index.js` to import from `./App.jsx`

### 3.5 — Start the frontend
```bash
npm start
```

✅ Your browser will open automatically at: **http://localhost:3000**

---

## 🚀 Running the Full Application

You need **two terminals open at the same time**:

| Terminal | Command | What it does |
|----------|---------|--------------|
| Terminal 1 | `cd avatar/backend` → `python app.py` | Starts Flask API on port 5000 |
| Terminal 2 | `cd avatar/frontend` → `npm start` | Starts React app on port 3000 |

Then open **http://localhost:3000** in **Google Chrome**.

---

## 🌍 Supported Languages

Click the language dropdown in the top-right corner of the app to switch languages. The avatar will respond and speak in the selected language.

| Language | Code | Script |
|----------|------|--------|
| English | `en-IN` | Latin |
| हिंदी Hindi | `hi-IN` | Devanagari |
| ಕನ್ನಡ Kannada | `kn-IN` | Kannada |
| தமிழ் Tamil | `ta-IN` | Tamil |
| తెలుగు Telugu | `te-IN` | Telugu |
| বাংলা Bengali | `bn-IN` | Bengali |
| मराठी Marathi | `mr-IN` | Devanagari |
| ગુજરાતી Gujarati | `gu-IN` | Gujarati |
| മലയാളം Malayalam | `ml-IN` | Malayalam |
| ਪੰਜਾਬੀ Punjabi | `pa-IN` | Gurmukhi |

---

## 🎤 Voice Features

- **Microphone (🎤)** — Click and speak in your selected language
- **Auto speech** — The avatar speaks every response aloud
- **Stop (⏹)** — Click Stop at any time to interrupt the avatar

**To get better Indian language voices:**
- **Windows:** Settings → Time & Language → Speech → Add voices → search "Hindi", "Kannada" etc.
- **macOS:** System Settings → Accessibility → Spoken Content → System Voice → Manage Voices

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `Failed to fetch` error in browser | Make sure `python app.py` is running in Terminal 1 |
| Avatar only replies in English | Make sure you copied the latest `App.jsx` — it sends the `language` field to backend |
| Microphone button not working | Use Chrome; click Allow when browser asks for microphone permission |
| No Indian language voice output | Install language voices in your OS (see Voice Features above) |
| `ANTHROPIC_API_KEY` error | Open `backend_claude/.env` and make sure your key is pasted correctly |
| `ModuleNotFoundError` in Python | Make sure virtual environment is active and you ran `pip install -r requirements.txt` |
| `npm start` fails | Run `npm install` first, then try again |
| Port 5000 already in use | Close any other Flask apps, or change port in `app.py` last line |

---

## 📦 Dependencies

**Python (`backend_claude/requirements.txt`)**
```
flask==3.0.3
flask-cors==4.0.1
python-dotenv==1.0.1
anthropic==0.30.0
```

**Node.js (`my-project/`)**
```
react, react-dom      ← included with Create React App
three                 ← install manually: npm install three
```

---

## 📝 Quick Start Summary

```bash
# Terminal 1 — Backend
cd avatar/backend_claude
venv\Scripts\activate        # Windows  (or: source venv/bin/activate on Mac/Linux)
python app.py

# Terminal 2 — Frontend
cd avatar/my-project
npm install
npm install three
npm start
```

