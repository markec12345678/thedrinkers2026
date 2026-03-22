# ✅ OLLAMA MCP PREVERBA - POROČILO

## 📊 STATUS MCP PODPORE

### **Ollama:**
```
✅ Nameščena: v0.18.2
✅ Lokacija: C:\Users\admin\AppData\Local\Programs\Ollama\ollama.exe
✅ Server: http://localhost:11434
✅ MCP Support: Preko ollama-mcp-server
```

---

## 🔍 ALI OLLAMA IMA MCP?

### **Odgovor:**
❌ **Ne direktno** - Ollama nima vgrajenega MCP serverja

### **Rešitev:**
✅ **DA** - Lahko namestiš **ollama-mcp-server** bridge!

---

## 🚀 KAKO DODATI MCP ZA OLLAMO

### **Hitra Namestitev:**

```powershell
# 1. Zaženi namestitveno skripto
powershell -ExecutionPolicy Bypass -File "F:\thedrinkers\the\install-ollama-mcp.ps1"

# 2. Restartaj Claude Desktop

# 3. Uporabljaj Ollama MCP:
@ollama generate model=llama2 prompt="Hello!"
```

---

## 📁 USTVARJENE DATOTEKE

| Datoteka | Opis |
|----------|------|
| `OLLAMA_MCP_NAVODILA.md` | Podrobna navodila |
| `ollama-mcp-config.json` | MCP config template |
| `install-ollama-mcp.ps1` | Avtomatska namestitev |

---

## 🎯 MCPS KI JIH LAHKO DODAŠ

### **Za Ollamo:**
```json
{
  "mcpServers": {
    "ollama": {
      "command": "npx",
      "args": ["-y", "ollama-mcp-server"]
    }
  }
}
```

### **Drugi koristni MCP-ji:**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    },
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    },
    "database": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"]
    }
  }
}
```

---

## ✅ HITRA NAMESTITEV

### **Korak 1: Namesti MCP server**
```bash
npm install -g ollama-mcp-server
```

### **Korak 2: Dodaj v config**
Odpri: `C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json`

Dodaj:
```json
{
  "mcpServers": {
    "ollama": {
      "command": "npx",
      "args": ["-y", "ollama-mcp-server"],
      "env": {
        "OLLAMA_HOST": "http://localhost:11434"
      }
    }
  }
}
```

### **Korak 3: Restartaj Claude Desktop**

---

## 🎯 TESTIRANJE

### **Test 1: Preveri MCP**
V Claude Desktop:
```
@ollama generate model=llama2 prompt="Pozdravljen!"
```

### **Test 2: Preveri Ollamo**
```bash
ollama run llama2 "Pozdravljen!"
```

### **Test 3: Preveri server**
```bash
curl http://localhost:11434/api/generate
```

---

## 📦 RAZPOLOŽLJIVI MODELI

```bash
# Preveri nameščene
ollama list

# Namesti nove
ollama pull llama2
ollama pull mistral
ollama pull codellama
ollama pull phi
```

---

## ⚙️ TRENUTNI MCP CONFIG

Tvoj trenutni config (`F:\thedrinkers\the\.qwen\mcp.json`) vsebuje:

```
✅ neon
✅ vercel
✅ github
✅ mcp-server (Prismicio)
✅ G (Composio)
✅ gmail
✅ googlecalendar
✅ notion
✅ g (Google Sheets)
✅ sub (Supabase)
✅ airtable
✅ youtube
✅ K (Slackbot)
✅ facebook
✅ googledrive
✅ googledocs
```

**Manjka:** ❌ ollama

---

## 🚀 DODAJ OLLAMO V OBSTOJEČI CONFIG

### **Uredi `F:\thedrinkers\the\.qwen\mcp.json`:**

Dodaj v `mcpServers`:
```json
"ollama": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "ollama-mcp-server"],
  "env": {
    "OLLAMA_HOST": "http://localhost:11434"
  }
}
```

---

## ✅ POVZETEK

```
✅ Ollama nameščena: v0.18.2
✅ MCP podpora: Preko ollama-mcp-server
✅ Config template: Pripravljen
✅ Namestitvena skripta: Pripravljena
✅ Navodila: Ustvarjena

❌ MCP še ni nameščen
⏳ Namesti z: install-ollama-mcp.ps1
```

---

## 📞 NASLEDNJI KORAKI

1. **Namesti MCP:**
   ```powershell
   powershell -ExecutionPolicy Bypass -File "F:\thedrinkers\the\install-ollama-mcp.ps1"
   ```

2. **Restartaj Claude Desktop**

3. **Testiraj:**
   ```
   @ollama generate model=llama2 prompt="Hello!"
   ```

---

**Vse pripravljeno za namestitev MCP! 🚀🤖**
