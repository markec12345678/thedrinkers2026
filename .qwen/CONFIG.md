# 🎸 Skills & MCP Configuration - The Drinkers Website

## ✅ Skills Successfully Linked

### All Available Skill Directories:
```
.qwen/
├── skills/           → F:\ffff\agentflow-pro\.claude\skills\    (21 skills)
├── codex-skills/     → F:\ffff\agentflow-pro\.codex\skills\     (21 skills)
├── cursor-skills/    → F:\ffff\agentflow-pro\.cursor\skills\    (21 skills)
├── gemini-skills/    → F:\ffff\agentflow-pro\.gemini\skills\    (21 skills)
├── copilot-skills/   → F:\ffff\agentflow-pro\.github\copilot\   (21 skills)
└── mcp.json          → F:\ffff\agentflow-pro\.vscode\mcp.json   (60 MCPs)
```

### 📊 Total Available:
- **105+ Skills** (from 5 different AI platforms)
- **60 MCP Servers** (from VSCode config)
- **Total: 165+ integrations!**

---

## 🎯 Skill Categories

### 1. API & Database Integrations (24 skills)
- **Airtable** - Database & spreadsheet operations
- **Apaleo** - Hotel/property management
- **Contentful** - Headless CMS
- **Supabase** - PostgreSQL database
- **Notion** - Workspace & docs
- **Zoho Books** - Accounting
- **Zoho Inventory** - Inventory management

### 2. Google Services (6 skills)
- **Gmail** - Email operations
- **Google Calendar** - Scheduling
- **Google Docs** - Document editing
- **Google Drive** - File storage
- **Google Photos** - Photo management
- **Google Sheets** - Spreadsheets

### 3. Communication (4 skills)
- **Slack** - Team messaging
- **Zoom** - Video conferencing
- **Facebook** - Social media
- **YouTube** - Video platform

### 4. Development Tools (15+ skills)
- **GitHub** - Version control & CI/CD
- **Git workflows** - Branch management
- **Code quality** - Best practices
- **Debugging** - Systematic debugging
- **Testing** - Unit, integration, E2E tests
- **Deployment** - Vercel, Netlify, Docker

### 5. Design & Frontend (20+ skills)
- **Frontend design** - UI/UX patterns
- **Tailwind CSS** - Utility-first styling
- **React** - Component patterns
- **Responsive design** - Mobile-first
- **Animations** - CSS & Framer Motion
- **Accessibility** - WCAG compliance

### 6. Content & Marketing (10+ skills)
- **Copywriting** - Marketing copy
- **SEO** - Search optimization
- **Social media** - Content creation
- **Email sequences** - Automation
- **Landing pages** - Conversion optimization

### 7. AI & Automation (25+ skills)
- **AI image generation** - FLUX, Gemini
- **AI video generation** - Veo, Wan
- **AI music generation** - Diffrythm
- **Speech-to-text** - Whisper
- **Text-to-speech** - DIA, Kokoro
- **Web search** - Tavily, Exa
- **Browser automation** - Playwright

---

## 🔧 MCP Servers (60 Available)

### Integration Categories:
- **Database**: PostgreSQL, MySQL, MongoDB, Redis
- **Cloud**: AWS, Azure, GCP
- **Communication**: Slack, Discord, Email
- **File Systems**: Local, S3, Google Drive
- **Development**: GitHub, GitLab, Jira
- **AI Services**: OpenAI, Anthropic, Cohere
- **Monitoring**: Prometheus, Grafana
- **And 50+ more...**

---

## 📦 Using Skills in This Project

### ⚠️ CRITICAL RULE:
> **IF A SKILL APPLIES (even 1%), YOU MUST INVOKE IT BEFORE ANY ACTION!**

### Skill Invocation Flow:
```
1. User request received
   ↓
2. Check: Might any skill apply? (even 1%)
   ↓ YES
3. Invoke Skill tool
   ↓
4. Announce: "Using [skill] to [purpose]"
   ↓
5. Follow skill instructions exactly
   ↓
6. Complete task
```

### Example Usage:

**Before building a feature:**
```
skill: "brainstorming"
```

**Before debugging:**
```
skill: "debugging"
```

**Before writing CSS:**
```
skill: "tailwind-css"
```

**Before Git operations:**
```
skill: "git-workflow"
```

**Before deployment:**
```
skill: "deployment-automation"
```

---

## 🚀 Project Quick Start

### 1. Install Dependencies:
```bash
cd f:\thedrinkers\the
npm install
```

### 2. Configure Environment:
```bash
copy .env.example .env.local
```

### 3. Start Development:
```bash
npm run dev
```

### 4. Access Skills:
Skills are automatically available via the `.qwen/` directory.

---

## 📁 Complete Project Structure

```
the-drinkers-site/
├── .qwen/                          ← AI Configuration
│   ├── skills/                     ← Claude skills (21)
│   ├── codex-skills/               ← Codex skills (21)
│   ├── cursor-skills/              ← Cursor skills (21)
│   ├── gemini-skills/              ← Gemini skills (21)
│   ├── copilot-skills/             ← Copilot skills (21)
│   ├── mcp.json                    ← 60 MCP servers
│   ├── CONFIG.md                   ← This file
│   └── README.md                   ← Skills overview
│
├── app/                            ← Next.js Pages
│   ├── layout.tsx                  ← Root layout
│   ├── page.tsx                    ← Homepage
│   ├── tour/                       ← Tour dates
│   ├── music/                      ← Music catalog
│   ├── merch/                      ← Merchandise
│   ├── about/                      ← Band info
│   ├── bar/                        ← Fan area
│   ├── gallery/                    ← Photos
│   ├── contact/                    ← Contact form
│   ├── privacy/                    ← Privacy policy
│   ├── terms/                      ← Terms of service
│   └── api/                        ← API routes
│       ├── newsletter/             ← Email signup
│       └── tickets/                ← Ticket sales
│
├── components/
│   ├── ui/                         ← Reusable components
│   ├── layout/                     ← Header, Footer, Nav
│   ├── sections/                   ← Page sections
│   ├── features/                   ← Special features
│   └── seo/                        ← Schema.org markup
│
├── lib/
│   ├── types.ts                    ← TypeScript types
│   ├── constants.ts                ← Site data
│   ├── utils.ts                    ← Utilities
│   └── seo.ts                      ← SEO helpers
│
├── public/                         ← Static assets
├── styles/                         ← CSS files
├── config/                         ← Config files
├── package.json                    ← Dependencies
├── tsconfig.json                   ← TypeScript config
├── tailwind.config.js              ← Tailwind theme
├── next.config.js                  ← Next.js config
├── README.md                       ← Full documentation
└── QUICKSTART.md                   ← Quick start guide
```

---

## 🎯 Most Relevant Skills for This Project

### Daily Development:
1. **frontend-design** - Building UI components
2. **tailwind-css** - Styling
3. **react-vite-best-practices** - React patterns
4. **code-quality** - Code standards
5. **debugging** - Fixing issues
6. **git-workflow** - Version control

### Occasional:
7. **deployment-automation** - Deploy
8. **seo-audit** - SEO checks
9. **performance-optimization** - Speed
10. **web-accessibility** - A11y compliance

### AI-Powered:
11. **ai-image-generation** - Create images
12. **ai-video-generation** - Create videos
13. **web-search** - Research
14. **prompt-engineering** - Better AI prompts

---

## ⚡ Power User Tips

### 1. Chain Skills:
```
brainstorming → frontend-design → tailwind-css → code-review
```

### 2. Use MCP for External Services:
```
MCP: GitHub → Create PR
MCP: Database → Run queries
MCP: File System → Bulk operations
```

### 3. Always Check Skills First:
Before ANY task, ask: "Is there a skill for this?"

---

## 🆘 Troubleshooting

### Skills Not Loading?
1. Check `.qwen/` directory exists
2. Verify junctions point to `F:\ffff\...`
3. Restart your AI assistant

### MCP Not Working?
1. Check `mcp.json` syntax
2. Verify MCP server installed
3. Check permissions

### Git/Node Not Found?
Install:
- Git: https://git-scm.com/download/win
- Node.js: https://nodejs.org/

---

## 📞 Support

For skill issues: Check `F:\ffff\agentflow-pro\README.md`
For project issues: See `README.md` in root

---

**All 105+ skills and 60 MCPs are now available!** 🤘

*Last updated: 2026-03-19*
