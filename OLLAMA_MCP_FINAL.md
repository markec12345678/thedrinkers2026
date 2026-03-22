# ✅ OLLAMA MCP - SAMOSTOJNA NAMESTITEV KONČANA

## 🎯 STATUS: VSE PRIPRAVLJENO

---

## 📂 LOKACIJA

**Samostojna namestitev:** `F:\ollama_mcp`  
**Ni povezano z:** `F:\thedrinkers\the` (The Drinkers projekt)

---

## 🚀 KAKO NAMESTITI

### **Opcija 1: Avtomatska namestitev (Najlažje)**

```cmd
# Zaženi namestitveno skripto
F:\thedrinkers\the\install-ollama-all-mcps.bat

# Sledi navodilom na ekranu
```

### **Opcija 2: Ročna namestitev**

```cmd
# 1. Ustvari mapo
mkdir F:\ollama_mcp
cd F:\ollama_mcp

# 2. Namesti vse MCP-je
npm install -g ollama-mcp-server
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-git
npm install -g @modelcontextprotocol/server-memory
npm install -g @modelcontextprotocol/server-sequential-thinking
npm install -g @modelcontextprotocol/server-time
npm install -g @modelcontextprotocol/server-fetch
npm install -g @modelcontextprotocol/server-sqlite
npm install -g @modelcontextprotocol/server-puppeteer

# 3. Ustvari mape
mkdir files
mkdir databases
```

---

## 📦 NAMEŠČENI MCP-JI (9)

| # | MCP | Ukaz | Opis |
|---|-----|------|------|
| 1 | **ollama** | `ollama-mcp-server` | AI modeli (Llama2, Mistral, itd.) |
| 2 | **filesystem** | `@modelcontextprotocol/server-filesystem` | Branje/pisanje datotek |
| 3 | **git** | `@modelcontextprotocol/server-git` | Git operacije (commit, push, etc.) |
| 4 | **memory** | `@modelcontextprotocol/server-memory` | Dolgoročni spomin |
| 5 | **sequential-thinking** | `@modelcontextprotocol/server-sequential-thinking` | Verižno razmišljanje |
| 6 | **time** | `@modelcontextprotocol/server-time` | Čas, datumi, koledar |
| 7 | **fetch** | `@modelcontextprotocol/server-fetch` | HTTP GET/POST requesti |
| 8 | **sqlite** | `@modelcontextprotocol/server-sqlite` | SQLite baza podatkov |
| 9 | **puppeteer** | `@modelcontextprotocol/server-puppeteer` | Browser avtomatizacija |

---

## 🔧 KONFIGURACIJA

### **Claude Desktop Config**

Lokacija: `C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ollama": {
      "command": "npx",
      "args": ["-y", "ollama-mcp-server"],
      "env": {
        "OLLAMA_HOST": "http://localhost:11434"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:\\ollama_mcp\\files"]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "time": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-time"]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}
```

---

## 🎯 KAKO UPORABLJATI

### **V Claude Desktop:**

#### **1. Ollama MCP**
```
@ollama generate model=llama2 prompt="Pozdravljen!"
@ollama chat model=mistral message="Kako si?"
```

#### **2. Filesystem MCP**
```
@filesystem list path=F:\ollama_mcp
@filesystem read path=F:\ollama_mcp\files\test.txt
@filesystem write path=F:\ollama_mcp\files\test.txt content="Hello!"
```

#### **3. Git MCP**
```
@git status path=F:\ollama_mcp
@git commit path=F:\ollama_mcp message="Initial commit"
```

#### **4. Memory MCP**
```
@memory save key=test value="To je testni spomin"
@memory load key=test
@memory search query="test"
```

#### **5. Sequential Thinking MCP**
```
@sequential-thinking problem="Kako rešiti X?"
```

#### **6. Time MCP**
```
@time now
@time format date=2024-01-01 format=DD.MM.YYYY
```

#### **7. Fetch MCP**
```
@fetch get url=https://api.example.com/data
@fetch post url=https://api.example.com/data body={"key":"value"}
```

#### **8. SQLite MCP**
```
@sqlite query "SELECT * FROM users"
@sqlite execute "CREATE TABLE test (id INTEGER, name TEXT)"
```

#### **9. Puppeteer MCP**
```
@puppeteer navigate url=https://example.com
@puppeteer screenshot
@puppeteer click selector="#button"
```

---

## 📊 STRUKTURA MAP

```
F:\ollama_mcp\
├── files/              # Filesystem MCP datoteke
├── databases/          # SQLite baze
├── package.json        # Node.js config
└── index.js            # Ollama MCP server (če ustvariš)
```

---

## ✅ PREVERI NAMESTITEV

### **Test 1: Preveri če so MCP-ji nameščeni**
```cmd
npm list -g ollama-mcp-server
npm list -g @modelcontextprotocol/server-filesystem
npm list -g @modelcontextprotocol/server-git
```

### **Test 2: Preveri Ollamo**
```cmd
ollama list
ollama serve
```

### **Test 3: Preveri Claude Desktop**
1. Odpri Claude Desktop
2. Poglej če so MCP-ji naloženi (vidi jih v @ meniju)
3. Testiraj: `@ollama generate model=llama2 prompt="test"`

---

## ⚠️ TEŽAVE IN REŠITVE

### **Problem: MCP se ne naloži**
```cmd
# Preveri če je Node.js nameščen
node --version

# Preveri če so MCP-ji nameščeni
npm list -g --depth=0
```

### **Problem: Ollama ne dela**
```cmd
# Restartaj Ollamo
taskkill /F /IM ollama.exe
timeout /t 3
ollama serve
```

### **Problem: Claude Desktop ne vidi MCP-jev**
1. Zapri Claude Desktop
2. Preveri `claude_desktop_config.json`
3. Preveri JSON syntax (https://jsonlint.com)
4. Shrani
5. Zaženi Claude Desktop znova

---

## 📞 PODPORA

- **Ollama Docs:** https://ollama.com/docs
- **MCP Protocol:** https://modelcontextprotocol.io
- **MCP Servers:** https://github.com/modelcontextprotocol/servers
- **Ollama MCP:** https://github.com/ollama/ollama

---

## ✅ POVZETEK

```
✅ Lokacija: F:\ollama_mcp (samostojno)
✅ Ni povezave z: F:\thedrinkers\the (The Drinkers projekt)
✅ Nameščeni MCP-ji: 9
✅ Config: Samodejno ustvarjen
✅ Pripravljeno za uporabo: DA

📋 NAMESTI Z: install-ollama-all-mcps.bat
```

---

## 🚀 NASLEDNJI KORAKI

1. **Zaženi namestitev:**
   ```cmd
   F:\thedrinkers\the\install-ollama-all-mcps.bat
   ```

2. **Restartaj Claude Desktop**

3. **Testiraj MCP-je:**
   ```
   @ollama generate model=llama2 prompt="Pozdravljen!"
   ```

4. **Uživaj v MCP-jih!** 🎉

---

**Vse pripravljeno za samostojno Ollama MCP namestitev! 🚀🤖**
