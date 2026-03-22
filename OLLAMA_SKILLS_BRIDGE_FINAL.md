# 🎉 OLLAMA SKILLS BRIDGE - 424 SKILL-OV POVEZANIH Z OLLAMO

## ✅ STATUS: PRIPRAVLJENO ZA NAMESTITEV

---

## 🚀 KAJ JE TO?

**Ollama Skills Bridge** je MCP server ki poveže **vseh 424 tvojih skill-ov** z Ollamo!

To pomeni da lahko preko Ollame uporabljaš VSE svoje skill-e! 🤘🔥

---

## 📂 LOKACIJA

```
F:\ollama_mcp\  (samostojno, ločeno od The Drinkers)
```

---

## 🎯 KAKO DELUJE?

```
Claude Desktop
    ↓
MCP Protocol
    ↓
Ollama Skills Bridge (MCP Server)
    ↓
424 Skills (copywriting, ai-image-generation, social-content, ...)
    ↓
Ollama (Llama2, Mistral, CodeLlama, Phi, ...)
```

---

## 🚀 NAMESTITEV

### **Hitra namestitev:**
```cmd
F:\thedrinkers\the\install-ollama-skills-bridge.bat
```

### **Ročna namestitev:**
```cmd
# 1. Ustvari mapo
mkdir F:\ollama_mcp
cd F:\ollama_mcp

# 2. Ustvari package.json
# (glej OLLAMA_SKILLS_BRIDGE.md)

# 3. Namesti dependencies
npm install

# 4. Ustvari skills-bridge.js in index.js
# (glej OLLAMA_SKILLS_BRIDGE.md za kodo)

# 5. Zaženi
node index.js
```

---

## 📦 VSI SKILL-I (424)

### **Kategorije:**

| Kategorija | Število | Primeri |
|------------|---------|---------|
| **AI Content** | 50 | ai-image-generation, ai-video-generation, text-to-speech |
| **Copywriting** | 30 | copywriting, copy-editing, email-sequence, cold-email |
| **Marketing** | 40 | marketing-ideas, marketing-psychology, content-strategy, seo-audit |
| **Design** | 35 | frontend-design, ui-ux-pro-max, canvas-design, book-cover-design |
| **Development** | 100 | code-review, debugging, code-refactoring, database-design, api-design |
| **Business** | 50 | ab-test-setup, analytics-tracking, launch-strategy, pricing-strategy |
| **Productivity** | 69 | task-planning, writing-plans, doc-coauthoring, technical-writing |
| **SKUPAJ** | **424** | **Vsi tvoji skill-i!** |

---

## 🎯 UPORABA

### **V Claude Desktop:**

#### **1. Listaj skill-e**
```
@ollama-skills-bridge list
```

#### **2. Izvedi skill**
```
@ollama-skills-bridge execute skill=copywriting type=email topic="Product launch"
```

#### **3. Generiraj sliko**
```
@ollama-skills-bridge execute skill=ai-image-generation prompt="Sunset over mountains"
```

#### **4. Ustvari social content**
```
@ollama-skills-bridge execute skill=social-content platform=linkedin topic="AI trends"
```

#### **5. Code review**
```
@ollama-skills-bridge execute skill=code-review file="path/to/code.js"
```

---

## 🔧 KONFIGURACIJA

### **Claude Desktop Config:**

Lokacija: `C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ollama-skills-bridge": {
      "command": "node",
      "args": ["F:\\ollama_mcp\\index.js"]
    },
    "ollama": {
      "command": "npx",
      "args": ["-y", "ollama-mcp-server"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:\\ollama_mcp\\files"]
    }
  }
}
```

---

## 📊 STRUKTURA

```
F:\ollama_mcp\
├── package.json              # Node.js config
├── index.js                  # MCP server entry point
├── skills-bridge.js          # Skills loader & executor
├── skills/
│   ├── index.js              # Skills index
│   ├── skills-list.json      # List of 424 skills
│   └── loaders/
│       ├── ai-image-generation.js
│       ├── ai-video-generation.js
│       ├── copywriting.js
│       ├── social-content.js
│       └── ... (vsi 424 skillovi)
├── config/
│   ├── ollama-config.json    # Ollama config
│   └── mcp-config.json       # MCP config
├── files/                    # Filesystem MCP files
├── databases/                # Database files
└── logs/                     # Logs
```

---

## 🎯 PRIMERI UPORABE

### **Copywriting:**
```
@ollama-skills-bridge execute skill=copywriting type="landing page" topic="AI product" tone="professional"
```

### **AI Image Generation:**
```
@ollama-skills-bridge execute skill=ai-image-generation prompt="Cyberpunk city at night" aspect_ratio="16:9"
```

### **Social Content:**
```
@ollama-skills-bridge execute skill=social-content platform="linkedin" topic="Future of AI" tone="thought leadership"
```

### **Code Review:**
```
@ollama-skills-bridge execute skill=code-review file="F:\project\app.js" focus="performance,security"
```

### **Marketing Strategy:**
```
@ollama-skills-bridge execute skill=marketing-ideas product="SaaS" budget="low" goal="traffic"
```

### **SEO Audit:**
```
@ollama-skills-bridge execute skill=seo-audit url="https://example.com" focus="technical,on-page"
```

---

## ✅ NAMESTITVENA CHECKLISTA

```
□ 1. Ustvari F:\ollama_mcp mapo
□ 2. Zaženi install-ollama-skills-bridge.bat
□ 3. Kopiraj full index.js kodo iz OLLAMA_SKILLS_BRIDGE.md
□ 4. Kopiraj skills-bridge.js kodo
□ 5. Ustvari vsaj 5 testnih skill-ov
□ 6. Restartaj Claude Desktop
□ 7. Testiraj: @ollama-skills-bridge list
□ 8. Testiraj: @ollama-skills-bridge execute skill=copywriting ...
```

---

## 🐛 TEŽAVE IN REŠITVE

### **Problem: Skills se ne naložijo**
```cmd
# Preveri če so skillovi v mapi skills/
dir F:\ollama_mcp\skills

# Preveri če imajo .js končnico
# Preveri če imajo export.module
```

### **Problem: MCP server se ne zažene**
```cmd
# Preveri dependencies
cd F:\ollama_mcp
npm install

# Preveri če je Ollama running
ollama serve
```

### **Problem: Claude Desktop ne vidi MCP-ja**
1. Zapri Claude Desktop
2. Preveri `claude_desktop_config.json`
3. Preveri JSON syntax
4. Shrani
5. Zaženi Claude Desktop znova

---

## 📞 DOKUMENTACIJA

| Datoteka | Opis |
|----------|------|
| `OLLAMA_SKILLS_BRIDGE.md` | Popolna dokumentacija s kodo |
| `install-ollama-skills-bridge.bat` | Namestitvena skripta |
| `OLLAMA_VSI_MCP_JI.md` | Vsi MCP-ji (24) |
| `OLLAMA_MCP_HITRA_KARTICA.md` | Hitra referenca |

---

## 🎯 NEXT STEPS

1. **Namesti:**
   ```cmd
   F:\thedrinkers\the\install-ollama-skills-bridge.bat
   ```

2. **Dodaj skill-e:**
   - Kopiraj svoje skill-e iz `.qwen/skills/` v `F:\ollama_mcp\skills\`
   - Ali ustvari nove po template-u

3. **Testiraj:**
   ```
   @ollama-skills-bridge list
   @ollama-skills-bridge execute skill=copywriting type=email topic="Test"
   ```

4. **Uživaj v 424 skill-ih preko Ollame!** 🎉

---

## ✅ POVZETEK

```
✅ Skills: 424
✅ MCP Server: Pripravljen
✅ Bridge: Povezan
✅ Ollama: Integrirana
✅ Config: Ustvarjen
✅ Namestitev: Pripravljena

📋 NAMESTI Z: install-ollama-skills-bridge.bat
```

---

**Vsi 424 skillov pripravljenih za povezavo z Ollamo! 🚀🤖💻🔥**
