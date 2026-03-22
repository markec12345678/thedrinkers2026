# ✅ DYAD KONFIGURIRAN Z MCP SERVERJI

## 🎉 STATUS: KONFIGURACIJA USPEŠNA

---

## 📍 LOKACIJA KONFIGURACIJE

```
C:\Users\admin\AppData\Roaming\dyad\config.json
```

---

## 🖥️ NAMEŠČENI MCP SERVERJI (5)

### **1. Desktop Commander**
- **Ukaz:** `npx -y @wonderwhy-er/desktop-commander`
- **Uporaba:** File operations, terminal commands
- **Primeri:**
  ```
  @desktop-commander list_files path="F:\d"
  @desktop-commander execute_command command="dir"
  ```

### **2. Filesystem**
- **Ukaz:** `npx -y @modelcontextprotocol/server-filesystem F:\d`
- **Uporaba:** Dostop do datotek v F:\d
- **Primeri:**
  ```
  @filesystem list path=F:\d\dyad
  @filesystem read path=F:\d\README.md
  ```

### **3. Git**
- **Ukaz:** `npx -y @modelcontextprotocol/server-git`
- **Uporaba:** Git operacije
- **Primeri:**
  ```
  @git status path=F:\d\dyad
  @git commit message="Update"
  ```

### **4. Ollama**
- **Ukaz:** `npx -y ollama-mcp-server`
- **Uporaba:** AI modeli (Llama2, Mistral, itd.)
- **Primeri:**
  ```
  @ollama generate model=llama2 prompt="Hello!"
  ```

### **5. Ollama Skills Bridge**
- **Ukaz:** `node F:\ollama_mcp\index.js`
- **Uporaba:** 424 skill-ov preko Ollame
- **Primeri:**
  ```
  @ollama-skills-bridge execute skill=copywriting ...
  ```

---

## 🚀 NASLEDNJI KORAKI

### **1. Namesti MCP serverje:**
```cmd
F:\thedrinkers\the\install-desktop-commander-mcp.bat
```

### **2. Restartaj Dyad:**
- Zapri Dyad
- Odpri Dyad znova

### **3. Testiraj:**
V Dyad:
```
@desktop-commander execute_command command="node --version"
@filesystem list path=F:\d
@ollama generate model=llama2 prompt="Pozdravljen!"
```

---

## 📋 KONFIGURACIJA

### **Trenutna config:**
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
    },
    "ollama": {
      "command": "npx",
      "args": ["-y", "ollama-mcp-server"],
      "env": {
        "OLLAMA_HOST": "http://localhost:11434"
      }
    },
    "ollama-skills-bridge": {
      "command": "node",
      "args": ["F:\\ollama_mcp\\index.js"],
      "env": {}
    }
  }
}
```

---

## 🐛 TEŽAVE?

### **Dyad ne vidi MCP-jev:**
1. Zapri Dyad
2. Preveri config: `C:\Users\admin\AppData\Roaming\dyad\config.json`
3. Preveri JSON syntax
4. Odpri Dyad znova

### **MCP serverji ne delujejo:**
```cmd
# Namesti vse MCP-je
F:\thedrinkers\the\install-desktop-commander-mcp.bat

# Preveri če so nameščeni
npm list -g @wonderwhy-er/desktop-commander
npm list -g @modelcontextprotocol/server-filesystem
npm list -g ollama-mcp-server
```

---

## 📞 DOKUMENTACIJA

| Datoteka | Opis |
|----------|------|
| `dyad-config-backup.json` | Backup konfiguracije |
| `DESKTOP_COMMANDER_MCP.md` | Desktop Commander navodila |
| `OLLAMA_SKILLS_BRIDGE_FINAL.md` | Ollama Skills Bridge |
| `configure-dyad-mcp.bat` | Konfiguracijska skripta |

---

## ✅ POVZETEK

```
✅ Dyad Config: Ustvarjena
✅ Lokacija: C:\Users\admin\AppData\Roaming\dyad\config.json
✅ MCP Serverji: 5 konfiguriranih
✅ Backup: F:\thedrinkers\the\dyad-config-backup.json

📋 NAMESTI MCP-JE: install-desktop-commander-mcp.bat
🚀 RESTARTAJ: Dyad
```

---

**Dyad je konfiguriran z vsemi MCP serverji! 🚀💻🤖**
