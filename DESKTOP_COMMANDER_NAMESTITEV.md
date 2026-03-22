# ✅ DESKTOP COMMANDER MCP - NAMESTITEV

## 🎯 STATUS: NAMESTITEV PRIPRAVLJENA

---

## 📦 KAJ JE DESKTOP COMMANDER MCP?

**Desktop Commander** je MCP server ki omogoča:
- ✅ Brskanje po datotekah
- ✅ Branje/pisanje datotek
- ✅ Izvajanje terminal ukazov
- ✅ Iskanje datotek
- ✅ Urejanje kode

---

## 🚀 NAMESTITEV

### **Opcija 1: Avtomatska namestitev**

```cmd
F:\thedrinkers\the\install-desktop-commander-mcp.bat
```

### **Opcija 2: Ročna namestitev**

```cmd
# 1. Namesti Desktop Commander MCP
npm install -g @wonderwhy-er/desktop-commander

# 2. Namesti dodatne MCP-je
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-git

# 3. Posodobi Claude config
# Glej spodaj
```

---

## ⚙️ KONFIGURACIJA

### **Claude Desktop Config:**

**Lokacija:** `C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "desktop-commander": {
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander"],
      "env": {}
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:\\d"],
      "env": {}
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"],
      "env": {}
    }
  }
}
```

---

## 🎯 UPORABA

### **V Claude Desktop:**

#### **1. File Operations:**
```
@desktop-commander list_files path="F:\d\dyad"
@desktop-commander read_file path="F:\d\dyad\package.json"
@desktop-commander write_file path="F:\d\test.txt" content="Hello!"
```

#### **2. Terminal Commands:**
```
@desktop-commander execute_command command="dir F:\d"
@desktop-commander execute_command command="npm install"
@desktop-commander execute_command command="node --version"
```

#### **3. Search:**
```
@desktop-commander search_files path="F:\d" pattern="*.json"
@desktop-commander search_files path="F:\d" pattern="*.md"
```

#### **4. Filesystem MCP:**
```
@filesystem list path=F:\d
@filesystem read path=F:\d\README.md
```

#### **5. Git MCP:**
```
@git status path=F:\d\dyad
@git diff path=F:\d\dyad
```

---

## 📋 NAMESTITVENA CHECKLISTA

```
□ 1. Namesti Desktop Commander MCP
   npm install -g @wonderwhy-er/desktop-commander

□ 2. Namesti Filesystem MCP
   npm install -g @modelcontextprotocol/server-filesystem

□ 3. Namesti Git MCP
   npm install -g @modelcontextprotocol/server-git

□ 4. Posodobi Claude Desktop config
   C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json

□ 5. Restartaj Claude Desktop

□ 6. Testiraj:
   @desktop-commander execute_command command="node --version"
```

---

## 🐛 TEŽAVE?

### **MCP se ne naloži:**
```cmd
# Preveri namestitev
npm list -g @wonderwhy-er/desktop-commander

# Namesti znova
npm install -g @wonderwhy-er/desktop-commander
```

### **Claude Desktop ne vidi MCP:**
1. Zapri Claude Desktop
2. Preveri config JSON
3. Preveri JSON syntax
4. Shrani
5. Zaženi Claude Desktop znova

---

## 📞 DOKUMENTACIJA

| Datoteka | Opis |
|----------|------|
| `DESKTOP_COMMANDER_MCP.md` | Podrobna navodila |
| `install-desktop-commander-mcp.bat` | Namestitvena skripta |

---

## ✅ POVZETEK

```
✅ Desktop Commander MCP: Na voljo
✅ Filesystem MCP: Na voljo
✅ Git MCP: Na voljo
✅ Config: Pripravljen
✅ Namestitev: Avtomatska

📋 NAMESTI Z: install-desktop-commander-mcp.bat
```

---

**Desktop Commander MCP je pripravljen! 🚀💻**
