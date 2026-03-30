# 📚 The Drinkers - Dokumentacija

Dobrodošli v dokumentaciji projekta The Drinkers. Ta vodič vam bo pomagal razumeti arhitekturo, nastavitev in delovanje spletne strani.

---

## 🚀 Hitri Začetek

```bash
# Namesti odvisnosti
npm install

# Kopiraj okoljske spremenljivke
cp .env.example .env

# Preveri okoljske spremenljivke
npm run env:check

# Zaženi razvojno okolje
npm run dev
```

---

## 📖 Struktura Dokumentacije

### 🏗️ [Arhitektura](./01-arhitektura/)

- [ARCHITECTURE.md](./01-arhitektura/ARCHITECTURE.md) - Sistemska arhitektura
- Tech stack
- Komponente in struktura
- Načrtovanje sistema

### 🚀 [Deployment](./02-deployment/)

- [DEPLOYMENT.md](./02-deployment/DEPLOYMENT.md) - Navodila za deploy
- Vercel deployment
- PM2 konfiguracija
- Production checklist

### 🗄️ [Baza Podatkov](./03-baza-podatkov/)

- [DATABASE_SCHEMA.md](./03-baza-podatkov/DATABASE_SCHEMA.md) - Shema baze
- Drizzle ORM
- Migracije
- Seedanje podatkov

### 🤖 [AI Funkcije](./04-ai-funkcije/)

- [AI_FUNKCIJE.md](./04-ai-funkcije/AI_FUNKCIJE.md) - AI Setlist Generator
- Virtual Bar
- Fan Art Studio
- Image Generation

### 🔌 [API](./05-api/)

- [API_REFERENCA.md](./05-api/API_REFERENCA.md) - API reference
- Webhooki
- Integracije
- Rate limiting

### 🛒 [E-commerce](./06-ecommerce/)

- Trgovina
- Stripe integracija
- Bundle deals
- Drop system

### 📢 [Marketing](./07-marketing/)

- Email templates
- Social media
- Analytics
- SEO

### ✅ [Testiranje](./08-testiranje/)

- [TYPESCRIPT_AUDIT.md](./08-testiranje/TYPESCRIPT_AUDIT.md) - TypeScript audit
- Unit testi
- E2E testi
- Testing guidelines

### 🔒 [Varnost](./09-varnost/)

- Authentication
- Environment variables
- Security best practices
- OWASP guidelines

### 🤝 [Prispevanje](./10-prispevanje/)

- [CONTRIBUTING.md](./10-prispevanje/CONTRIBUTING.md) - Navodila za prispevanje
- Code style
- Git workflow
- Pull request guide

---

## 🔑 Ključni Dokumenti

| Dokument               | Opis                               | Lokacija                                       |
| ---------------------- | ---------------------------------- | ---------------------------------------------- |
| **ENV_SETUP.md**       | Navodila za okoljske spremenljivke | [Odpri](./ENV_SETUP.md)                        |
| **DATABASE_SCHEMA.md** | Shema baze podatkov                | [Odpri](./03-baza-podatkov/DATABASE_SCHEMA.md) |
| **DEPLOYMENT.md**      | Deployment navodila                | [Odpri](./02-deployment/DEPLOYMENT.md)         |
| **API_REFERENCE.md**   | API dokumentacija                  | [Odpri](./05-api/API_REFERENCE.md)             |
| **CONTRIBUTING.md**    | Navodila za prispevanje            | [Odpri](./10-prispevanje/CONTRIBUTING.md)      |

---

## 📊 Status Projekta

| Komponenta     | Status        | Dokumentacija                             |
| -------------- | ------------- | ----------------------------------------- |
| Website        | ✅ Production | [Odpri](./01-arhitektura/ARCHITECTURE.md) |
| Baza podatkov  | ✅ Production | [Odpri](./03-baza-podatkov/)              |
| E-commerce     | ✅ Production | [Odpri](./06-ecommerce/)                  |
| AI Funkcije    | ✅ Production | [Odpri](./04-ai-funkcije/)                |
| VIP Membership | ✅ Production | [Odpri](./06-ecommerce/VIP_MEMBERSHIP.md) |
| Analytics      | ✅ Production | [Odpri](./07-marketing/ANALYTICS.md)      |

---

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animacije

### Backend

- **Next.js API Routes** - API endpoints
- **Drizzle ORM** - Database ORM
- **Neon PostgreSQL** - Database
- **Better Auth** - Authentication

### E-commerce

- **Stripe** - Payments
- **Stripe Webhooks** - Event handling

### AI & ML

- **inference.sh** - AI model inference
- **Ollama** - Local AI
- **OpenAI** - GPT models
- **Anthropic** - Claude models

### Analytics & Monitoring

- **Google Analytics** - Web analytics
- **Vercel Analytics** - Performance
- **Sentry** - Error tracking
- **Plausible** - Privacy-friendly analytics

---

## 📞 Podpora

### Kontakti

- **Email**: info@thedrinkers.si
- **GitHub**: [thedrinkers](https://github.com/thedrinkers)
- **Discord**: [Join server](https://discord.gg/thedrinkers)

### Viri

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Better Auth Docs](https://better-auth.com)
- [Tailwind CSS Docs](https://tailwindcss.com)

---

## 📝 Posodobitve

| Datum      | Verzija | Opis                          |
| ---------- | ------- | ----------------------------- |
| 2026-03-28 | 1.0.0   | Initial documentation release |
| 2026-03-28 | 1.0.1   | Added ENV validation docs     |

---

## 🔍 Iskanje

Za iskanje po dokumentaciji uporabite GitHub search ali `grep`:

```bash
# Išči po dokumentaciji
grep -r "environment variables" docs/

# Išči specifično temo
grep -r "Stripe webhook" docs/
```

---

**Zadnja posodobitev:** 2026-03-28  
**Verzija dokumentacije:** 1.0.1  
**Vzdrževalec:** The Drinkers Team
