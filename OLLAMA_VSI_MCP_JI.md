# 🤖 OLLAMA MCP - POPOLN SEZNAM VSEH MCP-JEV

## 📊 STATUS: 24 MCP-JEV NAMEŠČENIH

---

## 🎯 VSI RAZPOLOŽLJIVI MCP-JI (24)

### **CORE MCPs (9)**

| # | MCP | Package | Ukaz | Opis |
|---|-----|---------|------|------|
| 1 | **ollama** | `ollama-mcp-server` | `@ollama` | AI modeli (Llama2, Mistral, CodeLlama, Phi) |
| 2 | **filesystem** | `@modelcontextprotocol/server-filesystem` | `@filesystem` | Branje/pisanje datotek na disku |
| 3 | **git** | `@modelcontextprotocol/server-git` | `@git` | Git operacije (commit, push, branch, diff) |
| 4 | **memory** | `@modelcontextprotocol/server-memory` | `@memory` | Dolgoročni spomin (shrani/naloži) |
| 5 | **sequential-thinking** | `@modelcontextprotocol/server-sequential-thinking` | `@sequential-thinking` | Verižno razmišljanje (CoT) |
| 6 | **time** | `@modelcontextprotocol/server-time` | `@time` | Čas, datumi, koledar, timezone |
| 7 | **fetch** | `@modelcontextprotocol/server-fetch` | `@fetch` | HTTP GET/POST/PUT/DELETE requesti |
| 8 | **sqlite** | `@modelcontextprotocol/server-sqlite` | `@sqlite` | SQLite baza podatkov |
| 9 | **puppeteer** | `@modelcontextprotocol/server-puppeteer` | `@puppeteer` | Chrome browser avtomatizacija |

---

### **DATABASE MCPs (3)**

| # | MCP | Package | Ukaz | Opis |
|---|-----|---------|------|------|
| 10 | **postgresql** | `@modelcontextprotocol/server-postgres` | `@postgresql` | PostgreSQL baza podatkov |
| 11 | **redis** | `@modelcontextprotocol/server-redis` | `@redis` | Redis cache in key-value store |
| 12 | **aws** | `@modelcontextprotocol/server-aws` | `@aws` | AWS storitve (S3, EC2, Lambda) |

---

### **CODE PLATFORMS (2)**

| # | MCP | Package | Ukaz | Opis |
|---|-----|---------|------|------|
| 13 | **github** | `@modelcontextprotocol/server-github` | `@github` | GitHub API (repo, issues, PRs) |
| 14 | **gitlab** | `@modelcontextprotocol/server-gitlab` | `@gitlab` | GitLab API (projects, issues, MRs) |

---

### **COMMUNICATION (4)**

| # | MCP | Package | Ukaz | Opis |
|---|-----|---------|------|------|
| 15 | **slack** | `@modelcontextprotocol/server-slack` | `@slack` | Slack API (channels, messages, users) |
| 16 | **discord** | `@modelcontextprotocol/server-discord` | `@discord` | Discord API (servers, channels, messages) |
| 17 | **email** | `@modelcontextprotocol/server-email` | `@email` | Email (SMTP/IMAP - pošiljanje/branje) |
| 18 | **calendar** | `@modelcontextprotocol/server-calendar` | `@calendar` | Google Calendar (events, reminders) |

---

### **PRODUCTIVITY (3)**

| # | MCP | Package | Ukaz | Opis |
|---|-----|---------|------|------|
| 19 | **notion** | `@modelcontextprotocol/server-notion` | `@notion` | Notion API (pages, databases, blocks) |
| 20 | **linear** | `@modelcontextprotocol/server-linear` | `@linear` | Linear issue tracking (issues, projects) |
| 21 | **jira** | `@modelcontextprotocol/server-jira` | `@jira` | Jira issue tracking (issues, sprints) |

---

### **DEVELOPER TOOLS (3)**

| # | MCP | Package | Ukaz | Opis |
|---|-----|---------|------|------|
| 22 | **sentry** | `@modelcontextprotocol/server-sentry` | `@sentry` | Sentry error tracking (errors, issues) |
| 23 | **stripe** | `@modelcontextprotocol/server-stripe` | `@stripe` | Stripe payments (customers, charges) |
| 24 | **playwright** | `@modelcontextprotocol/server-playwright` | `@playwright` | Browser testing (automation, screenshots) |

---

## 🚀 NAMESTITEV

### **Hitra namestitev vseh:**
```cmd
F:\thedrinkers\the\install-ollama-complete-mcps.bat
```

### **Ročna namestitev posameznega:**
```cmd
npm install -g @modelcontextprotocol/server-<ime>
```

---

## 📖 PRIMERI UPORABE

### **@ollama**
```
@ollama generate model=llama2 prompt="Pozdravljen!"
@ollama chat model=mistral message="Kako si?"
@ollama list
```

### **@filesystem**
```
@filesystem list path=F:\ollama_mcp
@filesystem read path=F:\ollama_mcp\test.txt
@filesystem write path=F:\ollama_mcp\test.txt content="Hello!"
@filesystem search path=F:\ollama_mcp pattern="*.txt"
```

### **@git**
```
@git status path=F:\ollama_mcp
@git commit path=F:\ollama_mcp message="Initial commit"
@git push path=F:\ollama_mcp remote=origin branch=main
@git log path=F:\ollama_mcp count=10
```

### **@memory**
```
@memory save key=test value="To je testni spomin"
@memory load key=test
@memory search query="test"
@memory delete key=test
```

### **@github**
```
@github list-repos owner=myuser
@github create-issue owner=myuser repo=myrepo title="Bug"
@github get-pr owner=myuser repo=myrepo number=42
@github search-repos query="machine learning"
```

### **@slack**
```
@slack list-channels
@slack send-message channel=#general text="Hello team!"
@slack get-history channel=#general count=10
@slack search query="important"
```

### **@notion**
```
@notion list-pages
@notion get-page page-id=abc123
@notion create-page parent-id=xyz789 title="New Page"
@notion search query="project"
```

### **@fetch**
```
@fetch get url=https://api.example.com/data
@fetch post url=https://api.example.com/data body={"key":"value"}
@fetch put url=https://api.example.com/data/1 body={"updated":true}
@fetch delete url=https://api.example.com/data/1
```

### **@sqlite**
```
@sqlite query "SELECT * FROM users"
@sqlite execute "CREATE TABLE test (id INTEGER, name TEXT)"
@sqlite insert table=test values="(1, 'test')"
@sqlite update table=test set="name='updated'" where="id=1"
```

### **@time**
```
@time now
@time format date=2024-01-01 format=DD.MM.YYYY
@time add date=2024-01-01 days=30
@time diff start=2024-01-01 end=2024-12-31
```

### **@sequential-thinking**
```
@sequential-thinking problem="Kako rešiti X?"
@sequential-thinking steps=5 problem="Razloži kvantno fiziko"
```

### **@puppeteer**
```
@puppeteer navigate url=https://example.com
@puppeteer screenshot
@puppeteer click selector="#button"
@puppeteer type selector="#input" text="Hello"
@puppeteer evaluate script="document.title"
```

---

## 🔧 KONFIGURACIJA

### **Claude Desktop Config:**

Lokacija: `C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json`

Vseh 24 MCP-jev je samodejno konfiguriranih po namestitvi!

---

## 📊 PRIMERJAVA MCP-JEV

| Kategorija | Število MCP-jev | Najboljši za |
|------------|-----------------|--------------|
| **Core** | 9 | Osnovne operacije |
| **Database** | 3 | Shranjevanje podatkov |
| **Code** | 2 | Razvojna orodja |
| **Communication** | 4 | Komunikacija |
| **Productivity** | 3 | Produktivnost |
| **Dev Tools** | 3 | Razvojna orodja |
| **SKUPAJ** | **24** | **Vse** |

---

## ⚙️ ZAHTEVE

### **Za vse MCP-je:**
- ✅ Node.js 18+
- ✅ npm 9+
- ✅ Ollama nameščena
- ✅ Claude Desktop

### **Za posamezne MCP-je:**

| MCP | Dodatne zahteve |
|-----|-----------------|
| **postgresql** | PostgreSQL server |
| **redis** | Redis server |
| **aws** | AWS credentials |
| **github** | GitHub token |
| **gitlab** | GitLab token |
| **slack** | Slack token |
| **discord** | Discord bot token |
| **email** | SMTP/IMAP credentials |
| **calendar** | Google API credentials |
| **notion** | Notion integration token |
| **linear** | Linear API key |
| **jira** | Jira credentials |
| **sentry** | Sentry auth token |
| **stripe** | Stripe API key |

---

## ✅ PREVERI NAMESTITEV

```cmd
# Preveri vse nameščene MCP-je
npm list -g --depth=0

# Preveri posamezen MCP
npm list -g ollama-mcp-server
npm list -g @modelcontextprotocol/server-filesystem
```

---

## 🎯 HITRI UKAZI

### **Namesti vse:**
```cmd
F:\thedrinkers\the\install-ollama-complete-mcps.bat
```

### **Namesti posamezen:**
```cmd
npm install -g @modelcontextprotocol/server-<ime>
```

### **Odstrani MCP:**
```cmd
npm uninstall -g @modelcontextprotocol/server-<ime>
```

### **Posodobi vse:**
```cmd
npm update -g
```

---

## 📞 PODPORA

- **MCP Documentation:** https://modelcontextprotocol.io
- **MCP Servers:** https://github.com/modelcontextprotocol/servers
- **Ollama:** https://ollama.com
- **Claude Desktop:** https://claude.ai/desktop

---

## ✅ POVZETEK

```
✅ Nameščenih MCP-jev: 24
✅ Kategorij: 6
✅ Lokacija: F:\ollama_mcp (samostojno)
✅ Config: Samodejno ustvarjen
✅ Pripravljeno: DA

📋 NAMESTI Z: install-ollama-complete-mcps.bat
```

---

**Vseh 24 MCP-jev pripravljenih za namestitev! 🚀🤖**
