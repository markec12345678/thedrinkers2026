# 📂 THE DRINKERS - DATA ENTRY GUIDE

**Datum:** 2026-03-21  
**Namen:** Kako dodajati nove podatke v prihodnosti

---

## 🎯 HITRI VODIČ

### Ko dobiš nove podatke:

1. **Odpri MASTER_TEMPLATE.md**
2. **Poišči sekcijo** ki jo potrebuješ
3. **Kopiraj template**
4. **Izpolni podatke**
5. **Shrani** v pravo datoteko

---

## 🎵 1. DODAJANJE NOVEGA ALBUMA

### Koraki:

1. **Odpri:** `lib/data/albums.ts` (ustvari če ne obstaja)

2. **Dodaj:**
```typescript
{
  id: 'unique-id',
  title: 'Ime Albuma',
  year: 2026,
  tracks: 12,
  coverImage: '/images/albums/novo.jpg',
  spotifyUrl: 'https://...',
  appleMusicUrl: 'https://...',
  youtubeUrl: 'https://...',
}
```

3. **Slika albuma:**
   - Shrani v: `/public/images/albums/`
   - Poimenuj: `album-[ime].jpg`
   - Velikost: < 200 KB
   - Format: WebP ali JPG

4. **Posodobi:** `MASTER_TEMPLATE.md` section 2

---

## 🎬 2. DODAJANJE NOVEGA VIDEA

### Koraki:

1. **Odpri:** `lib/data/musicVideos.ts`

2. **Poišči YouTube ID:**
   - URL: `https://www.youtube.com/watch?v=VIDEO_ID`
   - ID je: `VIDEO_ID`

3. **Dodaj v array:**
```typescript
{
  id: '9', // naslednja številka
  title: 'Ime Videa',
  youtubeId: 'VIDEO_ID',
  thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
  duration: 'MM:SS',
  views: 'XK+',
  year: 2026,
  album: 'Ime Albuma',
  featured: false,
}
```

4. **Posodobi:** `MASTER_TEMPLATE.md` section 3

---

## 🎫 3. DODAJANJE NOVEGA KONCERTA

### Koraki:

1. **Odpri:** `lib/data/tourDates.ts` (ustvari če ne obstaja)

2. **Dodaj:**
```typescript
{
  id: 'unique-id',
  venue: 'Ime Lokacije',
  city: 'Mesto',
  country: 'Slovenija',
  date: '2026-05-15',
  time: '21:00',
  ticketUrl: 'https://...',
  ticketPrice: '25€',
  status: 'na-prodaj', // ali 'razprodano', 'kmalu'
  supportActs: ['Band 1', 'Band 2'],
  doorsOpen: '20:00',
  ageLimit: '18+',
}
```

3. **Posodobi:** `MASTER_TEMPLATE.md` section 4

---

## 📧 4. POSODOBITEV EMAIL TEMPLATOV

### Ko želiš spremeniti email:

1. **Odpri:** `EMAIL_TEMPLATES_COMPLETE.md`

2. **Poišči** email ki ga želiš spremeniti

3. **Uredi** besedilo

4. **Shrani**

5. **Kopiraj** v email provider

---

## 🖼️ 5. DODAJANJE NOVIH SLIK

### Koraki:

1. **Določi kategorijo:**
   - Hero → `/public/images/hero/`
   - Band member → `/public/images/band-members/`
   - Concert → `/public/images/gallery/concert/`
   - Event → `/public/images/events/`

2. **Poimenuj sliko:**
   - Format: `[category]-[number].[ext]`
   - Primeri:
     - `hero-3.webp`
     - `member-6.jpg`
     - `concert-3.jpg`
     - `event-3.webp`

3. **Optimiziraj:**
   - Max velikost: 200 KB
   - Format: WebP (najbolje) ali JPG
   - Dimensions: prilagodi namen

4. **Posodobi config:**
   - `lib/config/images.ts`
   - Dodaj novo sliko v array

5. **Posodobi:** `MASTER_TEMPLATE.md` section 7

---

## 📱 6. SOCIAL MEDIA POST

### Ko objavljaš:

1. **Odpri:** `SOCIAL_MEDIA_CALENDAR_30DAYS.md`

2. **Poišči** dan/platformo

3. **Kopiraj** template

4. **Izpolni** s svojimi podatki

5. **Objavi!**

---

## 📊 7. ANALYTICS UPDATE

### Tedensko preveri:

1. **Odpri:** Google Analytics
2. **Zapiši:**
   - Total users
   - Page views
   - Top pages
   - Conversion rate

3. **Shrani** v: `/analytics/YYYY-MM-DD.md`

---

## 💾 8. BACKUP

### Pred vsako večjo spremembo:

```bash
# 1. Kopiraj celoten projekt
cp -r the/ the-backup-YYYY-MM-DD/

# 2. Ali vsaj pomembne datoteke
cp -r public/images/ backup/images-YYYY-MM-DD/
cp lib/data/ backup/data-YYYY-MM-DD/
```

---

## 🔧 9. REDNO VZDRŽEVANJE

### Mesečno:

- [ ] Preveri vse linke
- [ ] Posodobi koncertne datume
- [ ] Dodaj nove slike
- [ ] Preveri analytics
- [ ] Počisti cache

### Četrtletno:

- [ ] Backup vsega
- [ ] Posodobi dependencies
- [ ] Testiraj vse funkcije
- [ ] Preveri SEO
- [ ] Optimiziraj slike

---

## 📁 10. FILE STRUCTURE REFERENCE

```
the/
├── app/                    # Strani
│   ├── page.tsx           # Homepage
│   ├── about/             # O bendu
│   ├── tour/              # Koncerti
│   ├── music/             # Glasba
│   └── ...
├── components/             # Komponente
│   └── sections/          # Sekcije strani
├── lib/
│   ├── config/            # Konfiguracije
│   │   └── images.ts      # Slike config
│   └── data/              # Podatki
│       ├── musicVideos.ts # Videi
│       └── ...
├── public/
│   └── images/            # Vse slike
│       ├── hero/
│       ├── band-members/
│       ├── gallery/
│       └── ...
└── *.md                   # Dokumentacija
```

---

## ✅ 11. CHECKLIST ZA NOVE PODATKE

### Preden shraniš:

- [ ] Preveri črkovanje
- [ ] Preveri linke
- [ ] Optimiziraj slike
- [ ] Dodaj alt text
- [ ] Testiraj na mobilnih
- [ ] Posodobi sitemap

---

## 🚀 12. HITRI UKAZI

### Terminal Commands:

```bash
# Zaženi development
npm run dev

# Buildaj za production
npm run build

# Startaj production
npm start

# Installaj package
npm install [package-name]

# Preveri status
git status

# Commitaj spremembe
git add .
git commit -m "Description"
git push
```

---

## 📞 13. KDO KAJ DELA

### Role:

**Web Developer:**
- Dodaja nove funkcije
- Popravlja bug-e
- Optimizira performance

**Content Manager:**
- Dodaja slike
- Posodablja koncerte
- Upravlja social media

**Email Manager:**
- Pošilja newsletterje
- Upravlja subscriberje
- Spremlja email metrics

**Social Media Manager:**
- Objavlja na social media
- Odgovarja na komentarje
- Kreira grafike

---

## 📝 14. TEMPLATE PRIMERI

### Primer: Dodajanje koncerta

**1. Kopiraj template:**
```typescript
{
  id: 'orto-bar-2026',
  venue: 'Orto Bar',
  city: 'Ljubljana',
  country: 'Slovenija',
  date: '2026-04-15',
  time: '21:00',
  ticketUrl: 'https://eventim.si/...',
  ticketPrice: '25€',
  status: 'na-prodaj',
  supportActs: ['Support Band'],
  doorsOpen: '20:00',
  ageLimit: '18+',
}
```

**2. Izpolni:**
```typescript
{
  id: 'orto-bar-2026',
  venue: 'Orto Bar',
  city: 'Ljubljana',
  country: 'Slovenija',
  date: '2026-04-15',  // ← Izpolnjeno
  time: '21:00',
  // ... itd
}
```

**3. Shrani** v `lib/data/tourDates.ts`

**4. Posodobi** homepage (avtomatsko se prikaže)

---

## 🎯 15. NEXT TIME KO DOBIŠ PODATKE

### Samo sledi temu:

1. **Slike?** → `/public/images/[kategorija]/`
2. **Videi?** → `lib/data/musicVideos.ts`
3. **Koncerti?** → `lib/data/tourDates.ts`
4. **Albumi?** → `lib/data/albums.ts`
5. **Email?** → `EMAIL_TEMPLATES_COMPLETE.md`
6. **Social?** → `SOCIAL_MEDIA_CALENDAR_30DAYS.md`

---

**Status:** Ready za prihodnje podatke! ✅  
**Location:** Vse na enem mestu  
**Next:** Samo izpolni in shrani! 🚀
