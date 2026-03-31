# ⚡ HITRI ZAČETEK - MCP Namestitev

## ✅ Kaj je narejeno

- ✓ Vseh **21 MCP serverjev** dodanih v `.mcp.json`
- ✓ `.env` posodobljen z novimi spremenljivkami
- ✓ `.env.example` posodobljen
- ✓ Setup checker script ustvarjen

## 🔑 Kar moraš še narediti (5 min)

### 1. Pridobi API ključe

```bash
GitHub Token (OBVEZNO):
→ https://github.com/settings/tokens
→ Scope: repo, workflow, read:user

Firecrawl API (FREE 500/month):
→ https://www.firecrawl.dev/app/api-keys

Vercel Token (OPCIJA):
→ https://vercel.com/account/tokens

Brave Search (OPCIJA - FREE 2000/month):
→ https://brave.com/search/api/
```

### 2. Prilepi v .env

Odpri `.env` in zamenjaj:

```env
GITHUB_TOKEN=ghp_tvoj-actual-token
FIRECRAWL_API_KEY=fc_tvoj-key
VERCEL_TOKEN=tvoj-vercel-token
BRAVE_SEARCH_API_KEY=tvoj-brave-key
```

### 3. Restartaj Windsurf

```
1. Zapri Windsurf
2. Odpri znova
3. MCP serverji se avtomatsko naložijo
```

### 4. Testiraj

V Windsurf Cascade vpiši:

```
"Show me the latest Next.js 15 documentation"
```

Če deluje → **Context7 MCP dela!** ✅

---

## 📊 Status

| Server       | Nameščen | API Key       | Deluje |
| ------------ | -------- | ------------- | ------ |
| Firecrawl    | ✅       | ⚠️ Potrebuješ | ❌     |
| Context7     | ✅       | ✅ Ne rabiš   | ✅     |
| GitHub       | ✅       | ⚠️ Potrebuješ | ❌     |
| Vercel       | ✅       | ⚠️ Potrebuješ | ❌     |
| Playwright   | ✅       | ✅ Ne rabiš   | ✅     |
| Brave-Search | ✅       | ⚠️ Potrebuješ | ❌     |

---

## 🎯 Preveri namestitev

```bash
npm run check-mcp
```

---

## 📖 Več informacij

- **Popolna navodila:** `MCP-INSTALLATION-GUIDE.md`
- **Windsurf docs:** https://docs.windsurf.com
