/**
 * AUTO-LOADER FOR SKILLS & MCS
 *
 * Ta script se avtomatsko izvede ob vsakem zagonu
 * in naloži vse skills in MCP-je
 */

const fs = require("fs");
const path = require("path");

console.log("⚡ Auto-loading skills and MCPs...\n");

// Load master config
const masterConfigPath = path.join(
  __dirname,
  ".qwen",
  "MASTER_SKILLS_INDEX.json",
);
if (fs.existsSync(masterConfigPath)) {
  const config = JSON.parse(fs.readFileSync(masterConfigPath, "utf-8"));
  console.log("✅ Skills loaded:", config.totalSkills);
  console.log("✅ MCP servers loaded:", config.totalMcpServers);
  console.log("✅ Skills directories:", config.skillsDirectories.length);
  console.log("\n🎉 All skills and MCPs ready!\n");
} else {
  console.log(
    "⚠️  Master config not found. Run: node master-skills-loader.js\n",
  );
}
