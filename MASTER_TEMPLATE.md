# 📋 THE DRINKERS - MASTER TEMPLATE DOKUMENTACIJA

**Datum:** 2026-03-21  
**Status:** ✅ READY TO USE - Samo izpolni podatke!

---

## 🎯 KAKO UPORABITI TA DOKUMENT

1. **Odpri ta dokument**
2. **Poišči sekcijo** ki jo potrebuješ
3. **Kopiraj template**
4. **Izpolni [PLACEHOLDERJE]** s svojimi podatki
5. **Shrani/Uporabi**

---

## 📊 1. BAND INFO TEMPLATE

### Osnovni Podatki:
```
Ime Benda: The Drinkers
Lokacija: [MESTO], Slovenija
Leto Ustanovitve: [LETO]
Žanr: [ŽANER - npr. Booze Rock, Hard Rock]
Člani: [ŠTEVILO] članov

Kontakt:
- Email: [EMAIL]
- Telefon: [TELEFON]
- Naslov: [NASLOV]

Social Media:
- Facebook: [URL]
- Instagram: [URL]
- YouTube: [URL]
- TikTok: [URL]

Website:
- URL: https://thedrinkers.si
- Admin Email: [ADMIN EMAIL]
```

---

## 🎵 2. ALBUM INFO TEMPLATE

### Album Podatki:
```
Ime Albuma: [IME]
Leto Izdaje: [LETO]
Število Pesmi: [ŠTEVILO]
Label: [LABEL ali "Self-released"]

Seznam Pesmi:
1. [NASLOV 1] - [DOLŽINA]
2. [NASLOV 2] - [DOLŽINA]
3. [NASLOV 3] - [DOLŽINA]
...

Single:
- [IME SINGLEA] - [DATUM IZDAJE]

Streaming Links:
- Spotify: [URL]
- Apple Music: [URL]
- YouTube: [URL]
- Deezer: [URL]

Cover Art:
- File: /public/images/albums/[IME].jpg
- Size: [VELIKOST] KB
- Dimensions: [ŠIRINA]x[VIŠINA] px
```

---

## 🎬 3. VIDEO INFO TEMPLATE

### Videospot Podatki:
```
Ime Videa: [IME]
YouTube ID: [ID - iz URL-ja npr. dQw4w9WgXcQ]
Datum Izdaje: [DATUM]
Album: [IME ALBUMA]
Trajanje: [MM:SS]
Views: [ŠTEVILO]K+

Thumbnail:
https://img.youtube.com/vi/[YouTube ID]/maxresdefault.jpg

Embed URL:
https://www.youtube.com/embed/[YouTube ID]

Watch URL:
https://www.youtube.com/watch?v=[YouTube ID]

Featured: [YES/NO - ali naj bo na homepage]
```

---

## 🎫 4. KONCERT INFO TEMPLATE

### Dogodek Podatki:
```
Ime Dogodka: [IME]
Datum: [YYYY-MM-DD]
Čas: [HH:MM]
Lokacija: [IME VENUE]
Naslov: [NASLOV VENUE]
Mesto: [MESTO]
Država: [SLOVENIJA]

Vstopnice:
- Cena: [CENA]€
- URL: [LINK DO VSTOPNIC]
- Status: [NA PRODAJ / RAZPRODANO / KMALU]

Support Acts:
- [IME BENDA 1]
- [IME BENDA 2]

Additional Info:
- Vrata odprejo: [ČAS]
- Starostna omejitev: [18+ / ALL AGES]
- Parkiranje: [INFO]

Social Media Event:
- Facebook: [URL]
- Instagram: [URL]
```

---

## 📧 5. EMAIL TEMPLATE PLACEHOLDERJI

### Spremenljivke:
```
[FIRST NAME] - Ime subscriberja
[VENUE NAME] - Ime lokacije koncerta
[CITY] - Mesto koncerta
[DATE] - Datum koncerta
[TIME] - Čas koncerta
[PRICE] - Cena vstopnice
[EVENT-SLUG] - URL slug dogodka
[NUMBER] - Število (npr. 1000+ fanov)
[CODE] - Popust koda (npr. LAUNCH20)
[UNSUBSCRIBE LINK] - Link za odjavo
```

### Kdaj Poslati:
```
Email 1: Day 0 (takoj po signupu)
Email 2: Day 2 (2 dni kasneje)
Email 3: Day 4 (4 dni kasneje)
Email 4: Day 7 (7 dni kasneje)
Email 5: Day 10 (10 dni kasneje)
Email 6: Day 14 (14 dni kasneje)
Email 7: Day 21 (21 dni kasneje)
```

---

## 📱 6. SOCIAL MEDIA POST TEMPLATE

### Instagram Post:
```
🎸 [GLAVNI NASLOV] 🎸

[1-2 stavka opisa]

📍 [LOKACIJA]
📅 [DATUM]
🎫 [LINK V BIO]

#TheDrinkers #SlovenianRock #BoozeRock #[HASHTAG]

---
[IMAGE/VIDEO]
- Size: 1080x1080px (square) ali 1080x1350px (portrait)
- Format: JPG ali MP4
```

### Facebook Post:
```
[GLAVNI NASLOV]

[OPIS - 2-3 stavki]

👉 [CTA - npr. "Kupi vstopnico", "Poslušaj zdaj"]
🔗 [LINK]

#TheDrinkers #Slovenia

---
[IMAGE/VIDEO]
- Size: 1200x630px
```

### Twitter/X Post:
```
[KRATKO SPOROČILO - max 280 znakov]

[LINK]

#TheDrinkers #[HASHTAG]

---
[IMAGE]
- Size: 1200x675px
```

---

## 🖼️ 7. IMAGE ORGANIZATION TEMPLATE

### Folder Struktura:
```
public/images/
├── hero/
│   ├── hero-main.webp
│   └── hero-alt.webp
├── band-members/
│   ├── member-1.jpg
│   ├── member-2.jpg
│   └── member-3.jpg
├── gallery/
│   ├── concert-1.jpg
│   ├── backstage-1.jpg
│   └── promo-1.jpg
├── events/
│   ├── event-1.webp
│   └── event-2.webp
├── albums/
│   ├── album-1.jpg
│   └── album-2.jpg
└── social-media/
    ├── instagram/
    └── facebook/
```

### Image Naming:
```
Format: [CATEGORY]-[NUMBER].[EXTENSION]

Primeri:
- hero-main.webp
- member-1.jpg
- concert-2.jpg
- event-1.webp
- album-cover-1.jpg
```

---

## 🎸 8. MUSIC VIDEO DATA TEMPLATE

### Za `lib/data/musicVideos.ts`:
```typescript
{
  id: '[UNIQUE ID]',
  title: '[NASLOV VIDEA]',
  youtubeId: '[YOUTUBE ID]',
  thumbnail: 'https://img.youtube.com/vi/[YOUTUBE ID]/maxresdefault.jpg',
  duration: '[MM:SS]',
  views: '[ŠTEVILO]K+',
  year: [LETO],
  album: '[IME ALBUMA]',
  featured: [true/false], // ali naj bo na homepage
}
```

---

## 📊 9. ANALYTICS TRACKING TEMPLATE

### UTM Parameters:
```
Base URL: https://thedrinkers.si

Email Links:
?utm_source=email&utm_medium=newsletter&utm_campaign=[CAMPAIGN_NAME]

Social Media:
?utm_source=[PLATFORM]&utm_medium=social&utm_campaign=[CAMPAIGN_NAME]

Concert Promo:
?utm_source=email&utm_medium=promo&utm_campaign=concert_[CITY]

Merch Sale:
?utm_source=email&utm_medium=promo&utm_campaign=merch_[SEASON]
```

### Events to Track:
```
✅ Newsletter Signup
✅ VIP Bar Registration
✅ Concert Ticket Click
✅ Merch Purchase
✅ Video Play
✅ AI Studio Use
✅ Gallery View
```

---

## 🚀 10. LAUNCH CHECKLIST TEMPLATE

### Pred Launchom:
```
[ ] Vse slike naložene
[ ] Vsi videi dodani
[ ] Email templati pripravljeni
[ ] Social media grafike narejene
[ ] Testiranje na mobilnih
[ ] Testiranje na desktop
[ ] SEO meta tags nastavljeni
[ ] Analytics nastavljen
[ ] Formi delujeta
[ ] Vsi linki delujejo
```

### Na Launch Day:
```
[ ] Objavi na vseh social media
[ ] Pošlji Email 1 (Launch)
[ ] Spremljaj analytics
[ ] Odgovarjaj na komentarje
[ ] Shareaj fan objave
```

### Po Launchu (Day 2-21):
```
[ ] Pošlji Email 2-7 po urniku
[ ] Spremljaj open/click rates
[ ] A/B testaj subject lines
[ ] Optimiziraj send time
[ ] Zberi feedback
```

---

## 📝 11. CONTENT CALENDAR TEMPLATE

### Tedenski Načrt:
```
TEDEN [ŠTEVILO TEDNA] - [DATUM]

PONEDELJEK:
- [TASK 1]
- [TASK 2]

TOREK:
- [TASK 1]
- [TASK 2]

SREDA:
- [TASK 1]
- [TASK 2]

ČETRTEK:
- [TASK 1]
- [TASK 2]

PETEK:
- [TASK 1]
- [TASK 2]

SOBOTA/NEDDELJA:
- [OPTIONAL TASKS]
```

### Monthly Goals:
```
MESEC: [IME MESECA] 2026

Cilji:
1. [GOAL 1]
2. [GOAL 2]
3. [GOAL 3]

Key Metrics:
- Newsletter Subscribers: [CURRENT] → [TARGET]
- Social Followers: [CURRENT] → [TARGET]
- Concert Tickets Sold: [CURRENT] → [TARGET]
- Merch Revenue: [CURRENT] → [TARGET]
```

---

## 💾 12. BACKUP TEMPLATE

### Kaj Backupirati:
```
✅ /public/images/ - Vse slike
✅ /lib/data/ - Vsi podatki (videi, albumi)
✅ /app/ - Vse strani
✅ /components/ - Vse komponente
✅ Email templati
✅ Social media grafike
✅ Analytics data
✅ Subscriber lista
```

### Kdaj Backupirati:
```
📅 Pred vsakim večjim updateom
📅 Po vsakem launchu nove funkcije
📅 Enkrat mesečno (routine)
📅 Pred deployem na production
```

### Kam Backupirati:
```
💾 Google Drive
💾 Dropbox
💾 External HDD
💾 GitHub (code only)
💾 Cloud storage
```

---

## 🔐 13. ACCESS INFO TEMPLATE

### Admin Dostopi:
```
Website Admin:
- URL: https://thedrinkers.si/admin
- Username: [USERNAME]
- Password: [PASSWORD - use password manager!]

Email Provider:
- Platform: [PROVIDER NAME]
- URL: [URL]
- Login: [EMAIL]
- Password: [PASSWORD]

Social Media:
- Facebook: [LOGIN INFO]
- Instagram: [LOGIN INFO]
- YouTube: [LOGIN INFO]
- TikTok: [LOGIN INFO]

Analytics:
- Google Analytics: [LOGIN INFO]
- Search Console: [LOGIN INFO]
```

---

## 📞 14. CONTACT LIST TEMPLATE

### Team Contacts:
```
Band Manager:
- Ime: [IME]
- Email: [EMAIL]
- Telefon: [TELEFON]

Web Developer:
- Ime: [IME]
- Email: [EMAIL]
- Telefon: [TELEFON]

Social Media Manager:
- Ime: [IME]
- Email: [EMAIL]
- Telefon: [TELEFON]

Booking Agent:
- Ime: [IME]
- Email: [EMAIL]
- Telefon: [TELEFON]
```

### Venue Contacts:
```
[VENUE NAME]:
- Kontakt: [IME]
- Email: [EMAIL]
- Telefon: [TELEFON]
- Kapaciteta: [ŠTEVILO]
- Teh Rider: [LINK ALI INFO]
```

---

## ✅ 15. QUICK START GUIDE

### Za Novega Člana Team-a:
```
1. PREBERI:
   ✅ Ta dokument
   ✅ BRAND_GUIDELINES.md
   ✅ CONTENT_STRATEGY.md

2. DOBI DOSTOP DO:
   ✅ Website admin
   ✅ Email provider
   ✅ Social media
   ✅ Analytics

3. NAJDI:
   ✅ Contact list
   ✅ Content calendar
   ✅ Asset library

4. TESTIRAJ:
   ✅ Website funkcije
   ✅ Email sequence
   ✅ Social posts

5. ZAČNI:
   ✅ Follow content calendar
   ✅ Respond to fans
   ✅ Track metrics
```

---

## 🎯 NEXT STEPS

### Ko dobiš nove podatke:

1. **Odpri ta dokument**
2. **Poišči relevantni template**
3. **Kopiraj template**
4. **Zamenjaj [PLACEHOLDERJE]** s pravimi podatki
5. **Shrani** v ustrezno datoteko
6. **Testiraj** da vse deluje
7. **Launchaj!**

---

## 📁 FILE LOCATIONS

### Kje so stvari shranjene:

```
📄 Master Template: 
   /MASTER_TEMPLATE.md (ta dokument)

📄 Email Templates:
   /EMAIL_TEMPLATES_COMPLETE.md

📄 Image Config:
   /lib/config/images.ts

📄 Video Data:
   /lib/data/musicVideos.ts

📄 Documentation:
   /FINAL_REPORT_ALL_COMPLETE.md

📄 Social Media:
   /SOCIAL_MEDIA_CALENDAR_30DAYS.md

📄 Images:
   /public/images/

📄 Components:
   /components/sections/
```

---

**Status:** Vse pripravljeno! ✅  
**Next:** Samo izpolni podatke in uporabi! 🚀

**Zadnja posodobitev:** 2026-03-21
