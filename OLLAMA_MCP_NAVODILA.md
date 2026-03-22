# 🤖 OLLAMA MCP (Model Context Protocol) NAVODILA

## 📊 STATUS PREVERBE

### **Ollama Version:**
```
✅ Nameščeno: v0.18.2
✅ Lokacija: C:\Users\admin\AppData\Local\Programs\Ollama\ollama.exe
✅ Server: http://localhost:11434
```

---

## 🔍 ALI OLLAMA PODPIRA MCP?

### **Trenutno stanje:**
❌ **Ollama nima vgrajenega MCP serverja** (kot ga ima npr. Claude Desktop)

### **Rešitev:**
✅ **Lahko uporabiš MCP Bridge** - tretji server ki poveže Ollamo z MCP!

---

## 🚀 NAMESTITEV OLLAMA MCP

### **Opcija 1: ollama-mcp-server (Najlažje)**

#### **Namesti:**
```bash
npm install -g ollama-mcp-server
```

#### **Zaženi:**
```bash
ollama-mcp-server --ollama-host http://localhost:11434
```

#### **Dodaj v MCP config:**
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

---

### **Opcija 2: Ročni MCP Bridge**

#### **1. Ustvari `ollama-mcp.js`:**

```javascript
#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { Ollama } = require('ollama');

const ollama = new Ollama({ host: 'http://localhost:11434' });

const server = new Server({
  name: 'ollama-mcp',
  version: '1.0.0',
}, {
  capabilities: {
    tools: {},
  },
});

server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'generate',
        description: 'Generate text using Ollama',
        inputSchema: {
          type: 'object',
          properties: {
            model: { type: 'string' },
            prompt: { type: 'string' },
          },
          required: ['model', 'prompt'],
        },
      },
    ],
  };
});

server.setRequestHandler('tools/call', async (request) => {
  if (request.params.name === 'generate') {
    const { model, prompt } = request.params.arguments;
    const response = await ollama.generate({ model, prompt });
    return {
      content: [{ type: 'text', text: response.response }],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
```

#### **2. Dodaj dependencies:**
```bash
npm install @modelcontextprotocol/sdk ollama
```

#### **3. Zaženi:**
```bash
node ollama-mcp.js
```

---

### **Opcija 3: Uporabi obstoječi MCP server**

#### **Namesti `mcp-remote`:**
```bash
npm install -g mcp-remote
```

#### **Dodaj v MCP config:**
```json
{
  "mcpServers": {
    "ollama": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://localhost:11434/api/generate"
      ]
    }
  }
}
```

---

## 📝 MCP CONFIG ZA OLLAMO

### **Popolna konfiguracija:**

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
    "ollama-chat": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "ollama-chat"
      ],
      "env": {}
    }
  }
}
```

---

## 🔧 HITRA NAMESTITEV

### **Korak 1: Namesti MCP server**
```bash
npm install -g ollama-mcp-server
```

### **Korak 2: Preveri če dela**
```bash
ollama-mcp-server --help
```

### **Korak 3: Dodaj v config**
Uredi: `C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json`

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

### **Korak 4: Restartaj Claude Desktop**
1. Zapri Claude Desktop
2. Zaženi znova
3. Ollama MCP je zdaj na voljo!

---

## 🎯 TESTIRANJE

### **Test 1: Preveri MCP**
```bash
# V Claude Desktop:
@ollama generate model=llama2 prompt="Hello!"
```

### **Test 2: Preveri Ollamo**
```bash
ollama run llama2 "Hello!"
```

### **Test 3: Preveri server**
```bash
curl http://localhost:11434/api/generate -d '{"model":"llama2","prompt":"Hello"}'
```

---

## 📦 RAZPOLOŽLJIVI MODELI

### **Preveri nameščene:**
```bash
ollama list
```

### **Namesti nove:**
```bash
# Llama 2
ollama pull llama2

# Mistral
ollama pull mistral

# CodeLlama
ollama pull codellama

# Phi
ollama pull phi
```

---

## ⚠️ TEŽAVE IN REŠITVE

### **Problem: MCP server ne najde Ollame**
```bash
# Nastavi environment variable
set OLLAMA_HOST=http://localhost:11434
```

### **Problem: Port 11434 ni dosegljiv**
```bash
# Preveri če Ollama teče
ollama serve

# Ali
tasklist | findstr ollama
```

### **Problem: MCP config se ne naloži**
1. Zapri Claude Desktop
2. Odpri `claude_desktop_config.json`
3. Preveri JSON syntax
4. Shrani
5. Zaženi Claude Desktop znova

---

## 🚀 ALTERNATIVA: Uporabi API direktno

Če MCP ne dela, lahko uporabiš Ollama API direktno:

```python
import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'llama2',
    'prompt': 'Hello!'
})

print(response.json()['response'])
```

---

## 📞 PODPORA

- **Ollama Docs:** https://ollama.com/docs
- **MCP Protocol:** https://modelcontextprotocol.io
- **GitHub:** https://github.com/ollama/ollama

---

## ✅ HITRI POVZETEK

```
✅ Ollama nameščena: v0.18.2
✅ Server teče: http://localhost:11434
❌ Vgrajen MCP: Ne obstaja
✅ MCP Bridge: Na voljo preko ollama-mcp-server
✅ Namestitev: npm install -g ollama-mcp-server
✅ Config: Dodaj v claude_desktop_config.json
```

**Za namestitev MCP: `npm install -g ollama-mcp-server`** 🚀
