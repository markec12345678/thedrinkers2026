# Environment Setup - The Drinkers Website

## ✅ Node.js Installation

Node.js is installed at: `C:\Program Files\nodejs`

### Current Status:
- ✅ Node.js installed: `C:\Program Files\nodejs\node.exe`
- ✅ npm included
- ⚠️ PATH needs refresh (restart terminal)

## 🔧 Setup Instructions

### Option 1: Restart Terminal (Recommended)
1. Close ALL terminal windows
2. Open NEW terminal
3. Verify: `node --version`

### Option 2: Use Batch File
Run this command to set up environment for current session:
```bash
.qwen\setup-env.bat
```

### Option 3: Manual PATH Add (Admin Required)
1. Open System Properties → Environment Variables
2. Edit "Path" under System variables
3. Add: `C:\Program Files\nodejs`
4. Click OK and restart terminal

## 📦 Install Project Dependencies

After Node.js is working:

```bash
cd f:\thedrinkers\the
npm install
```

## 🚀 Verify Installation

```bash
# Check versions
node --version
npm --version

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 🆘 Troubleshooting

### "node is not recognized"
1. Restart terminal
2. Or run: `.qwen\setup-env.bat`
3. Check: `where node`

### npm install fails
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rmdir /s /q node_modules

# Reinstall
npm install
```

### Port 3000 in use
```bash
# Use different port
port=3001 npm run dev
```

## 📋 Required Versions

- **Node.js**: 18.0 or higher
- **npm**: 9.0 or higher
- **Git**: Optional (recommended)

## 🌐 Git Installation (Optional)

Git is NOT currently installed. Install from:
https://git-scm.com/download/win

After installation:
```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

## 🔗 Quick Links

- Node.js: https://nodejs.org/
- npm: https://www.npmjs.com/
- Git: https://git-scm.com/
- Next.js: https://nextjs.org/

---

**After restarting terminal, run:** `npm install` 🚀
