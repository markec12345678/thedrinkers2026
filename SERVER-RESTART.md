# 🚨 SERVER SE JE USTAVIL - PONOVNI ZAGON

**Datum**: 24. marec 2026  
**Problem**: `ERR_CONNECTION_REFUSED` na portu 3001

---

## 🔍 DIAGNOZA

```
❌ my-glow-app server:   USTAVLJEN
❌ Port 3001:            Ni dostopen
❌ API calls:            ERR_CONNECTION_REFUSED
```

**Vzrok**: Server se je ustavil zaradi CORS sprememb ali hot reload

---

## ✅ REŠITEV

### **1. Ponovno zaženi my-glow-app:**

```bash
cd F:\thedrinkers\the\my-glow-app
npm run dev
```

**Ali odpri nov terminal:**

```
1. Ctrl + Shift + ` (odpri nov terminal)
2. cd F:\thedrinkers\the\my-glow-app
3. npm run dev
4. Počakaj "Ready in Xs"
```

---

## 🧪 PREVERI

### **Ko se server zažene:**

```
✅ Videti moraš: "Ready in Xs"
✅ Videti moraš: "Local: http://localhost:3001"
✅ Ni errorjev
```

### **Testiraj signup:**

```
1. Odpri: http://localhost:3000 (The Drinkers)
2. Pojdi na signup page
3. Izpolni formo
4. Submit
5. ✅ Deluje!
```

---

## 📊 VSI SERVERJI

### **Trenutni status:**

```
✅ The Drinkers:        http://localhost:3000  (teče)
❌ my-glow-app:         http://localhost:3001  (USTAVLJEN - RESTART!)
✅ my-ai-agent:         http://localhost:3002  (teče)
✅ Prisma Studio:       http://localhost:5555  (teče)
```

---

## 🎯 HITRI ZAGON

### **Odpri 3 terminale:**

**Terminal 1 - The Drinkers:**

```bash
cd F:\thedrinkers\the
npm run dev
```

**Terminal 2 - my-glow-app:**

```bash
cd F:\thedrinkers\the\my-glow-app
npm run dev
```

**Terminal 3 - my-ai-agent:**

```bash
cd F:\thedrinkers\the\my-ai-agent
pnpm dev
```

---

## 💡 NASVET

### **Če se server spet ustavi:**

```
1. Preveri terminal za errorje
2. Ctrl + C za ustavitev
3. npm run dev za ponovni zagon
4. Počakaj "Ready in Xs"
```

### **Hot Reload:**

```
✅ Spremembe v kodi se samodejno reloadajo
✅ Včasih se server ustavi - samo restartaj
✅ To je normalno v developmentu
```

---

## ✅ CHECKLIST

- [ ] Odpri nov terminal
- [ ] cd F:\thedrinkers\the\my-glow-app
- [ ] npm run dev
- [ ] Počakaj "Ready in Xs"
- [ ] Preveri http://localhost:3001
- [ ] Testiraj signup na http://localhost:3000
- [ ] ✅ Vse deluje!

---

**Samo ponovno zaženi my-glow-app in vse bo delovalo! 🚀**

_The Drinkers čakajo! 🤘🍺_
