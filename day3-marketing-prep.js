#!/usr/bin/env node

/**
 * 📣 DAY 3: MARKETING PREP
 * Create social media graphics and content
 *
 * Usage: node day3-marketing-prep.js
 */

const fs = require("fs");
const path = require("path");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   📣  DAY 3: MARKETING PREP  📣                          ║
║                                                           ║
║   Creating marketing content                            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

// Create graphics folder
const graphicsPath = path.join(__dirname, "public", "marketing");
if (!fs.existsSync(graphicsPath)) {
  fs.mkdirSync(graphicsPath, { recursive: true });
}

console.log("📊 Step 1/4: Creating Social Media Templates...\n");

// Create SVG templates for social media
const templates = [
  {
    name: "coming-soon",
    text: "COMING SOON",
    subtext: "Something big is coming...",
    color: "#1a1a2e",
  },
  {
    name: "drop-is-live",
    text: "DROP IS LIVE!",
    subtext: "Limited Edition - 100 only",
    color: "#a855f7",
  },
  {
    name: "selling-fast",
    text: "SELLING FAST!",
    subtext: "50% already gone",
    color: "#f59e0b",
  },
  {
    name: "last-chance",
    text: "LAST CHANCE!",
    subtext: "Ends in 24 hours",
    color: "#ef4444",
  },
  {
    name: "sold-out",
    text: "SOLD OUT!",
    subtext: "Thank you!",
    color: "#10b981",
  },
];

templates.forEach((template, index) => {
  const svg = createSocialTemplate(template);
  const filePath = path.join(graphicsPath, `${template.name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ ${index + 1}/${templates.length}: ${template.name}`);
});

console.log("\n📊 Step 2/4: Creating Email Headers...\n");

const emailHeaders = [
  { name: "launch", text: "🚀 DROP IS LIVE!", color: "#a855f7" },
  { name: "urgency", text: "⏰ 24 HOURS LEFT!", color: "#f59e0b" },
  { name: "final-hours", text: "🔥 FINAL HOURS!", color: "#ef4444" },
  { name: "sold-out", text: "🎉 SOLD OUT!", color: "#10b981" },
];

emailHeaders.forEach((header, index) => {
  const svg = createEmailHeader(header);
  const filePath = path.join(graphicsPath, `email-${header.name}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ ${index + 1}/${emailHeaders.length}: ${header.name}`);
});

console.log("\n📊 Step 3/4: Creating Progress Bars...\n");

const progressLevels = [0, 25, 50, 75, 100];

progressLevels.forEach((level, index) => {
  const svg = createProgressBar(level);
  const filePath = path.join(graphicsPath, `progress-${level}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ ${index + 1}/${progressLevels.length}: ${level}%`);
});

console.log("\n📊 Step 4/4: Creating Countdown Graphics...\n");

const countdowns = [24, 12, 6, 3, 1];

countdowns.forEach((hours, index) => {
  const svg = createCountdown(hours);
  const filePath = path.join(graphicsPath, `countdown-${hours}h.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`✅ ${index + 1}/${countdowns.length}: ${hours}h left`);
});

console.log("\n╔═══════════════════════════════════════════════════════════╗");
console.log("║🎉 MARKETING GRAPHICS COMPLETE!                           ║");
console.log("╚═══════════════════════════════════════════════════════════╝\n");

console.log("📋 Graphics created:\n");
console.log(`   Social Media Templates: ${templates.length}`);
console.log(`   Email Headers: ${emailHeaders.length}`);
console.log(`   Progress Bars: ${progressLevels.length}`);
console.log(`   Countdown Graphics: ${countdowns.length}`);
console.log(
  `\n   Total: ${templates.length + emailHeaders.length + progressLevels.length + countdowns.length} graphics\n`,
);

console.log("📍 Saved to: /public/marketing/\n");

console.log("💡 NEXT STEPS:\n");
console.log("1. Review all graphics");
console.log("2. Schedule social media posts");
console.log("3. Prepare email campaigns");
console.log("4. Set up posting schedule\n");

function createSocialTemplate(template) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${template.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${template.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="1080" height="1080" fill="url(#grad-${template.name})"/>
  
  <text x="540" y="480" font-family="Arial, sans-serif" font-size="72" fill="white" text-anchor="middle" font-weight="bold">
    ${template.text}
  </text>
  
  <text x="540" y="580" font-family="Arial, sans-serif" font-size="36" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    ${template.subtext}
  </text>
  
  <text x="540" y="980" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.6)" text-anchor="middle">
    thedrinkers.si
  </text>
</svg>`;
}

function createEmailHeader(header) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="${header.color}"/>
  
  <text x="300" y="110" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle" font-weight="bold">
    ${header.text}
  </text>
</svg>`;
}

function createProgressBar(percent) {
  const filledWidth = (percent / 100) * 500;
  const color =
    percent >= 75 ? "#ef4444" : percent >= 50 ? "#f59e0b" : "#a855f7";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="600" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="100" fill="#1a1a2e"/>
  
  <rect x="50" y="35" width="500" height="30" fill="#333" rx="15"/>
  <rect x="50" y="35" width="${filledWidth}" height="30" fill="${color}" rx="15"/>
  
  <text x="300" y="90" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" font-weight="bold">
    ${percent}% SOLD
  </text>
</svg>`;
}

function createCountdown(hours) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="600" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-countdown-${hours}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a2e;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="600" height="600" fill="url(#grad-countdown-${hours})"/>
  
  <text x="300" y="250" font-family="Arial, sans-serif" font-size="120" fill="white" text-anchor="middle" font-weight="bold">
    ${hours}
  </text>
  
  <text x="300" y="350" font-family="Arial, sans-serif" font-size="48" fill="white" text-anchor="middle">
    HOURS LEFT
  </text>
  
  <text x="300" y="450" font-family="Arial, sans-serif" font-size="36" fill="rgba(255,255,255,0.8)" text-anchor="middle">
    ⏰ FINAL COUNTDOWN
  </text>
</svg>`;
}
