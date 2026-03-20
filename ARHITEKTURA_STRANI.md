# Arhitektura Spletne Strani - The Drinkers

## 📋 Povzetek

To je uradna spletna stran slovenske rock skupine **The Drinkers**, zgrajena z uporabo sodobnega React/Next.js stacka. Stran je optimizirana za hitrost, SEO in odzivnost na vseh napravah.

---

## 🏗️ Tehnološki Stack

### **Core Framework**
- **Next.js 15.0.0** - React framework za server-side rendering in statično generiranje
- **React 19.0.0** - Najnovejša verzija Reacta (release candidate)
- **TypeScript 5.3.3** - Statično tipiziranje za boljšo kodo in manj napak

### **Styling & UI**
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Framer Motion 11.15.0** - Animacije in micro-interactions
- **Lucide React 0.468.0** - Ikone
- **Next Themes 0.4.4** - Dark/light mode upravljanje

### **State Management & Forms**
- **React Hook Form 7.49.0** - Upravljanje form
- **Zod 3.22.0** - Validacija shem

### **Multimedia**
- **React Leaflet 4.2.0** - Interaktivni zemljevidi za turneje
- **Leaflet 1.9.0** - Open-source JavaScript knjižnica za zemljevide

### **Analytics**
- **Vercel Analytics 1.2.0** - Sledenje uporabniške izkušnje

---

## 📁 Struktura Projekta

```
f:\thedrinkers\the\
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout z metadata
│   ├── page.tsx                  # Domača stran
│   ├── globals.css               # Globalni CSS stili
│   ├── about/page.tsx            # O skupini
│   ├── bar/page.tsx              # VIP Bar (zaščiten)
│   ├── contact/page.tsx          # Kontakt
│   ├── gallery/page.tsx          # Galerija
│   ├── merch/page.tsx            # Trgovina
│   ├── music/page.tsx            # Glasba
│   ├── tour/page.tsx             # Koncerti
│   ├── privacy/page.tsx          # Politika zasebnosti
│   ├── terms/page.tsx            # Pogoji uporabe
│   └── api/                      # API endpointi
│       ├── newsletter/route.ts   # Newsletter signup
│       └── tickets/route.ts      # Vstopnice
│
├── components/                   # React komponente
│   ├── layout/                   # Layout komponente
│   │   ├── Header.tsx            # Navigacijska vrstica
│   │   ├── Footer.tsx            # Noga strani
│   │   └── MobileNav.tsx         # Mobilni meni
│   ├── sections/                 # Sekcije na straneh
│   │   ├── Hero.tsx              # Hero section
│   │   ├── MusicGrid.tsx         # Glasba grid
│   │   ├── TourCalendar.tsx      # Koledar koncertov
│   │   ├── AboutSection.tsx      # O skupini
│   │   ├── GalleryGrid.tsx       # Galerija
│   │   ├── MerchCarousel.tsx     # Merchandise carousel
│   │   ├── ContactSection.tsx    # Kontakt forma
│   │   └── NewsletterSection.tsx # Newsletter prijava
│   ├── features/                 # Funkcionalne komponente
│   │   ├── FanArtUpload.tsx      # Upload fan arta
│   │   ├── LyricsModal.tsx       # Modal za besedila
│   │   └── SloveniaMap.tsx       # Zemljevid Slovenije
│   ├── ui/                       # UI komponente
│   │   ├── Button.tsx            # Gumbi
│   │   ├── Section.tsx           # Section wrapper
│   │   ├── SpotifyEmbed.tsx      # Spotify embed
│   │   └── VideoPlayer.tsx       # Video predvajalnik
│   └── seo/                      # SEO komponente
│
├── lib/                          # Utility funkcije in konstante
│   ├── constants.ts              # Vsi podatki (turneje, albumi, člani)
│   ├── types.ts                  # TypeScript tipi
│   ├── utils.ts                  # Helper funkcije
│   └── seo.tsx                   # SEO helperji
│
├── config/                       # Konfiguracije
│   ├── site.config.ts            # Konfiguracija strani
│   └── types.ts                  # Konfig tipi
│
├── public/                       # Statične datoteke
│   ├── images/                   # Slike
│   │   ├── albums/               # Naslovnice albumov
│   │   ├── members/              # Slike članov
│   │   ├── merch/                # Merchandise slike
│   │   ├── gallery/              # Galerija
│   │   └── videos/               # Video thumbnaili
│   ├── videos/                   # Video datoteke
│   ├── favicon.ico               # Favicon
│   ├── manifest.json             # PWA manifest
│   └── robots.txt                # Robots.txt
│
├── styles/                       # CSS stili
│   ├── globals.css               # Globalni stili
│   └── animations.css            # Custom animacije
│
├── .env.local                    # Okoljske spremenljivke
├── next.config.js                # Next.js konfiguracija
├── tailwind.config.ts            # Tailwind konfiguracija
├── tsconfig.json                 # TypeScript konfiguracija
├── package.json                  # NPM dependencies
└── ecosystem.config.js           # PM2 konfiguracija
```

---

## 🎨 Design Sistem

### **Barvna Paleta**

```typescript
colors: {
  'rock-black': '#0a0a0a',        // Primarna črna
  'rock-dark': '#1a1a1a',         // Temna siva
  'rock-gray': '#2a2a2a',         // Siva
  'crimson': '#dc143c',           // Primarna rdeča (brand)
  'crimson-light': '#ff3333',     // Svetla rdeča
  'crimson-dark': '#b91030',      // Temna rdeča
  'silver': '#c0c0c0',            // Srebrna
  'text-gray': '#cccccc',         // Siva za tekst
}
```

### **Tipografija**

- **Inter** - Glavna pisava za body tekst (Google Fonts)
- **Custom Rock Font** - Display pisava za naslove (var(--font-rock))
- **Montserrat** - Alternativna pisava

### **Animacije**

```typescript
animation: {
  'glow': 'Svetleč efekt za tekst (2s infinite)',
  'pulse-slow': 'Počasen pulse efekt (3s)',
  'float': 'Lebdeč efekt (6s)',
}
```

---

## 🔧 Ključne Funkcionalnosti

### **1. Domača Stran (`app/page.tsx`)**

Sestavljena iz 8 sekcij:
- **Hero** - Uvodni section z video ozadjem
- **MusicGrid** - Pregled albumov
- **TourCalendar** - Koledar prihajajočih koncertov
- **AboutSection** - Kratek opis skupine
- **GalleryGrid** - Galerija slik
- **MerchCarousel** - Trgovina z merchandiseom
- **ContactSection** - Kontakt forma
- **NewsletterSection** - Newsletter prijava

### **2. Navigacija (`components/layout/Header.tsx`)**

- Fiksna navigacijska vrstica
- Scroll-detected backdrop blur efekt
- Responsive mobilni meni z animacijami
- 6 glavnih povezav: Domov, Koncerti, Glasba, Trgovina, O nas, Bar

### **3. Turneje (`app/tour/page.tsx`)**

- Koledar vseh koncertov
- Interaktivni zemljevid Slovenije z lokacijami
- Povezave do vstopnic (Eventim, Ticketone, Oeticket)
- Označbe razprodanih koncertov (soldOut)

### **4. Glasba (`app/music/page.tsx`)**

- Vsi albumi z letnicami
- Spotify embedi
- Seznam pesmi z trajanji
- YouTube videi

### **5. Trgovina (`app/merch/page.tsx`)**

- Product carousel
- Varianti (velikosti, barve)
- Cene v EUR
- Oznake "limited edition"

---

## 📊 Podatkovni Modeli

### **Tipi (`lib/types.ts`)**

```typescript
- TourDate       // Podatki o koncertu
- Album          // Album z pesmimi
- Member         // Član skupine
- MerchItem      // Izdelek v trgovini
- Video          // YouTube video
- GalleryImage   // Slika v galeriji
```

### **Konstante (`lib/constants.ts`)**

Vsa vsebina je shranjena v TypeScript konstantah:
- `SITE_CONFIG` - Osnovni podatki o strani
- `TOUR_DATES_MOCK` - 6 koncertov (SI, HR, IT, AT)
- `albums` - 7 albumov (1995-2014)
- `bandMembers` - 5 članov skupine
- `merchItems` - 5 produktov
- `videos` - 5 videov
- `galleryImages` - 8 slik

---

## 🔐 Zaščitene Strani

### **VIP Bar (`app/bar/page.tsx`)**

- Zaščitena stran z geslom
- Dostopna samo za prave fane
- Ekskluzivna vsebina

---

## 🚀 Deploy & Production

### **Lokalni Razvoj**

```bash
npm run dev          # Next.js dev server (--turbo mode)
npm run build        # Production build
npm run start        # Local production server
```

### **Production Deploy (PM2)**

```bash
npm run start:pm2    # Start s PM2 cluster mode
npm run stop:pm2     # Stop serverja
npm run restart:pm2  # Restart
npm run logs:pm2     # Prikaz logov
npm run monit        # PM2 monitoring UI
```

### **PM2 Konfiguracija (`ecosystem.config.js`)**

- **Cluster mode** - Maksimalno izkoriščanje CPU-jev
- **Auto-restart** - Ob padcu se samodejno restarta
- **Max memory** - 1GB limit na instanco
- **Log files** - Ločeni error, output in combined logi

---

## 🌐 SEO & Metadata

### **Metadata (`app/layout.tsx`)**

```typescript
- title: "The Drinkers"
- description: "Slovenian booze rock band. Est. 1993 in Litija."
- keywords: rock band, music, Slovenia, metal, concerts
- openGraph: Slike, naslovi, opisi za socialna omrežja
- Twitter: Summary large image cards
- robots: index: true, follow: true
- icons: favicon, apple-touch-icon
- manifest: PWA support
```

### **Struktura Podatkov**

- **JSON-LD** schema.org markup za:
  - MusicGroup
  - Event (koncerti)
  - Product (merchandise)
  - Person (člani)

---

## 🔌 API Endpointi z Edge Runtime

### **Newsletter (`app/api/newsletter/route.ts`)**

```typescript
export const runtime = 'edge'        // Edge Function
export const dynamic = 'force-dynamic' // No caching
export const revalidate = 0

- POST endpoint za zbiranje emailov
- Validacija z Zod
- Edge runtime za globalno distribucijo
- Response time: <50ms iz edge lokacij
- No caching za real-time signup
```

### **Vstopnice (`app/api/tickets/route.ts`)**

```typescript
export const runtime = 'edge'        // Edge Function
export const dynamic = 'force-dynamic'
export const revalidate = 30         // 30s revalidacija

- GET: Preveri razpoložljivost (cache 30s)
- POST: Rezervacija vstopnic (no cache)
- Cache-Control: s-maxage=30, stale-while-revalidate=300
- Integracija z Eventim/Ticketmaster
```

### **Cache Strategija**

| Endpoint | Cache | Revalidacija | Stale-while-revalidate |
|----------|-------|--------------|------------------------|
| Newsletter POST | ❌ None | 0s | - |
| Tickets GET | ✅ CDN | 30s | 300s (5min) |
| Static Pages | ✅ ISR | 3600s | 7200s |
| Dynamic Pages | ✅ ISR | 30s | 60s |

### **Prednosti Edge Runtime**

| Metrika | Node.js | Edge |
|---------|---------|------|
| Cold start | ~500ms | ~10ms |
| Lokacija | Single region | Global |
| Scaling | Manual | Auto |
| Cost | Higher | Lower |

---

## 🎯 Posebnosti

### **1. Server-Side Rendering (SSR)**

Next.js omogoča:
- Hitrejše nalaganje strani
- Boljši SEO
- Manjši JavaScript bundle

### **2. Error Boundary z Rock-Themed UI**

```typescript
// app/error.tsx - Global error handler
// app/not-found.tsx - 404 page
// components/ui/ErrorBoundary.tsx - Reusable component
```

**Features:**
- 🎨 Custom rock-themed error dizajn
- 🔧 Retry functionality
- 📍 Quick links do vsebine
- 🐛 Development mode z error details
- ✨ Framer Motion animacije

### **3. Image Optimization**

```typescript
images: {
  remotePatterns: [
    'i.scdn.co',        // Spotify
    'img.youtube.com',  // YouTube
    'cdn.thedrinkers.si' // CDN
  ],
  formats: ['avif', 'webp']  // Moderni formati
}
```

### **3. Security Headers**

```typescript
headers: [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' }
]
```

### **4. Wuunu Integration**

- Debugging orodje za development
- Samo v development načinu
- Ne spreminjaj kode!

---

## 📦 Environment Variables (`.env.local`)

```bash
# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000

# API Keys
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
YOUTUBE_API_KEY=...

# Email
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
```

---

## 🧪 Testing & Quality

```bash
npm run lint        # ESLint check
npm run typecheck   # TypeScript type checking
```

---

## 📈 Performance Optimizations

1. **Dynamic Imports** - Lazy loading komponent (npr. SloveniaMap)
2. **Image Optimization** - Next.js Image komponenta
3. **Font Optimization** - Google Fonts z `display: swap`
4. **Code Splitting** - Avtomatsko z Next.js
5. **Cluster Mode** - PM2 z več instancami

---

## 🔧 Maintenance

### **Dodajanje Novega Koncerta**

1. Odpri `lib/constants.ts`
2. Dodaj nov objekt v `TOUR_DATES_MOCK` array
3. Commit & push

### **Dodajanje Albuma**

1. Dodaj sliko v `public/images/albums/`
2. Dodaj entry v `albums` array v `lib/constants.ts`
3. Build & deploy

### **Sprememba Cene Merch-a**

1. Najdi izdelek v `merchItems` array
2. Spremeni `price` value
3. Push na GitHub

---

## 🌍 Deployment Options

### **1. Vercel (Primary)**

```bash
# Poveži GitHub repository
# Avtomatski deploy ob pushu na main
```

### **2. Self-Hosted (PM2)**

```bash
# Build locally
npm run build

# Copy .next folder to server
# Run with PM2
npm run start:pm2
```

---

## 📝 Prihodnje Izboljšave

### ✅ Implementirano 2026
- [x] Edge Functions za API endpointe
- [x] Edge runtime za newsletter in tickets
- [x] Globalna distribucija API-jev

### 🔄 V Načrtu
- [ ] User authentication za VIP Bar z NextAuth
- [ ] Real-time ticket availability z WebSockets
- [ ] Merchandise checkout s Stripe
- [ ] Blog/News section z MDX
- [ ] Video gallery z lastnim playerjem
- [ ] Fan forum
- [ ] Setlist database
- [ ] Spotify monthly listeners widget
- [ ] Image CDN z Cloudflare Images
- [ ] Analytics z Vercel Web Analytics
- [ ] A/B testing z Vercel Edge Config

---

## 🤝 Contributing

Glej `CONTRIBUTING.md` za navodila kako prispevati k projektu.

---

## 📄 License

© 2026 The Drinkers. Vse pravice pridržane.

---

**Zadnja posodobitev:** Marec 2026  
**Verzija:** 1.0.0  
**Avtor:** The Drinkers Development Team
