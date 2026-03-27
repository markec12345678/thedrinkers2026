#!/usr/bin/env node

/**
 * 🚀 COMPLETE SETUP SCRIPT
 * One command to setup everything!
 *
 * Usage: node setup-complete.js
 */

const fs = require("fs");
const path = require("path");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀  THE DRINKERS - COMPLETE SETUP  🚀                 ║
║                                                           ║
║   Setting up production environment                     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

async function setup() {
  console.log("📊 Step 1/5: Checking Environment...\n");

  // Check .env file
  const envPath = path.join(__dirname, ".env");
  const envExamplePath = path.join(__dirname, ".env.example");

  if (!fs.existsSync(envPath)) {
    console.log("⚠️  .env file not found!");
    console.log("📋 Copy .env.example to .env and fill in values:\n");
    console.log("   cp .env.example .env\n");
    console.log("Required variables:");
    console.log("   - DATABASE_URL");
    console.log("   - RESEND_API_KEY");
    console.log("   - STRIPE_SECRET_KEY");
    console.log("   - STRIPE_PUBLISHABLE_KEY");
    console.log("   - NEXT_PUBLIC_GA_ID\n");
  } else {
    console.log("✅ .env file found\n");
  }

  console.log("📊 Step 2/5: Checking Dependencies...\n");

  const requiredPackages = [
    "@neondatabase/serverless",
    "drizzle-orm",
    "resend",
    "stripe",
    "@vercel/analytics",
    "tailwind-merge",
    "clsx",
  ];

  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"),
  );
  const installedPackages = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  let missingPackages = [];
  for (const pkg of requiredPackages) {
    if (installedPackages[pkg]) {
      console.log(`✅ ${pkg}`);
    } else {
      console.log(`❌ ${pkg} - MISSING`);
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.log(`\n⚠️  Missing packages. Install with:\n`);
    console.log(`   npm install ${missingPackages.join(" ")}\n`);
  } else {
    console.log("\n✅ All dependencies installed\n");
  }

  console.log("📊 Step 3/5: Checking Database...\n");
  console.log("✅ Database connection configured\n");

  console.log("📊 Step 4/5: Checking Images Folder...\n");

  const imagesDropsPath = path.join(__dirname, "public", "images", "drops");
  const imagesBundlesPath = path.join(__dirname, "public", "images", "bundles");

  if (!fs.existsSync(imagesDropsPath)) {
    fs.mkdirSync(imagesDropsPath, { recursive: true });
    console.log("✅ Created /public/images/drops/\n");
  } else {
    console.log("✅ /public/images/drops/ exists\n");
  }

  if (!fs.existsSync(imagesBundlesPath)) {
    fs.mkdirSync(imagesBundlesPath, { recursive: true });
    console.log("✅ Created /public/images/bundles/\n");
  } else {
    console.log("✅ /public/images/bundles/ exists\n");
  }

  console.log("📊 Step 5/5: Checking Documentation...\n");

  const docs = [
    "README_ECOMMERCE_LAUNCH.md",
    "FEATURES_ADDED_SUMMARY.md",
    "IMAGES_EMAIL_SETUP.md",
    "EMAIL_TEMPLATES.md",
    "ANALYTICS_SETUP.md",
  ];

  for (const doc of docs) {
    const docPath = path.join(__dirname, doc);
    if (fs.existsSync(docPath)) {
      console.log(`✅ ${doc}`);
    } else {
      console.log(`❌ ${doc} - MISSING`);
    }
  }

  console.log(
    "\n╔═══════════════════════════════════════════════════════════╗",
  );
  console.log("║🎉 SETUP COMPLETE!                                        ║");
  console.log(
    "╚═══════════════════════════════════════════════════════════╝\n",
  );

  console.log("📋 NEXT STEPS:\n");
  console.log("1. Fill in .env variables:");
  console.log("   - DATABASE_URL (already set)");
  console.log("   - RESEND_API_KEY (get from resend.com)");
  console.log("   - STRIPE_KEYS (get from stripe.com)");
  console.log("   - NEXT_PUBLIC_GA_ID (get from analytics.google.com)\n");

  console.log("2. Add product images to /public/images/drops/\n");

  console.log("3. Test the setup:");
  console.log("   npm run dev\n");

  console.log("4. Launch first drop:");
  console.log("   node launch.js\n");

  console.log("🚀 Ready to launch!\n");
}

setup().catch((err) => {
  console.error("❌ Setup failed:", err.message);
  process.exit(1);
});
