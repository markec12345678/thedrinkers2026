# 🖥️ DESKTOP COMMANDER MCP - NAMESTITEV

## 📦 NAMESTITEV

### **1. Namesti Desktop Commander MCP:**

```cmd
npm install -g @wonderwhy-er/desktop-commander
```

Ali:

```cmd
pnpm add -g @wonderwhy-er/desktop-commander
```

---

## ⚙️ KONFIGURACIJA

### **Za Claude Desktop:**

**Lokacija:** `C:\Users\admin\AppData\Roaming\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "desktop-commander": {
      "command": "npx",
      "args": ["-y", "@wonderwhy-er/desktop-commander"],
      "env": {}
    }
  }
}
```

---

## 🎯 UPORABA

### **V Claude Desktop:**

#### **File Operations:**
```
@desktop-commander list_files path="F:\d\dyad"
@desktop-commander read_file path="F:\d\dyad\config.json"
@desktop-commander write_file path="F:\test.txt" content="Hello!"
```

#### **Terminal Operations:**
```
@desktop-commander execute_command command="dir F:\d"
@desktop-commander execute_command command="npm install"
```

#### **Search:**
```
@desktop-commander search_files path="F:\d" pattern="*.json"
```

---

## 🔧 ALTERNATIVE MCP SERVERJI

### **1. Filesystem MCP:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "F:\\d"]
    }
  }
}
```

### **2. Git MCP:**
```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    }
  }
}
```

---

## 📋 POPOLNA KONFIGURACIJA

### **claude_desktop_config.json:**

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
    }
  }
}
```

---

## 🚀 HITRA NAMESTITEV

```cmd
# 1. Namesti Desktop Commander MCP
npm install -g @wonderwhy-er/desktop-commander

# 2. Namesti ostale MCP-je
npm install -g @modelcontextprotocol/server-filesystem
npm install -g @modelcontextprotocol/server-git
npm install -g ollama-mcp-server

# 3. Posodobi Claude config
# (glej zgoraj za konfiguracijo)

# 4. Restartaj Claude Desktop
```

---

## ✅ TESTIRANJE

### **V Claude Desktop:**

```
@desktop-commander execute_command command="node --version"
@filesystem list path=F:\d
@git status path=F:\d\dyad
```

---

**Desktop Commander MCP je pripravljen! 🚀💻**
