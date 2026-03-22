# 🤖 OLLAMA MCP - HITRA REFERENČNA KARTICA

## 📦 NAMESTITEV

```cmd
# Namesti VSEH 24 MCP-jev
F:\thedrinkers\the\install-ollama-complete-mcps.bat

# Po namestitvi restartaj Claude Desktop
```

---

## 🎯 VSI MCP-JI (24)

### **Core (9)**
```
@ollama              - AI modeli
@filesystem          - Datoteke
@git                 - Git operacije
@memory              - Spomin
@sequential-thinking - Verižno razmišljanje
@time                - Čas/datumi
@fetch               - HTTP requesti
@sqlite              - SQLite baza
@puppeteer           - Browser avtomatizacija
```

### **Database (3)**
```
@postgresql          - PostgreSQL baza
@redis               - Redis cache
@aws                 - AWS storitve
```

### **Code Platforms (2)**
```
@github              - GitHub API
@gitlab              - GitLab API
```

### **Communication (4)**
```
@slack               - Slack API
@discord             - Discord API
@email               - Email
@calendar            - Google Calendar
```

### **Productivity (3)**
```
@notion              - Notion API
@linear              - Linear issues
@jira                - Jira issues
```

### **Dev Tools (3)**
```
@sentry              - Error tracking
@stripe              - Payments
@playwright          - Browser testing
```

---

## 📖 HITRI PRIMERI

### **AI Modeli**
```
@ollama generate model=llama2 prompt="Pozdravljen!"
```

### **Datoteke**
```
@filesystem list path=F:\ollama_mcp
@filesystem read path=F:\ollama_mcp\file.txt
```

### **Git**
```
@git status
@git commit message="Update"
```

### **GitHub**
```
@github list-repos owner=myuser
@github create-issue title="Bug" body="Description"
```

### **Slack**
```
@slack list-channels
@slack send-message channel=#general text="Hello!"
```

### **Notion**
```
@notion list-pages
@notion create-page title="New Page"
```

### **Database**
```
@sqlite query "SELECT * FROM users"
@postgresql query "SELECT * FROM table"
```

### **Browser**
```
@puppeteer navigate url=https://example.com
@puppeteer screenshot
```

### **HTTP**
```
@fetch get url=https://api.example.com/data
@fetch post url=https://api.example.com body={"key":"value"}
```

### **Spomin**
```
@memory save key=test value="Important info"
@memory load key=test
```

---

## 🔧 KONFIGURACIJA

**Lokacija configa:**
```
C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json
```

**Vsi MCP-ji so samodejno konfigurirani!**

---

## ⚙️ LOKACIJE

```
Ollama MCP:        F:\ollama_mcp (samostojno)
The Drinkers:      F:\thedrinkers\the (projekt)
Claude Config:     %APPDATA%\Claude\claude_desktop_config.json
```

---

## 🐛 TEŽAVE?

### **MCP se ne naloži**
```cmd
# Preveri namestitev
npm list -g --depth=0

# Namesti znova
npm install -g @modelcontextprotocol/server-<ime>
```

### **Claude Desktop ne vidi MCP-jev**
1. Zapri Claude Desktop
2. Preveri config JSON
3. Shrani
4. Zaženi Claude Desktop znova

### **Ollama ne dela**
```cmd
taskkill /F /IM ollama.exe
timeout /t 3
ollama serve
```

---

## 📞 LINKI

- **Navodila:** `F:\thedrinkers\the\OLLAMA_VSI_MCP_JI.md`
- **MCP Docs:** https://modelcontextprotocol.io
- **Ollama:** https://ollama.com

---

**24 MCP-jev pripravljenih! 🚀**
