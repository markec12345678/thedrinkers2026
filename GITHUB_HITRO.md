# ⚡ Hitri Vodnik za GitHub - The Drinkers

## 🚨 Git NI Nameščen!

Git moraš namestiti preden lahko pushaš na GitHub.

---

## 📥 1. Namesti Git

### Windows (Najlažje):

**Option A: Winget (če imaš Windows 11)**
```powershell
winget install Git.Git
```

**Option B: Prenesi installer**
1. Pojdi na: https://git-scm.com/download/win
2. Prenesi "64-bit Git for Windows Setup"
3. Zaženi installer
4. Klikaj "Next" z privzetimi nastavitvami
5. Končaj instalacijo
6. **Restartaj terminal/command prompt**

**Option C: Chocolatey**
```powershell
choco install git
```

---

## ✅ 2. Preveri Instalacijo

Odpri **nov** terminal/command prompt in run:

```bash
git --version
```

Bi moral videti: `git version 2.x.x`

---

## 🎯 3. Push na GitHub - Izbira Metode

### 🟢 METODA A: Avtomatska Skripta (Najlažje)

**PowerShell:**
```powershell
cd f:\thedrinkers\the
.\push-to-github.ps1
```

**Command Prompt:**
```cmd
cd f:\thedrinkers\the
push-to-github.bat
```

Skripta te bo vodila skozi proces!

---

### 🟡 METODA B: Ročno (Več Kontrole)

#### Korak 1: Ustvari GitHub Račun
1. Pojdi na: https://github.com/signup
2. Registriraj se (brezplačno)
3. Verificiraj email

#### Korak 2: Ustvari Repository na GitHubu
1. Pojdi na: https://github.com/new
2. Repository name: `the-drinkers-site`
3. Izberi: **Public** (priporočeno) ali **Private**
4. **NE klikaš** "Add README"
5. Klikni "Create repository"

#### Korak 3: Inicializiraj Git Lokalno
```bash
cd f:\thedrinkers\the
git init
git branch -M main
```

#### Korak 4: Poveži z GitHubom
```bash
# Zamenjaj YOUR_USERNAME s tvojim GitHub username
git remote add origin https://github.com/YOUR_USERNAME/the-drinkers-site.git
```

#### Korak 5: Dodaj Vse Datoteke
```bash
git add .
```

#### Korak 6: Naredi Prvi Commit
```bash
git commit -m "Initial commit - The Drinkers website"
```

#### Korak 7: Push na GitHub
```bash
git push -u origin main
```

**Vnesi GitHub username in password/token:**
- Username: Tvoj GitHub username
- Password: Uporabi **Personal Access Token** (ne tvoje geslo!)

**Kako narediti token:**
1. Pojdi na: https://github.com/settings/tokens
2. Klikni "Generate new token (classic)"
3. Daj ime: `the-drinkers-push`
4. Izberi scope: ✅ `repo` (vse pod-options)
5. Klikni "Generate token"
6. **Kopiraj token** (shrani ga, ne boš ga videl več!)
7. Uporabi token kot password pri pushu

---

### 🟣 METODA C: GitHub CLI (Najbolj Profesionalno)

#### Namesti GitHub CLI:
```powershell
winget install GitHub.cli
```

#### Login:
```bash
gh auth login
```

#### Ustvari in Pushaj:
```bash
cd f:\thedrinkers\the
gh repo create the-drinkers-site --public --push
```

To bo samodejno:
- ✅ Ustvarilo repository na GitHubu
- ✅ Dodalo remote
- ✅ Pushalo kodo

---

## 🔍 4. Preveri na GitHubu

1. Pojdi na: `https://github.com/YOUR_USERNAME/the-drinkers-site`
2. Vidiš vse datoteke? ✅
3. README.md se prikaže? ✅

---

## 🚀 5. Deploy na Vercel (Po GitHub Pushu)

1. Pojdi na: https://vercel.com/new
2. Login z GitHub
3. Klikni "Import Git Repository"
4. Izberi `the-drinkers-site`
5. Klikni "Deploy"
6. Počakaj 2-3 minute
7. Tvoja stran je live! 🎉

**URL:** `https://the-drinkers-site.vercel.app`

---

## 📊 Kaj Se Pusha?

### ✅ DA (Se Pusha):
```
app/                    ✅ Vse strani
components/             ✅ Vse komponente
lib/                    ✅ Types, constants
styles/                 ✅ CSS datoteke
public/                 ✅ Slike (preveri velikost!)
*.md                    ✅ Dokumentacija
*.json, *.ts, *.tsx     ✅ Koda in configi
```

### ❌ NE (Se NE Pusha):
```
node_modules/           ❌ Preveliko (.gitignore)
.env.local              ❌ Sensitivni podatki
.next/                  ❌ Build output
.git/                   ❌ Git metadata
*.log                   ❌ Log datoteke
```

---

## 🐛 Troubleshooting

### "Git is not recognized"

**Rešitev:**
1. Namesti Git (glej zgoraj)
2. **Restartaj terminal** (zelo pomembno!)
3. Poskusi ponovno

### "Permission denied" ali "Authentication failed"

**Rešitev z GitHub CLI:**
```bash
gh auth login
# Sledi navodilom
```

**Ali uporabi token:**
1. Ustvari token: https://github.com/settings/tokens
2. Uporabi token namesto passworda

### "File is too large" (>100MB)

**Rešitev:**
```bash
# Namesti Git LFS
git lfs install

# Track velike datoteke
git lfs track "*.psd"
git lfs track "*.zip"

# Ponovno dodaj
git add .
git commit -m "Add large files"
git push
```

### "Remote origin already exists"

**Rešitev:**
```bash
# Odstrani obstoječi remote
git remote remove origin

# Dodaj novega
git remote add origin https://github.com/USERNAME/REPO.git
```

---

## 📋 Hitri Ukazi

```bash
# Preveri status
git status

# Dodaj vse datoteke
git add .

# Commitaj
git commit -m "tvoj message"

# Pushaj
git push origin main

# Pullaj (če delaš z drugimi)
git pull origin main

# Ustvari nov branch
git checkout -b ime-brancha

# Preveri branche
git branch

# Preveri zgodovino
git log --oneline
```

---

## 🎯 Conventional Commits

**Format:** `type: description`

**Primeri:**
```bash
git commit -m "feat: add hero section"
git commit -m "fix: resolve image loading bug"
git commit -m "docs: update README"
git commit -m "style: format code"
git commit -m "refactor: simplify logic"
git commit -m "perf: optimize images"
```

**Types:**
- `feat:` - Nova funkcionalnost
- `fix:` - Popravek buga
- `docs:` - Dokumentacija
- `style:` - Formatiranje
- `refactor:` - Refactoring
- `perf:` - Performance
- `test:` - Testi
- `chore:` - Maintenance

---

## ✅ Checklist

### Pred Pushom:
- [ ] Git nameščen
- [ ] GitHub račun ustvarjen
- [ ] `.env.local` NI v commitu
- [ ] `node_modules/` NI v commitu
- [ ] Vse datoteke so pripravljene

### Po Pushu:
- [ ] Vse datoteke vidne na GitHubu
- [ ] README.md se prikaže
- [ ] Vercel povezan
- [ ] Stran deployana
- [ ] GitHub profil posodobljen

---

## 📞 Rabiš Pomoč?

### Dokumentacija:
- **Git:** https://git-scm.com/doc
- **GitHub:** https://docs.github.com
- **GitHub CLI:** https://cli.github.com

### Video Tutoriali:
- "Git and GitHub for Beginners": https://www.youtube.com/watch?v=RGOj5yH7evn
- "How to Push to GitHub": https://www.youtube.com/watch?v=ZVbNQwvWJjE

---

## 🎸 Tvoj Action Plan:

**Danes:**
1. ✅ Namesti Git
2. ✅ Ustvari GitHub račun
3. ✅ Naredi `git init`
4. ✅ Pushaj na GitHub

**Jutri:**
1. ✅ Deployaj na Vercel
2. ✅ Testiraj stran
3. ✅ Deluj naprej!

---

**Srečno! 🚀🎸**

Built with 🤘 for The Drinkers • 2026
