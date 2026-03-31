# 🎯 MCP SERVERJI - POPOLNA PRIMERJAVA

## 📊 Pregled

| Kategorija                | Število MCP | Namen                                      |
| ------------------------- | ----------- | ------------------------------------------ |
| **Business/Productivity** | 15          | Komunikacija, project management, vsebine  |
| **Web Development**       | 6           | Development, testing, deployment, research |
| **SKUPAJ**                | **21**      | Popoln setup za profesionalni development  |

---

## ✅ Nameščeni MCP Serverji

### **1. Business & Productivity (15)**

| MCP               | Namen               | API Key          | Status |
| ----------------- | ------------------- | ---------------- | ------ |
| `gmail`           | Email komunikacija  | ✅ V Google      | ✅     |
| `googlecalendar`  | Urniki, scheduling  | ✅ V Google      | ✅     |
| `notion`          | Dokumentacija, wiki | ✅ Notion API    | ✅     |
| `linear`          | Issue tracking      | ✅ Linear API    | ✅     |
| `airtable`        | Baza podatkov       | ✅ Airtable API  | ✅     |
| `youtube`         | Video vsebine       | ✅ Google API    | ✅     |
| `sentry`          | Error monitoring    | ✅ Sentry API    | ✅     |
| `microsoft_teams` | Team komunikacija   | ✅ Microsoft     | ✅     |
| `asana`           | Project management  | ✅ Asana API     | ✅     |
| `linkedin`        | Networking          | ✅ LinkedIn API  | ✅     |
| `google_maps`     | Lokacije, geocoding | ✅ Google API    | ✅     |
| `spotify`         | Glasba              | ✅ Spotify OAuth | ✅     |
| `discord`         | Komunikacija        | ✅ Discord Bot   | ✅     |
| `stripe`          | Plačila, billing    | ✅ Stripe API    | ✅     |
| `resend`          | Email API           | ✅ Resend API    | ✅     |

---

### **2. Web Development (6) - NOVO! 🎉**

| MCP            | Namen                  | API Key     | FREE Limit          | Status        |
| -------------- | ---------------------- | ----------- | ------------------- | ------------- |
| `firecrawl`    | Web scraping, research | ✅ Required | 500 credits/month   | ⚠️ Potrebuješ |
| `context7`     | Live dokumentacija     | ❌ Ni treba | ∞                   | ✅ Deluje     |
| `github`       | GitHub upravljanje     | ✅ Required | ∞                   | ⚠️ Potrebuješ |
| `vercel`       | Deployment, build logs | ✅ Required | ∞                   | ⚠️ Potrebuješ |
| `playwright`   | Browser avtomatizacija | ❌ Ni treba | ∞                   | ✅ Deluje     |
| `brave-search` | Web search             | ✅ Required | 2000 requests/month | ⚠️ Potrebuješ |

---

## 🔥 Kaj omogočajo Web Development MCP-ji

### **Firecrawl MCP**

```
Uporaba:
→ "Scrape competitor pricing from https://shop.example.com"
→ "Extract all blog posts from https://techcrunch.com"
→ "Find all SaaS pricing pages in this article"

Cena: FREE 500 credits/month
```

### **Context7 MCP** ⭐ Najboljši!

```
Uporaba:
→ "Show me latest Next.js 15 App Router patterns"
→ "What's new in React 19?"
→ "Display Tailwind CSS v4 changes"

Cena: FREE ∞
```

### **GitHub MCP**

```
Uporaba:
→ "List my open pull requests"
→ "Create a new branch for login feature"
→ "Show recent commits to main"
→ "Create issue for bug #123"

Cena: FREE ∞
```

### **Vercel MCP**

```
Uporaba:
→ "Check latest deployment logs"
→ "Why did the build fail?"
→ "List all my projects on Vercel"
→ "Update environment variables"

Cena: FREE ∞
```

### **Playwright MCP**

```
Uporaba:
→ "Take screenshot of https://google.com"
→ "Test checkout flow: add to cart → checkout → success"
→ "Verify mobile responsive design"
→ "Run E2E tests for login"

Cena: FREE ∞
```

### **Brave Search MCP**

```
Uporaba:
→ "Find latest Next.js 15 release notes"
→ "Search for React 19 breaking changes"
→ "Research competitor features"

Cena: FREE 2000 requests/month
```

---

## 🚀 Namestitev

### **Korak 1: Pridobi API ključe**

```bash
# GitHub Token (OBVEZNO)
https://github.com/settings/tokens
→ Scope: repo, workflow, read:user

# Firecrawl API (FREE)
https://www.firecrawl.dev/app/api-keys
→ 500 credits/month

# Vercel Token (OPCIJA)
https://vercel.com/account/tokens

# Brave Search (FREE)
https://brave.com/search/api/
→ 2000 requests/month
```

### **Korak 2: Posodobi .env**

```env
GITHUB_TOKEN=ghp_tvoj-token
FIRECRAWL_API_KEY=fc_tvoj-key
VERCEL_TOKEN=tvoj-token
BRAVE_SEARCH_API_KEY=tvoj-key
```

### **Korak 3: Preveri namestitev**

```bash
npm run check-mcp
```

### **Korak 4: Restartaj Windsurf**

```
1. Zapri Windsurf
2. Odpri znova
3. MCP serverji se avtomatsko naložijo
```

---

## 📊 Primerjava: Pred/Po

| Metrika                | Pred (15 MCP) | Po (21 MCP)          |
| ---------------------- | ------------- | -------------------- |
| **Web Dev Tools**      | 0             | 6                    |
| **Research**           | ❌            | ✅ Firecrawl + Brave |
| **Live Docs**          | ❌            | ✅ Context7          |
| **GitHub Integration** | ❌            | ✅ GitHub MCP        |
| **Deployment Debug**   | ❌            | ✅ Vercel MCP        |
| **E2E Testing**        | ❌            | ✅ Playwright MCP    |
| **Productivity**       | ✅ 15         | ✅ 15                |
| **Skupaj**             | 15            | **21**               |

---

## 💡 Uporaba v Windsurf Cascade

### **Primer 1: Raziskovanje konkurence**

```
Cascade prompt:
"Use Firecrawl to scrape pricing pages:
- https://competitor1.com/pricing
- https://competitor2.com/pricing

Compare their features and create a table."
```

### **Primer 2: Debug deployment**

```
Cascade prompt:
"Check my latest Vercel deployment logs
and tell me why the build is failing."
```

### **Primer 3: Live dokumentacija**

```
Cascade prompt:
"Using Context7, show me the latest
React 19 documentation for use() hook"
```

### **Primer 4: GitHub workflow**

```
Cascade prompt:
"Create a new branch, commit the login changes,
and create a pull request to main"
```

### **Primer 5: E2E testiranje**

```
Cascade prompt:
"Use Playwright to test the checkout flow:
1. Go to /cart
2. Click 'Checkout'
3. Fill the form
4. Verify order confirmation"
```

---

## 🎓 Viri

- **Windsurf Docs:** https://docs.windsurf.com
- **MCP Servers:** https://github.com/modelcontextprotocol/servers
- **Firecrawl:** https://docs.firecrawl.dev
- **Context7:** https://docs.upstash.com/context7

---

## ✅ Checklista

- [x] 21 MCP serverjev v `.mcp.json`
- [x] `.env` posodobljen
- [x] `.env.example` posodobljen
- [x] `check-mcp` script dodan
- [x] Navodila ustvarjena
- [ ] GitHub token nastavljen
- [ ] Firecrawl API key nastavljen
- [ ] Vercel token nastavljen (opcija)
- [ ] Brave Search API key nastavljen (opcija)
- [ ] Windsurf restartan
- [ ] Vsi MCP-ji testirani

---

**Setup zaključen! 🚀**
