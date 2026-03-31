# MCP Orodja - Navodila za The Drinkers

## Trenutno konfigurirana orodja

Tvoj projekt že ima naslednja MCP orodja v `.mcp.json`:

### ✅ Produktivnost

- **Gmail** - Pošiljanje in branje emailov
- **Google Calendar** - Upravljanje koledarja
- **Notion** - Baza znanja, dokumentacija
- **Linear** - Task management
- **Asana** - Project management

### ✅ Social Media & Marketing

- **YouTube** - Video vsebine
- **LinkedIn** - Profesionalna omrežja
- **Instagram** (mcp-remote) - Social objave

### ✅ Glasba & Community

- **Spotify** ⭐ NOVO - Upravljanje glasbe, albumov, playlist
- **Discord** ⭐ NOVO - Fan community, obveščanje

### ✅ E-Commerce & Plačila

- **Stripe** ⭐ NOVO - Plačila, merch, VIP članstva
- **Resend** ⭐ NOVO - Email marketing, newsletter

### ✅ Ostalo

- **Airtable** - Baza podatkov
- **Sentry** - Sledenje napakam
- **Microsoft Teams** - Team komunikacija
- **Google Maps** - Lokacije, turneje

---

## Kako dodati nova MCP orodja

### 1. Dodaj v `.mcp.json`

```json
{
  "mcpServers": {
    "ime-orodja": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-ime"],
      "env": {
        "API_KEY": "${ENV_VAR}"
      }
    }
  }
}
```

### 2. Ustvari Skill dokumentacijo

V `.windsurf/skills/` ustvari datoteko `ime-orodja.md`:

```markdown
---
description: Kratki opis orodja
---

## Uporaba

- Kako se orodje uporablja
- Primeri uporabe
- API ključi ki so potrebni
```

### 3. Nastavi okoljske spremenljivke

V `.env.local` dodaj:

```
SPOTIFY_CLIENT_ID=your-id
SPOTIFY_CLIENT_SECRET=your-secret
DISCORD_BOT_TOKEN=your-token
STRIPE_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
```

---

## Predlagana dodatna orodja za The Drinkers

### 🎵 Glasba & Streaming

- **SoundCloud** - Alternativa Spotify
- **Apple Music** - Apple ecosystem
- **Bandcamp** - Neodvisna glasba

### 📱 Social Media

- **TikTok** - Short video vsebine
- **Twitter/X** - Novice, updates
- **Facebook** - Širša publika

### 🎫 Dogodki

- **Eventbrite** - Prodaja vstopnic
- **Songkick** - Turneje, koncerti
- **Bandsintown** - Koncertni koledar

### 📊 Analitika

- **Google Analytics** - Spletna analitika
- **Plausible** - Privacy-friendly analitika

---

## Uporaba MCP orodij v Cascade

Ko so orodja konfigurirana, jih uporabiš tako:

```
"Preveri zadnje Spotify statistike za The Drinkers"
"Pošlji Discord obvestilo o novi turneji"
"Ustvari Stripe produkt za novi merch"
```

## Resursi

- [MCP Servers Directory](https://github.com/modelcontextprotocol/servers)
- [Vercel MCP Remote](https://mcp-remote.vercel.app/)
- [Model Context Protocol Docs](https://modelcontextprotocol.io/)
