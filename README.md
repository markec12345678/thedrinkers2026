# 🎸 The Drinkers - Official Website

> **Slovenian Rock Legends Since 1993** 🍺🤘

[![Live Site](https://img.shields.io/badge/live-site-brightgreen.svg?style=flat-square)](https://thedrinkers.si)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)

---

## 🎯 About

**The Drinkers** are one of Slovenia's most recognizable rock bands, founded in 1993 in Litija. With over 30 years of career, 7 studio albums, and hundreds of concerts, we bring you the ultimate rock'n'roll experience.

This is our **official website** featuring:
- 🎵 Music catalog & discography
- 🎫 Concert dates & ticket sales
- 👕 Merchandise store
- 🎨 AI-powered fan experiences
- 🍺 Virtual bar with AI bots
- 🎤 VIP fan club

---

## 🚀 Features

### **Core Features**
- ✅ **Next.js 15** - Latest React framework
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS v4** - Modern styling
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimized** - Built-in SEO best practices
- ✅ **Analytics** - Vercel Analytics + Plausible

### **AI Features** (Powered by Ollama MCP)
- 🤖 **AI Setlist Generator** - Generate personalized setlists
- 🎨 **AI Fan Art Studio** - Create unique artwork
- 🍺 **Virtual Bar** - Chat with AI bots (Mati, Šef, Gosti)
- 💬 **AI Chat** - Interactive fan experience

### **Fan Experience**
- 🎫 Early access to concert tickets
- 👕 Exclusive merchandise drops
- 🎤 VIP fan club membership
- 📸 Fan art gallery
- 🗺️ Interactive concert map (1993-2026)

---

## 📁 Project Structure

```
the/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── music/                    # Music page
│   ├── tour/                     # Tour dates
│   ├── merch/                    # Merchandise store
│   ├── press/                    # Press & media
│   ├── vip-lounge/               # VIP area
│   ├── virtual-bar/              # Virtual bar
│   └── social-campaign/          # Social media campaign
│
├── components/                   # React components
│   ├── sections/                 # Page sections
│   │   ├── Hero.tsx
│   │   ├── MusicGrid.tsx
│   │   ├── TourCalendar.tsx
│   │   ├── MerchCarousel.tsx
│   │   └── SocialMediaCampaign.tsx
│   ├── features/                 # Feature components
│   │   ├── AISetlistGenerator.tsx
│   │   ├── FanArtGallery.tsx
│   │   ├── VirtualBar.tsx
│   │   └── VIPLounge.tsx
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileNav.tsx
│   └── ui/                       # UI components
│       ├── Button.tsx
│       ├── Section.tsx
│       └── GlassCard.tsx
│
├── lib/                          # Utilities
│   ├── utils.ts                  # Helper functions
│   ├── constants.ts              # Constants
│   └── ai/                       # AI utilities
│
├── public/                       # Static assets
│   ├── images/                   # Images
│   ├── videos/                   # Videos
│   └── fonts/                    # Fonts
│
├── scripts/                      # Automation scripts
│   ├── install-ollama-all-mcps.bat
│   ├── generate-hero-image.bat
│   └── test-website-complete.py
│
└── docs/                         # Documentation
    ├── SOCIAL_MEDIA_CAMPAIGN_2026.md
    ├── PROJECT_STRUCTURE_REPORT.md
    └── OLLAMA_MCP_NAVODILA.md
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Custom + Framer Motion |
| **Analytics** | Vercel Analytics + Plausible |
| **AI/ML** | Ollama MCP + inference.sh |
| **Deployment** | Vercel |
| **Database** | (Optional - for future features) |

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 20+
- pnpm or npm
- Git

### **Installation**

```bash
# Clone the repository
git clone https://github.com/thedrinkers/the.git
cd the

# Install dependencies
pnpm install
# or
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
pnpm dev
# or
npm run dev
```

### **Build for Production**

```bash
# Build
pnpm build
# or
npm run build

# Start production server
pnpm start
# or
npm start
```

---

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| **Homepage** | `/` | Hero section, latest news |
| **Music** | `/music` | Discography, streaming links |
| **Tour** | `/tour` | Concert dates, ticket sales |
| **Merch** | `/merch` | Merchandise store |
| **Press** | `/press` | Press kit, media resources |
| **VIP Lounge** | `/vip-lounge` | VIP fan club area |
| **Virtual Bar** | `/virtual-bar` | AI-powered virtual bar |
| **Social Campaign** | `/social-campaign` | Social media campaign generator |

---

## 🤖 AI Integration

### **Ollama MCP Setup**

The website integrates with Ollama MCP for AI-powered features:

```bash
# Install Ollama MCP
pnpm install -g @wonderwhy-er/desktop-commander

# Configure MCP servers
# See docs/OLLAMA_MCP_NAVODILA.md for detailed instructions
```

### **Available AI Features**
- 🎨 **AI Image Generation** - Fan art studio
- 🤖 **AI Chat** - Virtual bar conversations
- 🎵 **AI Setlist Generator** - Personalized setlists
- 📝 **AI Content** - Dynamic content generation

---

## 📱 Social Media Campaign

The website includes a complete social media campaign generator for the 2026 launch:

- 📸 **7-Day Campaign** - Teaser → Launch → Post-launch
- 🎨 **AI Image Generation** - Automated visual creation
- 📊 **Analytics Tracking** - Performance monitoring
- 📧 **Email Templates** - VIP, Concert, Merch emails

**Documentation:** `docs/SOCIAL_MEDIA_CAMPAIGN_2026.md`

---

## 📊 Performance

| Metric | Score |
|--------|-------|
| **Performance** | 95+ |
| **Accessibility** | 95+ |
| **Best Practices** | 100 |
| **SEO** | 100 |

*Measured with Lighthouse*

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary and confidential. All rights reserved.

© 2026 The Drinkers

---

## 📞 Contact

- **Website:** [thedrinkers.si](https://thedrinkers.si)
- **Instagram:** [@thedrinkers](https://instagram.com/thedrinkers)
- **Facebook:** [/thedrinkers](https://facebook.com/thedrinkers)
- **Spotify:** [The Drinkers](https://open.spotify.com/artist/thedrinkers)
- **YouTube:** [@thedrinkers](https://youtube.com/@thedrinkers)

---

## 🙏 Acknowledgments

- **30+ Years of Rock'n'Roll** - Thank you to all our fans!
- **Litija, Slovenia** - Where it all began (1993)
- **All Band Members** - Past and present
- **You** - For visiting our website! 🤘🍺

---

**Pijemo ga radi! 🍺**

*Built with ❤️ and 🤘 in Slovenia*
