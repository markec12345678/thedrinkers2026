/**
 * MAGIC MCP AUTO-INTEGRATION
 *
 * Ta script avtomatsko integrira Magic MCP z The Drinkers projektom.
 * Uporabnik ne rabi ničesar narediti ročno!
 *
 * Usage: node magic-mcp-auto.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🎸 Magic MCP Auto-Integration\n");
console.log("═".repeat(70));

// Check if Magic MCP is built
const distPath = path.join(__dirname, "magic-mcp-21st", "dist", "index.js");
if (!fs.existsSync(distPath)) {
  console.log("⚠️  Magic MCP not built. Building now...\n");
  try {
    execSync("npm run build", {
      cwd: path.join(__dirname, "magic-mcp-21st"),
      stdio: "inherit",
    });
    console.log("✅ Build complete!\n");
  } catch (err) {
    console.error("❌ Build failed:", err.message);
    process.exit(1);
  }
} else {
  console.log("✅ Magic MCP already built\n");
}

// Check MCP config
const mcpConfigPath = path.join(__dirname, ".qwen", "mcp.json");
if (!fs.existsSync(mcpConfigPath)) {
  console.log("⚠️  MCP config not found. Creating...\n");

  const mcpDir = path.join(__dirname, ".qwen");
  if (!fs.existsSync(mcpDir)) {
    fs.mkdirSync(mcpDir, { recursive: true });
  }

  const mcpConfig = {
    mcpServers: {
      "magic-mcp": {
        command: "node",
        args: [
          path
            .join(__dirname, "magic-mcp-21st", "dist", "index.js")
            .replace(/\\/g, "/"),
        ],
        env: {
          API_KEY:
            "an_sk_743d3d6ad30d8b5544534c307534c1b219e73f2b7297613a87f37dcfa69758e4",
        },
      },
    },
  };

  fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpConfig, null, 2));
  console.log("✅ MCP config created at .qwen/mcp.json\n");
} else {
  console.log("✅ MCP config already exists\n");
}

// Create auto-use wrapper
const autoUsePath = path.join(__dirname, "magic-use.js");
const autoUseContent = `/**
 * MAGIC MCP AUTO-USE
 * 
 * Preprosto uporaba Magic MCP za The Drinkers
 * 
 * Usage: node magic-use.js [command] [options]
 * 
 * Commands:
 *   create-ui    - Create new UI component
 *   fetch-ui     - Fetch existing component
 *   refine-ui    - Improve existing UI
 *   logo-search  - Search for logos/icons
 */

const { spawn } = require('child_process');
const path = require('path');

const MAGIC_MCP_PATH = path.join(__dirname, 'magic-mcp-21st', 'dist', 'index.js');
const API_KEY = 'an_sk_743d3d6ad30d8b5544534c307534c1b219e73f2b7297613a87f37dcfa69758e4';

const command = process.argv[2];
const options = process.argv.slice(3).join(' ');

if (!command) {
  console.log('Usage: node magic-use.js [command] [options]');
  console.log('\\nCommands:');
  console.log('  create-ui    - Create new UI component');
  console.log('  fetch-ui     - Fetch existing component');
  console.log('  refine-ui    - Improve existing UI');
  console.log('  logo-search  - Search for logos/icons');
  process.exit(1);
}

console.log('🎸 Magic MCP:', command);
console.log('═'.repeat(70));

const mcp = spawn('node', [MAGIC_MCP_PATH], {
  env: { ...process.env, API_KEY },
  stdio: ['pipe', 'pipe', 'pipe']
});

mcp.stdout.on('data', (data) => {
  console.log(data.toString());
});

mcp.stderr.on('data', (data) => {
  console.error(data.toString());
});

mcp.on('close', (code) => {
  console.log('\\n✅ Magic MCP completed with code', code);
});

// Send command
mcp.stdin.write(JSON.stringify({
  method: 'tools/call',
  params: {
    name: command,
    arguments: { prompt: options }
  }
}) + '\\n');

mcp.stdin.end();
`;

fs.writeFileSync(autoUsePath, autoUseContent);
console.log("✅ Auto-use wrapper created: magic-use.js\n");

// Create examples
const examplesDir = path.join(__dirname, "magic-examples");
if (!fs.existsSync(examplesDir)) {
  fs.mkdirSync(examplesDir, { recursive: true });

  const examples = [
    {
      name: "hero-section.js",
      content: `// Hero Section Example
const { execSync } = require('child_process');

execSync('node magic-use.js create-ui "Create a hero section for The Drinkers band website with dark theme, band logo, and two CTA buttons"', {
  stdio: 'inherit'
});
`,
    },
    {
      name: "product-card.js",
      content: `// Product Card Example
const { execSync } = require('child_process');

execSync('node magic-use.js create-ui "Create a product card for The Drinkers merch store with image, price, size selector, and add to cart button"', {
  stdio: 'inherit'
});
`,
    },
    {
      name: "tour-dates.js",
      content: `// Tour Dates Example
const { execSync } = require('child_process');

execSync('node magic-use.js create-ui "Create a tour dates list with 15 European concerts, venue info, and buy tickets buttons"', {
  stdio: 'inherit'
});
`,
    },
  ];

  examples.forEach((example) => {
    fs.writeFileSync(path.join(examplesDir, example.name), example.content);
  });

  console.log("✅ Examples created in magic-examples/\n");
}

// Create README
const readmeContent = `# 🎸 MAGIC MCP - AUTO INTEGRATION

**Status:** Fully Automated  
**Setup:** Complete  
**Usage:** Ready!

---

## 🚀 HITRI ZAČETEK

### Opcija 1: Avtomatsko (Priporočeno)

Jaz samodejno uporabil Magic MCP ko rabiš UI komponente.
Ti samo reci: "Naredi mi product page" ali "Ustvari hero section"

### Opcija 2: Ročno

Ustvari UI komponento:
  node magic-use.js create-ui "Create a product card for The Drinkers"

Izboljšaj obstoječo UI:
  node magic-use.js refine-ui "Make this button more modern with animations"

Poišči logo/ikono:
  node magic-use.js logo-search "Find rock music icon"

### Opcija 3: Primeri

Zaženi primere:
  node magic-examples/hero-section.js
  node magic-examples/product-card.js
  node magic-examples/tour-dates.js

---

## 📊 KAJ SEM AVTOMATIZIRAL?

✅ MCP Config - .qwen/mcp.json  
✅ Magic MCP Build - dist/index.js  
✅ Auto-Use Wrapper - magic-use.js  
✅ Primeri - magic-examples/  
✅ API Key - Konfiguriran  

---

## 🎯 UPORABA

### Meni (Qwen) poveš:

"Naredi mi product card za The Drinkers merch"

**Jaz bom:**
1. ✅ Samodejno uporabil Magic MCP
2. ✅ Generiral UI komponento
3. ✅ Integriral s tvojo bazo
4. ✅ Prilagodil tvojemu projektu

**Ti ne rabiš ničesar!**

---

## 📁 DATOTEKE

the/
  .qwen/
    mcp.json          MCP konfiguracija
  magic-mcp-21st/
    dist/
      index.js      Built executable
  magic-use.js          Auto-use wrapper
  magic-examples/       Primeri
    hero-section.js
    product-card.js
    tour-dates.js
  MAGIC_MCP_AUTO.md     Ta dokument

---

## 🔧 KONFIGURACIJA

API Key: an_sk_743d3d6ad30d8b5544534c307534c1b219e73f2b7297613a87f37dcfa69758e4

Path: F:/thedrinkers/the/magic-mcp-21st/dist/index.js

Server: Magic MCP v0.1.1-beta.1

---

## ✅ VERIFICATION

Testiraj povezavo:
  node magic-use.js create-ui "test"

Preveri če deluje:
  dir magic-mcp-21st\\dist

---

**Created:** 2026-03-25  
**Status:** Ready for Automatic Use  
**Integration:** Full Auto-Pilot
`;

fs.writeFileSync(path.join(__dirname, "MAGIC_MCP_AUTO.md"), readmeContent);
console.log("✅ README created: MAGIC_MCP_AUTO.md\n");

console.log("═".repeat(70));
console.log("\n🎉 MAGIC MCP AUTO-INTEGRATION COMPLETE!\n");
console.log("📊 Summary:");
console.log("   ✅ Magic MCP built");
console.log("   ✅ MCP config created");
console.log("   ✅ Auto-use wrapper ready");
console.log("   ✅ Examples generated");
console.log("   ✅ Documentation complete\n");
console.log("🚀 Usage:");
console.log('   Ti samo reci: "Naredi mi [UI komponento]"');
console.log("   Jaz bom samodejno uporabil Magic MCP!\n");
console.log("═".repeat(70));
