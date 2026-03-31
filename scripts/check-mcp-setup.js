#!/usr/bin/env node

/**
 * MCP Server Setup Checker for Windsurf IDE
 * Checks if all required MCP servers are configured
 */

const fs = require("fs");
const path = require("path");

const COLORS = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

const log = {
  success: (msg) => console.log(`${COLORS.green}✓${COLORS.reset} ${msg}`),
  warning: (msg) => console.log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`),
  error: (msg) => console.log(`${COLORS.red}✗${COLORS.reset} ${msg}`),
  info: (msg) => console.log(`${COLORS.blue}ℹ${COLORS.reset} ${msg}`),
  header: (msg) => console.log(`\n${COLORS.cyan}${msg}${COLORS.reset}\n`),
};

function checkEnvFile() {
  log.header("📋 Checking .env file");

  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    log.error(".env file not found!");
    log.info("Copy .env.example to .env and fill in your values");
    return false;
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const requiredKeys = [
    "GITHUB_TOKEN",
    "VERCEL_TOKEN",
    "FIRECRAWL_API_KEY",
    "BRAVE_SEARCH_API_KEY",
  ];

  let allGood = true;
  requiredKeys.forEach((key) => {
    const regex = new RegExp(`${key}=(.+)`);
    const match = envContent.match(regex);

    if (
      match &&
      match[1] &&
      !match[1].includes("your-") &&
      !match[1].includes("ghp_xxx")
    ) {
      log.success(`${key} is configured`);
    } else {
      log.warning(`${key} needs to be set`);
      allGood = false;
    }
  });

  return allGood;
}

function checkMcpConfig() {
  log.header("⚙️  Checking .mcp.json configuration");

  const mcpPath = path.join(process.cwd(), ".mcp.json");
  if (!fs.existsSync(mcpPath)) {
    log.error(".mcp.json not found!");
    return false;
  }

  try {
    const mcpConfig = JSON.parse(fs.readFileSync(mcpPath, "utf8"));

    const requiredMcpServers = [
      "firecrawl",
      "context7",
      "github",
      "vercel",
      "playwright",
      "brave-search",
    ];

    const existingServers = Object.keys(mcpConfig.mcpServers || {});

    log.info(`Found ${existingServers.length} MCP servers configured`);

    let allGood = true;
    requiredMcpServers.forEach((server) => {
      if (existingServers.includes(server)) {
        log.success(`${server} MCP server is configured`);
      } else {
        log.error(`${server} MCP server is missing!`);
        allGood = false;
      }
    });

    return allGood;
  } catch (error) {
    log.error(`Invalid JSON in .mcp.json: ${error.message}`);
    return false;
  }
}

function checkNodeInstalled() {
  log.header("🔧 Checking Node.js installation");

  try {
    const { execSync } = require("child_process");
    const nodeVersion = execSync("node --version", { encoding: "utf8" }).trim();
    log.success(`Node.js ${nodeVersion} is installed`);

    const npmVersion = execSync("npm --version", { encoding: "utf8" }).trim();
    log.success(`npm ${npmVersion} is installed`);

    return true;
  } catch (error) {
    log.error("Node.js is not installed or not in PATH");
    log.info("Install Node.js from https://nodejs.org");
    return false;
  }
}

function showNextSteps() {
  log.header("🚀 Next Steps");

  console.log("1. Fill in missing API keys in .env file:");
  console.log("   - GITHUB_TOKEN: https://github.com/settings/tokens");
  console.log("   - VERCEL_TOKEN: https://vercel.com/account/tokens");
  console.log("   - FIRECRAWL_API_KEY: https://www.firecrawl.dev/app/api-keys");
  console.log("   - BRAVE_SEARCH_API_KEY: https://brave.com/search/api/");
  console.log("");
  console.log("2. Restart Windsurf IDE");
  console.log("");
  console.log("3. Test MCP servers in Cascade:");
  console.log('   - "Show me the latest Next.js 15 documentation" (Context7)');
  console.log('   - "List my GitHub repositories" (GitHub)');
  console.log('   - "Scrape https://example.com" (Firecrawl)');
  console.log('   - "Take a screenshot of https://google.com" (Playwright)');
  console.log("");
  console.log("📖 Full guide: MCP-INSTALLATION-GUIDE.md");
  console.log("");
}

function main() {
  console.log("\n" + "=".repeat(60));
  console.log("🔍 MCP Server Setup Checker");
  console.log("=".repeat(60) + "\n");

  const nodeOk = checkNodeInstalled();
  if (!nodeOk) {
    log.error("Node.js is required. Please install it first.");
    process.exit(1);
  }

  const envOk = checkEnvFile();
  const mcpOk = checkMcpConfig();

  log.header("📊 Summary");

  if (envOk && mcpOk) {
    log.success("All MCP servers are configured!");
    log.info("Restart Windsurf IDE to apply changes");
  } else {
    log.warning("Some configuration is missing");
    log.info("Follow the steps below to complete setup");
  }

  showNextSteps();
}

main();
