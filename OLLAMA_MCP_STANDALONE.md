# 🤖 OLLAMA MCP - SAMOSTOJNA NAMESTITEV

## 📂 LOKACIJA: `F:\ollama_mcp`

---

## 🚀 HITRA NAMESTITEV

### **Korak 1: Ustvari mapo**
```cmd
mkdir F:\ollama_mcp
cd F:\ollama_mcp
```

### **Korak 2: Ustvari package.json**

Odpri Notepad in prilepi:

```json
{
  "name": "ollama-mcp-server",
  "version": "1.0.0",
  "description": "Standalone Ollama MCP Server",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "ollama": "^0.5.0",
    "express": "^4.18.0"
  }
}
```

Shrani kot: `F:\ollama_mcp\package.json`

### **Korak 3: Namesti dependencies**
```cmd
cd F:\ollama_mcp
npm install
```

### **Korak 4: Ustvari index.js**

Odpri Notepad in prilepi kodo (glej spodaj)

Shrani kot: `F:\ollama_mcp\index.js`

### **Korak 5: Zaženi**
```cmd
cd F:\ollama_mcp
node index.js
```

---

## 📦 VSI MCP-JI ZA OLLAMO

### **1. Ollama Core MCP**
```json
{
  "name": "ollama",
  "command": "npx",
  "args": ["-y", "ollama-mcp-server"]
}
```

### **2. Filesystem MCP**
```json
{
  "name": "filesystem",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem"],
  "args": ["F:\\ollama_mcp\\files"]
}
```

### **3. Git MCP**
```json
{
  "name": "git",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-git"]
}
```

### **4. Database MCP (PostgreSQL)**
```json
{
  "name": "database",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-postgres"],
  "args": ["postgresql://localhost:5432/ollama"]
}
```

### **5. Memory MCP**
```json
{
  "name": "memory",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
}
```

### **6. Sequential Thinking MCP**
```json
{
  "name": "sequential-thinking",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
}
```

### **7. Time MCP**
```json
{
  "name": "time",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-time"]
}
```

### **8. Fetch MCP**
```json
{
  "name": "fetch",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-fetch"]
}
```

### **9. Puppeteer MCP**
```json
{
  "name": "puppeteer",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
}
```

### **10. SQLite MCP**
```json
{
  "name": "sqlite",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sqlite"]
}
```

---

## 🔧 POPOLNA MCP KONFIGURACIJA

### **Za Claude Desktop:**

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
    }
  }
}
```

---

## 📋 NAMESTITVENA SKRIPTA

### **install-all-mcps.bat**

```batch
@echo off
echo ========================================
echo   OLLAMA MCP - ALL MCPs INSTALLER
echo ========================================
echo.

cd /d F:\ollama_mcp

echo [1/10] Installing Ollama MCP...
npm install -g ollama-mcp-server

echo [2/10] Installing Filesystem MCP...
npm install -g @modelcontextprotocol/server-filesystem

echo [3/10] Installing Git MCP...
npm install -g @modelcontextprotocol/server-git

echo [4/10] Installing Memory MCP...
npm install -g @modelcontextprotocol/server-memory

echo [5/10] Installing Sequential Thinking MCP...
npm install -g @modelcontextprotocol/server-sequential-thinking

echo [6/10] Installing Time MCP...
npm install -g @modelcontextprotocol/server-time

echo [7/10] Installing Fetch MCP...
npm install -g @modelcontextprotocol/server-fetch

echo [8/10] Installing SQLite MCP...
npm install -g @modelcontextprotocol/server-sqlite

echo [9/10] Installing Puppeteer MCP...
npm install -g @modelcontextprotocol/server-puppeteer

echo [10/10] Creating directories...
mkdir files
mkdir databases

echo.
echo ========================================
echo   ALL MCPs INSTALLED!
echo ========================================
echo.
echo Next steps:
echo 1. Edit Claude Desktop config
echo 2. Add MCPs from above
echo 3. Restart Claude Desktop
echo.
pause
```

---

## 🎯 TESTIRANJE

### **Test 1: Ollama MCP**
```bash
# V Claude Desktop:
@ollama generate model=llama2 prompt="Hello!"
```

### **Test 2: Filesystem MCP**
```bash
# V Claude Desktop:
@filesystem list path=F:\ollama_mcp
```

### **Test 3: Git MCP**
```bash
# V Claude Desktop:
@git status path=F:\ollama_mcp
```

### **Test 4: Memory MCP**
```bash
# V Claude Desktop:
@memory save key=test value="Hello from Ollama!"
```

---

## 📊 VSI RAZPOLOŽLJIVI MCP-JI

| MCP | Namestitev | Opis |
|-----|------------|------|
| **ollama** | `ollama-mcp-server` | AI modeli preko Ollame |
| **filesystem** | `@modelcontextprotocol/server-filesystem` | Dostop do datotek |
| **git** | `@modelcontextprotocol/server-git` | Git operacije |
| **memory** | `@modelcontextprotocol/server-memory` | Dolgoročni spomin |
| **sequential-thinking** | `@modelcontextprotocol/server-sequential-thinking` | Verižno razmišljanje |
| **time** | `@modelcontextprotocol/server-time` | Čas in datumi |
| **fetch** | `@modelcontextprotocol/server-fetch` | HTTP requesti |
| **puppeteer** | `@modelcontextprotocol/server-puppeteer` | Browser avtomatizacija |
| **sqlite** | `@modelcontextprotocol/server-sqlite` | SQLite baza |
| **postgres** | `@modelcontextprotocol/server-postgres` | PostgreSQL baza |

---

## ✅ HITRI POVZETEK

```
✅ Lokacija: F:\ollama_mcp (ločeno od The Drinkers)
✅ Ollama: Samostojna namestitev
✅ MCP-ji: Vsi na voljo preko npm
✅ Config: Claude Desktop config
✅ Neodvisno: Ni povezave z The Drinkers projektom
```

---

## 🚀 ZAGON

```cmd
# 1. Odpri F:\ollama_mcp
cd F:\ollama_mcp

# 2. Namesti vse MCP-je
npm install -g ollama-mcp-server
npm install -g @modelcontextprotocol/server-*

# 3. Ustvari config
Uredi C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json

# 4. Restartaj Claude Desktop

# 5. Uporabljaj MCP-je!
```

---

**Vse pripravljeno za samostojno Ollama MCP namestitev! 🚀🤖**
