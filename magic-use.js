/**
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

const { spawn } = require("child_process");
const path = require("path");

const MAGIC_MCP_PATH = path.join(
  __dirname,
  "magic-mcp-21st",
  "dist",
  "index.js",
);
const API_KEY =
  "an_sk_743d3d6ad30d8b5544534c307534c1b219e73f2b7297613a87f37dcfa69758e4";

const command = process.argv[2];
const options = process.argv.slice(3).join(" ");

if (!command) {
  console.log("Usage: node magic-use.js [command] [options]");
  console.log("\nCommands:");
  console.log("  create-ui    - Create new UI component");
  console.log("  fetch-ui     - Fetch existing component");
  console.log("  refine-ui    - Improve existing UI");
  console.log("  logo-search  - Search for logos/icons");
  process.exit(1);
}

console.log("🎸 Magic MCP:", command);
console.log("═".repeat(70));

const mcp = spawn("node", [MAGIC_MCP_PATH], {
  env: { ...process.env, API_KEY },
  stdio: ["pipe", "pipe", "pipe"],
});

mcp.stdout.on("data", (data) => {
  console.log(data.toString());
});

mcp.stderr.on("data", (data) => {
  console.error(data.toString());
});

mcp.on("close", (code) => {
  console.log("\n✅ Magic MCP completed with code", code);
});

// Send command
mcp.stdin.write(
  JSON.stringify({
    method: "tools/call",
    params: {
      name: command,
      arguments: { prompt: options },
    },
  }) + "\n",
);

mcp.stdin.end();
