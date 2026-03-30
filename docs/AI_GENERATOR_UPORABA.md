# 🎨 AI GENERATOR - NAVODILA ZA UPORABO

## ✅ DELUJE TAKOJ - Brez API Ključev!

AI Generator uporablja **Pollinations FLUX** - 100% FREE, brez API ključev!

---

## 🚀 KAKO UPORABITI:

### 1. Odpri Generator

```
http://localhost:3000/admin/ai-generator
```

### 2. Izberi Style & Mood

- **Style:** Rock, Vintage, Modern, Grunge, Neon, Minimalist
- **Mood:** Party, Energetic, Chill, Rebellious, Nostalgic, Drinking

### 3. Vnesi Prompt (ali pusti prazno)

Primeri:

- `"The Drinkers album cover with beer glass"`
- `"Rock band concert poster"`
- `"Vintage rock t-shirt design"`

### 4. Klikni "Generate"

- Počakaj 5-15 sekund
- Slika se prikaže spodaj

### 5. Prenesi ali Deli

- **Prenesi** - Shrani kot PNG
- **Deli** - Share na social media

---

## 🔧 ČE SE SLIKA NE PRIKAŽE:

### Preveri Console (F12)

1. Odpri Developer Tools (F12)
2. Pojdi na "Console" tab
3. Poglej napake

### Pogoste Napake:

**"Failed to generate image"**

- Preveri internetno povezavo
- Počakaj 30 sekund in poskusi ponovno

**"Network error"**

- Pollinations API je morda preobremenjen
- Poskusi ponovno čez 1 minuto

**Slika se nalaga večno**

- Refreshaj stran (F5)
- Poskusi enostavnejši prompt

---

## 📊 KAKO DELUJE:

```
Ti vneses prompt
    ↓
Frontend poslje na /api/ai/generate
    ↓
API kliče Pollinations FLUX API
    ↓
Pollinations vrne sliko (URL)
    ↓
API vrne { success: true, imageUrl: "..." }
    ↓
Frontend prikaže sliko
```

---

## 🎯 PRIMERI PROMPTOV:

### Album Covers:

```
"Professional rock album cover for The Drinkers, crimson red and black, beer glass silhouette, minimalist design"
```

### Concert Posters:

```
"The Drinkers live in concert poster, energetic rock show, crimson stage lights, crowd, beer mugs"
```

### T-Shirt Designs:

```
"Rock band t-shirt design, The Drinkers logo, vintage style, distressed texture, black and crimson"
```

### Social Media:

```
"Instagram post for rock concert, The Drinkers band announcement, crimson red background, guitar and beer"
```

---

## ⚙️ TEHNIČNI PODATKI:

**Model:** Pollinations FLUX.1  
**Ločljivost:** 1024x1024 (1:1)  
**Cena:** 100% FREE  
**API Key:** NI POTREBEN  
**Hitrost:** 5-15 sekund

---

## 🆙 NADGRADNJA (Opcijsko):

Če želiš **višjo kvaliteto**, dodaj HuggingFace API key:

1. Dobi FREE key: https://huggingface.co/settings/tokens
2. Dodaj v `.env`:
   ```
   HUGGINGFACE_API_KEY=hf_xxx
   ```
3. V generatorju izberi model "HuggingFace FLUX"

**Prednosti:**

- Višja ločljivost
- Boljši detaili
- 10,000 free generacij/month

---

## 🐛 TROUBLESHOOTING:

### "Samo okvirji, nobene slike"

- Slika se ni generirala
- Preveri console za napake
- Poskusi ponovno

### "Napaka pri prenosu"

- Desni klik na sliko → "Save Image As"
- Ali kopiraj URL slike in odpri v novem tabu

### "Predolgo se nalaga"

- Pollinations je včasih počasen
- Počakaj do 30 sekund
- Ali osveži in poskusi ponovno

---

## 📞 PODPORA:

Če še vedno ne dela:

1. Odpri console (F12)
2. Kopiraj napako
3. Shrani screenshot
4. Pokaži developerjem

---

**🎨 Vso srečo z ustvarjanjem!**

Generator deluje TAKOJ - brez API ključev, brezplačno! ✨
