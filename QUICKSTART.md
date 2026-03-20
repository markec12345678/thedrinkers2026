# The Drinkers Website - Quick Start Guide

## 🚀 Hitri Začetek

### 1. Namestitev Node.js (če ga še nimaš)

Prenesi in namesti Node.js 18+ z: https://nodejs.org/

### 2. Namesti Odvisnosti

```bash
npm install
```

### 3. Kopiraj Environment Variables

```bash
copy .env.example .env.local
```

### 4. Zaženi Razvojno Okolje

```bash
npm run dev
```

Spletna stran bo dostopna na: http://localhost:3000

## 📁 Dodajanje Vsebin

### Slike
Postavi slike v `public/images/`:
- `band-photo.jpg` - Slika skupine
- `members/marko.jpg`, `members/miha.jpg`, itd. - Člani skupine
- `albums/last-call.jpg`, itd. - Albumi
- `merch/tshirt.jpg`, itd. - Merchandise
- `gallery/concert-1.jpg`, itd. - Galerija

### Videi
Postavi videe v `public/videos/`:
- `hero-video.mp4` - Ozadni video za hero sekcijo

### Posodobitev Podatkov

Uredi `lib/constants.ts` za:
- Imena članov skupine
- Datume koncertov
- Albume in pesmi
- Cene merchandise
- Kontaktne informacije

## 🎨 Prilagoditev

### Barve
Uredi `tailwind.config.js` za spremembo barvne sheme.

### Besedila
Večina besedil je v `lib/constants.ts` in posameznih komponentah.

## 📤 Deploy

### Vercel (Priporočeno)

```bash
npm install -g vercel
vercel login
vercel
```

### Drugi Serverji

```bash
npm run build
npm start
```

## 🆘 Težave?

### Port 3000 že uporabljen
```bash
# Uporabi drug port
port=3001 npm run dev
```

### Module Not Found
```bash
# Počisti in ponovno namesti
rm -rf node_modules package-lock.json
npm install
```

## 📞 Podpora

Za pomoč kontaktiraj:
- Email: info@thedrinkers.si

---

**Uživaj v novi spletni strani!** 🤘🎸
