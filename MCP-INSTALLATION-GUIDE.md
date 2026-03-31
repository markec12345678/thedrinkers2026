# 🚀 MCP SERVER NAMESTITEV - NAVODILA

## ✅ Kaj je bilo dodano

V `.mcp.json` je bilo dodanih **6 novih web development MCP serverjev**:

| MCP Server     | Namen                                  | Status               |
| -------------- | -------------------------------------- | -------------------- |
| `firecrawl`    | Web scraping, research                 | ⚠️ Potrebuje API key |
| `context7`     | Live dokumentacija za libraryje        | ✅ Brez API key      |
| `github`       | GitHub upravljanje (PRs, issues, repo) | ⚠️ Potrebuje token   |
| `vercel`       | Deployment, build logs                 | ⚠️ Potrebuje token   |
| `playwright`   | Browser avtomatizacija, E2E testi      | ✅ Brez API key      |
| `brave-search` | Real-time web search                   | ⚠️ Potrebuje API key |

---

## 🔑 1. PRIDOBITEV API KLJUČEV

### **GitHub Token** (Obvezno)

```
1. Pojdi na: https://github.com/settings/tokens
2. Klikni "Generate new token (classic)"
3. Izberi scope: repo, workflow, read:user
4. Generiraj token
5. Kopiraj token (ghp_xxxxxxxxxxxx)
6. Prilepi v .env: GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

### **Vercel Token** (Priporočljivo)

```
1. Pojdi na: https://vercel.com/account/tokens
2. Klikni "Create"
3. Ime: windsurf-mcp
4. Kopiraj token
5. Prilepi v .env: VERCEL_TOKEN=your-token-here
```

### **Firecrawl API Key** (FREE - 500 credits/month)

```
1. Pojdi na: https://www.firecrawl.dev/app/api-keys
2. Registriraj se (FREE account)
3. Ustvari API key
4. Kopiraj key
5. Prilepi v .env: FIRECRAWL_API_KEY=fc_your-key-here
```

### **Brave Search API Key** (FREE - 2000 requests/month)

```
1. Pojdi na: https://brave.com/search/api/
2. Klikni "Get Started"
3. Registriraj se
4. Ustvari API key
5. Kopiraj key
6. Prilepi v .env: BRAVE_SEARCH_API_KEY=your-key-here
```

---

## ⚡ 2. NAMESTITEV V WINDSURFU

### **Korak 1: Odpri Windsurf Settings**

```
Windows: Ctrl + ,
Mac: Cmd + ,
```

### **Korak 2: Odpri MCP Marketplace**

```
1. V settingsih išči "MCP"
2. Klikni "MCP Marketplace"
3. Ali odpri: .mcp.json direktno
```

### **Korak 3: Preveri konfiguracijo**

```
.mcp.json bi moral vsebovati vseh 21 MCP serverjev:
- 15 originalnih (gmail, notion, linear, stripe, resend...)
- 6 novih (firecrawl, context7, github, vercel, playwright, brave-search)
```

### **Korak 4: Restartaj Windsurf**

```
1. Zapri Windsurf
2. Ponovno odpri
3. MCP serverji se bodo naložili avtomatsko
```

---

## 🧪 3. TESTIRANJE

### **Test 1: Context7 (najlažje)**

```
V Windsurf Cascade vprašaj:
"Show me the latest Next.js 15 documentation for App Router"

Če deluje → Context7 MCP je nameščen ✅
```

### **Test 2: GitHub**

```
Vprašaj:
"List my recent GitHub repositories"

Če deluje → GitHub MCP je nameščen ✅
```

### **Test 3: Firecrawl**

```
Vprašaj:
"Scrape the content from https://example.com"

Če deluje → Firecrawl MCP je nameščen ✅
```

### **Test 4: Playwright**

```
Vprašaj:
"Take a screenshot of https://google.com"

Če deluje → Playwright MCP je nameščen ✅
```

---

## 🎯 4. UPORABA V PRAKSI

### **Primer 1: Research s Firecrawl**

```
Cascade prompt:
"Research competitor pricing pages using Firecrawl.
Check these URLs:
- https://competitor1.com/pricing
- https://competitor2.com/pricing
Extract pricing tiers and features."
```

### **Primer 2: GitHub Workflow**

```
Cascade prompt:
"Create a new branch for the login feature,
commit the changes, and create a pull request"
```

### **Primer 3: Live Documentation**

```
Cascade prompt:
"Using Context7, show me the latest React 19
documentation for use() hook"
```

### **Primer 4: E2E Testing**

```
Cascade prompt:
"Use Playwright to test the checkout flow:
1. Go to /cart
2. Click checkout
3. Fill form
4. Verify success page"
```

### **Primer 5: Vercel Deployment**

```
Cascade prompt:
"Check my latest Vercel deployment logs
and tell me why the build failed"
```

---

## 📊 5. KONČNA KONFIGURACIJA

### **Tvoj .mcp.json zdaj vsebuje:**

```
✅ Business/Productivity (15):
   Gmail, Calendar, Notion, Linear, Airtable, YouTube,
   Sentry, Teams, Asana, LinkedIn, Google Maps,
   Spotify, Discord, Stripe, Resend

✅ Web Development (6) - NOVO!:
   Firecrawl, Context7, GitHub, Vercel, Playwright, Brave-Search

SKUPAJ: 21 MCP serverjev 🎉
```

---

## ⚠️ 6. REŠEVANJE TEŽAV

### **Težava: MCP server se ne naloži**

```
Rešitev:
1. Preveri če je Node.js nameščen: node --version
2. Preveri če je npm na voljo: npm --version
3. Restartaj Windsurf
4. Preveri Console v Windsurf za errorje
```

### **Težava: API key ne deluje**

```
Rešitev:
1. Preveri če je key pravilno kopiran (brez presledkov)
2. Preveri če je .env shranjen
3. Restartaj Windsurf
4. Za GitHub: preveri če ima token prave scope
```

### **Težava: Preveč MCPjev (100 limit)**

```
Rešitev:
1. Windsurf ima limit 100 orodij
2. Onemogoči neuporabljene MCPje v .mcp.json:
   "disabled": true
3. Ali izbriši tiste ki jih ne rabiš
```

---

## 🎓 7. DODATNI VIRI

- **Windsurf Docs:** https://docs.windsurf.com
- **MCP Servers List:** https://github.com/modelcontextprotocol/servers
- **Firecrawl Docs:** https://docs.firecrawl.dev
- **Context7 Docs:** https://docs.upstash.com/context7

---

## ✅ CHECKLIST

- [ ] Pridobi GitHub token
- [ ] Pridobi Vercel token (opcija)
- [ ] Pridobi Firecrawl API key
- [ ] Pridobi Brave Search API key (opcija)
- [ ] Posodobi .env z vsemi keyi
- [ ] Restartaj Windsurf
- [ ] Testiraj Context7
- [ ] Testiraj GitHub
- [ ] Testiraj Firecrawl
- [ ] Testiraj Playwright

**Vsa navodila končana! 🚀**
