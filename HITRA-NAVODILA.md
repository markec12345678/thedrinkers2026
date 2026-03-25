# 🚀 HITRA NAVODILA - AVTOMATIZACIJA

**Datum**: 24. marec 2026  
**Projekt**: The Drinkers - Glow & Explore

---

## ✅ Nameščeno in Preverjeno

| Orodje                  | Status       | Testirano          |
| ----------------------- | ------------ | ------------------ |
| **device-shots**        | ✅ Nameščen  | ✅ Deluje          |
| **webpage-grabber**     | ✅ Nameščen  | ✅ Deluje          |
| **auto-tools.bat**      | ✅ Ustvarjen | ✅ Deluje          |
| **grab-inspiration.py** | ✅ Ustvarjen | ✅ Testirano (5/5) |

---

## 🎯 Kako Uporabljati (3 Načini)

### **NAČIN 1: Glavni Menu (Najlažje)**

```bash
# Dvakrat klikni ali zaženi:
auto-tools.bat
```

**Menu bo ponudil:**

```
[1] Generate Device Screenshots
[2] Grab Inspiration Websites
[3] Analyze Downloaded Code
[4] Open Screenshot Folder
[5] Open Grabbed Sites Folder
[6] Exit
```

---

### **NAČIN 2: Posamezne Skripte**

#### **Za Screenshotove:**

```bash
# Opcija A: Dvakrat klikni
generate-screenshots.bat

# Opcija B: Command line
cd device-shots
node index.js http://localhost:3000 "iPhone 12, iPhone 13, iPad Pro" fullscreen force-yes
```

#### **Za Grabbanje Strani:**

```bash
# Opcija A: Python skripta
cd webpage-grabber
python grab-inspiration.py

# Opcija B: Interaktivno
cd webpage-grabber
python web.py
```

---

### **NAČIN 3: NPM Skripti**

Dodaj v `package.json`:

```json
{
  "scripts": {
    "shots": "cd device-shots && node index.js http://localhost:3000 \"iPhone 12, iPhone 13, iPad Pro\" fullscreen force-yes",
    "grab": "cd webpage-grabber && python grab-inspiration.py"
  }
}
```

Potem:

```bash
npm run shots    # Screenshoti
npm run grab     # Grabanje strani
```

---

## 📊 Rezultati Testa

### **Webpage Grabber Test (Pravkar Opravljen)**

```
✅ linear_design_system/        - 2.2 MB HTML + 13 KB CSS
✅ stripe_payment_ui/           - 618 KB HTML
✅ vercel_hosting_landing/      - 955 KB HTML + 231 KB CSS
✅ framer_interactions/         - 2.9 MB HTML
✅ apple_product_showcase/      - 234 KB HTML
```

**Skupaj**: 5/5 uspešno ✅

---

## 📁 Kje So Datoteke?

### **Screenshoti:**

```
F:\thedrinkers\the\device-shots\generated-screenshots\
```

### **Grabane Strani:**

```
F:\thedrinkers\the\webpage-grabber\
├── linear_design_system/
├── stripe_payment_ui/
├── vercel_hosting_landing/
├── framer_interactions/
└── apple_product_showcase/
```

---

## 💡 Naslednji Koraki

### **1. Analiziraj Kodo**

```bash
# Odpri grabane strani
explorer F:\thedrinkers\the\webpage-grabber

# Poglej HTML in CSS
# - linear_design_system/index.html
# - vercel_hosting_landing/style.css
```

### **2. Najdi Inspiracijo**

- **Linear**: Gradienti, animacije, tipografija
- **Vercel**: Layout, hero section, CTA gumbi
- **Apple**: Produkt prezentacija, whitespace

### **3. Implementiraj**

```css
/* Primer: Kopiraj Linear gradient */
.cta-button {
  background: linear-gradient(135deg, #5e6ad2 0%, #f36f58 100%);
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-weight: 600;
}
```

---

## 🎯 Pogosti Scenariji

### **Scenario 1: Pred Launchom**

```bash
# 1. Generiraj screenshotove
auto-tools.bat → Option 1

# 2. Uporabi za social media
# - Instagram: iPhone screenshot
# - LinkedIn: Desktop screenshot
```

### **Scenario 2: Dizajn Blokada**

```bash
# 1. Grabaj inspiracijo
auto-tools.bat → Option 2

# 2. Analiziraj kodo
# - Poglej kako so drugi rešili podobne probleme
```

### **Scenario 3: Konkurenčna Analiza**

```bash
# 1. Dodaj konkurente v grab-inspiration.py
# 2. Zaženi grabanje
python grab-inspiration.py

# 3. Primerjaj funkcije
```

---

## ⚠️ Težave in Rešitve

### **Težava: Node.js ni najden**

```bash
# Namesti Node.js
# https://nodejs.org/

# Ali uporabi:
add-nodejs-to-path.bat
```

### **Težava: Python ni nameščen**

```bash
# Preveri:
python --version

# Če ni nameščen:
# https://www.python.org/downloads/
```

### **Težava: Screenshoti so prazni**

```bash
# 1. Preveri če server teče
npm run dev

# 2. Uporabi pravi URL
node index.js http://localhost:3000 "iPhone 12"
```

### **Težava: CSS ni downloadan**

```bash
# Nekatere strani nimajo style.css v rootu
# To je normalno - HTML vsebuje CSS inline ali v <style> tagih
```

---

## 📚 Dokumentacija

- `TOOLS-AUTOMATION.md` - Popolna dokumentacija
- `device-shots/UPORABA.md` - Device shots navodila
- `webpage-grabber/UPORABA.md` - Webpage grabber navodila

---

## 🎉 Uspeh!

Vsa orodja so nameščena, konfigurirana in testirana!

**Čas za uporabo**: < 1 minuta  
**Testirano**: ✅ Vse deluje  
**Pripravljeno**: ✅ Za takojšnjo uporabo

---

**Ustvaril: AI Assistant**  
**Za: The Drinkers Team**  
**Datum: 24. marec 2026**

_Glow & Explore! 🌟_
