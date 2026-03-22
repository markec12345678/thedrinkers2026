# 🔧 OLLAMA FIX NAVODILA

## 🚨 PROBLEM: Ollama se ne zažene (samo "Loading")

---

## ✅ REŠITEV 1: Ponovni zagon Ollama

### **Korak 1: Zapri Ollama**
```cmd
taskkill /F /IM ollama.exe
```

### **Korak 2: Počisti cache**
```cmd
# Briši temporary files
del /q %TEMP%\ollama*
```

### **Korak 3: Zaženi Ollama**
```cmd
# Najdi kje je ollama.exe
where ollama

# Če ga najdeš:
ollama serve
```

### **Korak 4: Preveri če deluje**
Odpri brskalnik: `http://localhost:11434`

---

## ✅ REŠITEV 2: Namesti Ollama znova

### **Download:**
https://ollama.com/download/OllamaSetup.exe

### **Namestitev:**
1. Zaženi `OllamaSetup.exe`
2. Follow installation wizard
3. Po namestitvi se samodejno zažene

---

## ✅ REŠITEV 3: Ustvari Shortcut

### **Lokacija Ollama:**
```
C:\Users\admin\AppData\Local\Programs\Ollama\ollama.exe
```

### **Ustvari .bat datoteko:**

1. Odpri Notepad
2. Prilepi to kodo:

```batch
@echo off
echo Starting Ollama...
start "" "C:\Users\admin\AppData\Local\Programs\Ollama\ollama.exe" serve
timeout /t 3 /nobreak
start http://localhost:11434
echo Ollama is running!
pause
```

3. Shrani kot: `F:\ollama_models\start-ollama.bat`
4. Dvakrat klikni za zagon

---

## ✅ REŠITEV 4: Preveri če je port zaseden

```cmd
# Preveri če je port 11434 zaseden
netstat -ano | findstr :11434

# Če je zaseden, ubij proces:
taskkill /F /PID <PID številka>
```

---

## ✅ REŠITEV 5: Firewall/Antivirus

1. Odpri Windows Defender Firewall
2. Allow an app through firewall
3. Dodaj `ollama.exe`
4. Dovoli za Private in Public networks

---

## 📋 TEST DELA

### **Test 1: CLI**
```cmd
ollama --version
```

### **Test 2: Server**
```cmd
ollama serve
```

### **Test 3: Model**
```cmd
ollama list
```

### **Test 4: UI**
Odpri: http://localhost:11434

---

## 🎯 HITRA DIAGNOSTIKA

### **Če vidiš "Loading" v brskalniku:**

1. **Pritisni F12** (Developer Tools)
2. **Odpri Console** tab
3. **Poglej napake**

### **Pogoste napake:**

```
ERR_CONNECTION_REFUSED
→ Ollama server ne teče
→ Rešitev: ollama serve

ERR_TIMEOUT
→ Server prepočasen
→ Rešitev: Počakaj 30 sekund

404 Not Found
→ Napačen URL
→ Rešitev: http://localhost:11434 (brez /api)
```

---

## 🚀 ALTERNATIVA: Uporabi Python Script

### **Ustvari `ollama-test.py`:**

```python
import requests
import subprocess
import time

print("Starting Ollama...")

# Start server
proc = subprocess.Popen(['ollama', 'serve'])

# Wait for server
time.sleep(5)

# Test connection
try:
    response = requests.get('http://localhost:11434/api/tags')
    if response.status_code == 200:
        print("✅ Ollama is running!")
        print("Models:", response.json())
    else:
        print("❌ Error:", response.status_code)
except Exception as e:
    print("❌ Connection failed:", e)
    print("Try: ollama serve")
```

### **Zaženi:**
```cmd
python ollama-test.py
```

---

## 📞 KONTAKT ZA PODPORO

Če nič ne deluje:

1. **GitHub Issues:** https://github.com/ollama/ollama/issues
2. **Discord:** https://discord.gg/ollama
3. **Logs:** `%APPDATA%\Ollama\logs`

---

## 🎯 NAJHITREJŠA REŠITEV

```cmd
# 1. Zapri vse Ollama procese
taskkill /F /IM ollama.exe

# 2. Počakaj 5 sekund
timeout /t 5

# 3. Zaženi znova
ollama serve

# 4. Odpri brskalnik
start http://localhost:11434
```

---

**Če še vedno ne deluje, preveri F:\ollama_models mapo za dodatna navodila!**
