#!/usr/bin/env node

/**
 * 🚀 DAY 2: PRODUCTION SETUP
 * Complete production environment setup
 *
 * Usage: node day2-production-setup.js
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀  DAY 2: PRODUCTION SETUP  🚀                        ║
║                                                           ║
║   Setting up production environment                     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function setupProduction() {
  console.log("📊 Step 1/5: Creating Production Environment...\n");

  // Check if .env.production exists
  const envProdPath = path.join(__dirname, ".env.production");
  const envExamplePath = path.join(__dirname, ".env.production.example");

  if (!fs.existsSync(envProdPath)) {
    console.log("⚠️  .env.production not found!");
    console.log("📋 Created .env.production.example\n");
    console.log("Next steps:");
    console.log("1. Copy .env.production.example to .env.production");
    console.log("2. Fill in your production keys:\n");
    console.log("   - DATABASE_URL (your production database)");
    console.log("   - RESEND_API_KEY (get from https://resend.com)");
    console.log("   - STRIPE_KEYS (get from https://stripe.com)");
    console.log(
      "   - NEXT_PUBLIC_GA_ID (get from https://analytics.google.com)\n",
    );
  } else {
    console.log("✅ .env.production found\n");
  }

  console.log("📊 Step 2/5: Getting API Keys...\n");

  console.log("🔑 You need these production keys:\n");

  console.log("1. RESEND (Email):");
  console.log("   → Go to: https://resend.com");
  console.log("   → Sign up / Login");
  console.log("   → Go to API Keys section");
  console.log("   → Copy your API key\n");

  console.log("2. STRIPE (Payments):");
  console.log("   → Go to: https://stripe.com");
  console.log("   → Sign up / Login");
  console.log("   → Go to Developers > API Keys");
  console.log("   → Copy PUBLISHABLE key (pk_live_...)");
  console.log("   → Copy SECRET key (sk_live_...)\n");

  console.log("3. GOOGLE ANALYTICS (Analytics):");
  console.log("   → Go to: https://analytics.google.com");
  console.log('   → Create property for "The Drinkers"');
  console.log("   → Get Measurement ID (G-XXXXXXXXXX)\n");

  console.log("📊 Step 3/5: Vercel Deployment...\n");

  console.log("To deploy to Vercel:\n");
  console.log("1. Install Vercel CLI:");
  console.log("   npm install -g vercel\n");
  console.log("");
  console.log("2. Login to Vercel:");
  console.log("   vercel login\n");
  console.log("");
  console.log("3. Deploy:");
  console.log("   vercel --prod\n");
  console.log("");

  console.log("📊 Step 4/5: Production Checklist...\n");

  const checklist = [
    "□ Production database URL configured",
    "□ Resend API key added",
    "□ Stripe live keys added",
    "□ Google Analytics ID added",
    "□ .env.production created",
    "□ Vercel CLI installed",
    "□ Vercel project created",
    "□ Environment variables set in Vercel",
    "□ Test deployment successful",
    "□ Production URL verified",
  ];

  checklist.forEach((item) => console.log(item));

  console.log("\n📊 Step 5/5: Testing Production...\n");

  console.log("After deployment, test:\n");
  console.log("□ Homepage loads");
  console.log("□ /drops page loads");
  console.log("□ /bundles page loads");
  console.log("□ Product images load");
  console.log("□ Add to cart works");
  console.log("□ Checkout works");
  console.log("□ Stripe payment works (test mode)");
  console.log("□ Success page shows");
  console.log("□ Emails send (if configured)");
  console.log("□ Analytics track (if configured)\n");

  console.log("╔═══════════════════════════════════════════════════════════╗");
  console.log("║📋 PRODUCTION SETUP GUIDE COMPLETE!                       ║");
  console.log(
    "╚═══════════════════════════════════════════════════════════╝\n",
  );

  console.log("📋 NEXT ACTIONS:\n");
  console.log("1. Get all production keys (15 min)");
  console.log("2. Create .env.production (5 min)");
  console.log("3. Install Vercel CLI (2 min)");
  console.log("4. Deploy to Vercel (5 min)");
  console.log("5. Test production (10 min)");
  console.log("\n⏱️  Total time: ~37 minutes\n");

  rl.close();
}

setupProduction();
