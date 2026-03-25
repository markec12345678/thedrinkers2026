# 🛠️ Nameščena Orodja - The Drinkers Website

**Datum namestitve**: 24. marec 2026  
**Status**: ✅ Vsa orodja so nameščena in delujejo

## ✅ Nameščeno

### 1. **Better Auth** (Av tentikacija)

- **Status**: ✅ Implementirano
- **Verzija**: v1.5.5
- **Lokacija**: `lib/auth.ts`, `lib/auth-client.ts`, `lib/db/schema.ts`
- **API Route**: `app/api/auth/[...all]/route.ts`

**Funkcionalnosti**:

- Email/password prijava
- Social login (Google, GitHub)
- Session management
- Custom user fields (membershipTier, displayName)

**Uporaba**:

```typescript
import { signIn, signUp, signOut, useSession } from "@/lib/auth-client";

// Prijava
await signIn.email({ email, password });

// Odjava
await signOut();

// Session
const { data: session } = await getSession();
```

---

### 2. **Playwright** (E2E Testing)

- **Status**: ✅ Nameščen
- **Verzija**: v1.58.2
- **Konfiguracija**: `playwright.config.ts`
- **Testi**: `tests/e2e/`

**Skripti**:

```bash
npm run test:e2e          # Zaženi vse teste
npm run test:e2e:ui       # UI mode
npm run test:e2e:headed   # Z browserjem
```

**Testne datoteke**:

- `tests/e2e/homepage.spec.ts` - Homepage testi
- `tests/e2e/auth.spec.ts` - Authentication testi
- `tests/e2e/responsive.spec.ts` - Responsive testi

---

### 3. **Vitest** (Unit Testing)

- **Status**: ✅ Nameščen
- **Verzija**: v4.1.1
- **Konfiguracija**: `vitest.config.ts`
- **Testi**: `tests/unit/`

**Skripti**:

```bash
npm run test          # Watch mode
npm run test:run      # Enkratni run
npm run test:ui       # UI mode
npm run test:coverage # Coverage report
```

**Testne datoteke**:

- `tests/unit/utils.test.ts` - Utility testi
- `tests/unit/auth.test.ts` - Auth testi

---

### 4. **Drizzle ORM** (Database ORM)

- **Status**: ✅ Nameščen
- **Verzija**: v0.31.10 (drizzle-kit)
- **Konfiguracija**: `drizzle.config.ts`
- **Schema**: `lib/db/schema.ts`

**Skripti**:

```bash
npm run db:generate  # Generiraj migracije
npm run db:migrate   # Izvedi migracije
npm run db:push      # Push schema (dev)
npm run db:studio    # DB Studio UI
npm run db:check     # Preveri spremembe
```

**Database Schema**:

- `user` - Uporabniki (Better Auth)
- `session` - Seje
- `account` - OAuth accounti
- `verification` - Verifikacije

---

## 📋 Konfiguracijske Datoteke

| Datoteka               | Opis                      |
| ---------------------- | ------------------------- |
| `playwright.config.ts` | Playwright konfiguracija  |
| `vitest.config.ts`     | Vitest konfiguracija      |
| `drizzle.config.ts`    | Drizzle ORM konfiguracija |
| `lib/auth.ts`          | Better Auth server config |
| `lib/auth-client.ts`   | Better Auth client        |
| `lib/db/schema.ts`     | Database schema           |
| `lib/auth-utils.ts`    | Auth helperji             |
| `tests/setup.ts`       | Vitest setup              |

---

## 🔑 Environment Variables

Dodaj v `.env.local`:

```bash
# Database (Neon PostgreSQL)
DATABASE_URL=postgres://user:password@ep-xxx.us-east-2.aws.neon.tech/thedrinkers?sslmode=require

# OAuth (opcijsko)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Site Config
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="The Drinkers"
```

---

## 🚀 Hitri Začetek

### 1. Namesti vse pakete

```bash
npm install
```

### 2. Nastavi environment variables

```bash
cp .env.example .env.local
# Uredi .env.local in dodaj DATABASE_URL
```

### 3. Izvedi database migracije

```bash
npm run db:push
```

### 4. Zaženi teste

```bash
npm run test:run        # Unit testi
npm run test:e2e        # E2E testi
```

### 5. Zaženi dev server

```bash
npm run dev
```

---

## 📊 Povzetek Namestitev

| Orodje          | Package              | Verzija | Status |
| --------------- | -------------------- | ------- | ------ |
| Better Auth     | `better-auth`        | 1.5.5   | ✅     |
| Playwright      | `playwright`         | 1.58.2  | ✅     |
| Vitest          | `vitest`             | 4.1.1   | ✅     |
| Drizzle ORM     | `drizzle-orm`        | ✅      |
| Drizzle Kit     | `drizzle-kit`        | 0.31.10 | ✅     |
| Testing Library | `@testing-library/*` | ✅      |

**Skupaj paketov**: 594  
**TypeScript Check**: ✅ Pass  
**Vsi dependencyji**: ✅ Nameščeni

---

## 🧪 Testiranje

### Unit Testi

```bash
# Watch mode (development)
npm run test

# Single run (CI/CD)
npm run test:run

# Z coverage reportom
npm run test:coverage
```

### E2E Testi

```bash
# Headless (CI/CD)
npm run test:e2e

# Z browserjem (debugging)
npm run test:e2e:headed

# UI mode (interactive)
npm run test:e2e:ui
```

---

## 🗄️ Database Commands

```bash
# Generiraj nove migracije
npm run db:generate

# Pushaj schema v development
npm run db:push

# Izvedi migracije
npm run db:migrate

# Odpri DB Studio
npm run db:studio

# Preveri stanje
npm run db:check
```

---

## 📚 Dokumentacija

- [Better Auth Docs](https://www.better-auth.com)
- [Playwright Docs](https://playwright.dev)
- [Vitest Docs](https://vitest.dev)
- [Drizzle Docs](https://orm.drizzle.team)
- [Testing Library Docs](https://testing-library.com)

---

## 🔧 Troubleshooting

### Težave z database migracijami?

```bash
# Preveri DATABASE_URL
echo $DATABASE_URL

# Poskusi ponovno
npm run db:push --force
```

### Testi ne delujejo?

```bash
# Počisti cache
npm run test -- --clearCache

# Namesti dependencies ponovno
rm -rf node_modules && npm install
```

### TypeScript napake?

```bash
# Zaženi typecheck
npm run typecheck
```

---

## ✅ Verifikacija

Vse namestitve so bile uspešno verificirane:

```bash
✅ npm run typecheck - PASS
✅ npm list playwright - INSTALLED
✅ npm list vitest - INSTALLED
✅ npm list drizzle-kit - INSTALLED
✅ npm list better-auth - INSTALLED
```
