# 🎸 Devin Cursor Rules - Integracija Zaključena

> **Self-Evolving AI Agent za The Drinkers**
> _Nameščeno: 24. Marec 2026_

---

## ✅ NAMEŠČENO

### **1. Konfiguracijske Datoteke**

```
F:\thedrinkers\the\
├── .cursorrules           ⭐ Glavna Devin konfiguracija
├── .windsurfrules         ⭐ Za Windsurf IDE
└── tools/                 ⭐ Python orodja (4)
    ├── llm_api.py
    ├── web_scraper.py
    ├── search_engine.py
    └── screenshot_utils.py
```

### **2. Python Environment**

```
F:\thedrinkers\the\venv-devin\
├── Scripts/
│   ├── activate.bat
│   └── python.exe
└── Lib/
    └── site-packages/     ⭐ Vse dependency-je
```

### **3. Nameščeni Package-i**

```
✅ playwright         - Web scraping & screenshots
✅ html5lib           - HTML parsing
✅ duckduckgo-search  - Search engine
✅ openai             - OpenAI API
✅ anthropic          - Anthropic API
✅ python-dotenv      - Environment variables
✅ google-generativeai - Google AI
✅ grpcio             - Google RPC
```

---

## 🚀 KAKO UPORABITI

### **1. Aktiviraj Environment**

```bash
cd F:\thedrinkers\the
venv-devin\Scripts\activate
```

### **2. Namesti Playwright Browserje**

```bash
playwright install
```

### **3. Nastavi API Ključe**

Ustvari `.env` datoteko v rootu:

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Google AI
GOOGLE_API_KEY=...

# Azure OpenAI (optional)
AZURE_OPENAI_API_KEY=...
AZURE_OPENAI_ENDPOINT=...
AZURE_OPENAI_MODEL_DEPLOYMENT=gpt-4o
```

---

## 🛠️ UPORABA ORODIJ

### **1. LLM API**

```bash
# Preprost klic
venv-devin\Scripts\activate
python tools\llm_api.py --prompt "What is the capital of France?" --provider "anthropic"

# Z sliko
python tools\llm_api.py --prompt "What is in this image?" --provider "openai" --image path\to\image.png

# Multi-provider support:
# - openai (default: gpt-4o)
# - anthropic (claude-3-sonnet-20240229)
# - google (gemini-pro)
# - azure (gpt-4o-ms)
# - deepseek (deepseek-chat)
```

### **2. Web Scraper**

```bash
# Ena stran
python tools\web_scraper.py https://example.com

# Več strani hkrati
python tools\web_scraper.py --max-concurrent 3 https://site1.com https://site2.com https://site3.com
```

### **3. Search Engine**

```bash
# Iskanje
python tools\search_engine.py "Google stock price 2024"

# Več rezultatov
python tools\search_engine.py "AI developments 2025" --max-results 20
```

### **4. Screenshot Verification**

```bash
# Screenshot + LLM analiza
python tools\screenshot_utils.py https://example.com --output screenshot.png

# Ročna verifikacija
python tools\llm_api.py --prompt "What is the background color?" --provider "openai" --image screenshot.png
```

---

## 📋 SCRATCHPAD SISTEM

### **Pred Začetkom Naloge:**

1. Odpri `.cursorrules`
2. Preberi `# Scratchpad` sekcijo
3. Počisti stare naloge
4. Zapiši novo nalogo in plan

### **Primer:**

```markdown
# Scratchpad

## Current Task

Build AI-powered concert ticket sales system

## Plan

[X] Step 1: Database schema design
[ ] Step 2: API endpoints
[ ] Step 3: Frontend components
[ ] Step 4: Testing

## Progress

- Completed database design
- Currently working on API
```

### **Med Delom:**

- Obkljukaj končane korake `[X]`
- Dodaj ugotovitve
- Posodobi progress

### **Po Koncu:**

- Zapiši naučene lekcije v `# Lessons` sekcijo
- Počisti scratchpad za naslednjo nalogo

---

## 🎯 SELF-EVOLUTION SISTEM

### **Ko AI Napravi Napako:**

1. AI samodejno zapiše lekcijo v `.cursorrules`
2. Naslednjič se bo spomnil in ne bo ponovil napake

### **Primer Lekcij:**

```markdown
# Lessons

## User Specified Lessons

- Use Python venv: .\venv-devin
- Always activate venv before running Python scripts
- Include debug info in stderr, results in stdout

## Cursor Learned

- Use 'gpt-4o' for OpenAI vision tasks
- Use 'seaborn-v0_8' style (not 'seaborn') for matplotlib
- For international search queries, use UTF-8 encoding
- Playwright browsers located at: C:\Users\...\AppData\Local\ms-playwright
```

---

## 🔗 INTEGRACIJA S TVOJIMI SKILLS

### **Tvoji Skills (265+):**

```
skill: "frontend-design"     # Visoko-nivojska naloga
skill: "seo-audit"           # Visoko-nivojska naloga
skill: "ai-image-generation" # Visoko-nivojska naloga
```

### **Devin Orodja:**

```bash
# Nizko-nivojska orodja
python tools\web_scraper.py ...  # Web scraping
python tools\search_engine.py ... # Research
python tools\screenshot_utils.py ... # Verification
python tools\llm_api.py ...      # LLM klici
```

### **Kombinirana Uporaba:**

```
1. skill: "seo-audit"           # AI pripravi strategijo
2. python tools\search_engine.py "competitor analysis"  # Research
3. python tools\web_scraper.py https://competitor.com   # Scrape
4. skill: "copywriting"         # AI napiše copy
```

---

## 📊 FUNKCIONALNOSTI

### **1. Self-Evolution** ✅

- AI se uči iz napak
- Shranjuje lekcije v `.cursorrules`
- Sčasoma postane pametnejši

### **2. Scratchpad** ✅

- Organizacija misli
- Planiranje nalog
- Progress tracking

### **3. Multi-Agent (Experimental)** ⚠️

- Planner: o1 za kompleksno planiranje
- Executor: Claude/GPT-4o za izvajanje

### **4. Python Orodja** ✅

- Web scraping (Playwright)
- Search engine (DuckDuckGo)
- LLM API (multi-provider)
- Screenshot verification

---

## ⚙️ PRILAGODITEV

### **Dodaj Svoje Lekcije:**

Uredi `.cursorrules`:

```markdown
# Lessons

## User Specified Lessons

- Project uses Next.js 15 with App Router
- Database: PostgreSQL via Neon
- Styling: Tailwind CSS v3.4
- AI: Ollama local models
- Always run: npm run lint before commit
```

### **Prilagodi Scratchpad:**

```markdown
# Scratchpad

## Project Info

- Repository: F:\thedrinkers\the
- Main Branch: main
- Dev Branch: dev
- Deploy: Vercel

## Current Sprint

- Sprint 4: AI Features
- Deadline: 2026-03-31
```

---

## 🚨 REŠEVANJE TEŽAV

### **Težava: "No module named 'playwright'"**

```bash
venv-devin\Scripts\activate
pip install playwright
playwright install
```

### **Težava: "API key not found"**

```bash
# Preveri .env datoteko
copy .env.example .env
# Uredi z pravimi API keys
```

### **Težava: "Playwright browser not found"**

```bash
playwright install chromium
playwright install firefox
playwright install webkit
```

---

## 📈 STATISTIKA

| Item               | Pred | Po   | Razlika |
| ------------------ | ---- | ---- | ------- |
| **AI Skills**      | 265+ | 265+ | 0       |
| **MCP Servers**    | 17   | 17   | 0       |
| **Python Orodja**  | 7    | 11   | +4      |
| **Self-Evolution** | ❌   | ✅   | +1      |
| **Scratchpad**     | ❌   | ✅   | +1      |
| **Konfiguracij**   | 50+  | 52+  | +2      |
| **SKUPAJ**         | 332+ | 340+ | **+8**  |

---

## ✅ CHECKLIST

- [x] `.cursorrules` kopiran
- [x] `.windsurfrules` kopiran
- [x] `tools/` directory kopiran
- [x] Python venv ustvarjen (`venv-devin`)
- [x] Dependency-ji nameščeni
- [ ] Playwright browserji nameščeni (`playwright install`)
- [ ] `.env` z API keys
- [ ] Test: `python tools\llm_api.py --prompt "Test"`

---

## 🎯 NASLEDNJI KORAKI

1. **Namesti Playwright:**

   ```bash
   venv-devin\Scripts\activate
   playwright install
   ```

2. **Nastavi `.env`:**

   ```bash
   copy .env.example .env
   # Uredi z API keys
   ```

3. **Testiraj:**

   ```bash
   python tools\llm_api.py --prompt "Hello, Devin!" --provider "anthropic"
   ```

4. **Začni uporabljati:**
   - Odpri projekt v Cursor/Windsurf
   - AI bo samodejno uporabljal `.cursorrules`
   - Opazuj kako se uči in izboljšuje!

---

**🎸 Self-Evolving AI je zdaj aktiven!** 🤘

_AI se bo zdaj samodejno učil iz vsake interakcije in postal boljši s časom._

---

_Generated: 2026-03-24_
_Status: ✅ Integration Complete_
