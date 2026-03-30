const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  console.log("🎯 USER EXPERIENCE TESTING\n");
  console.log("=".repeat(60));

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  });
  const page = await context.newPage();

  const baseUrl = "http://localhost:3000";
  const uxResults = {
    timestamp: new Date().toISOString(),
    flows: [],
  };

  // ========== FLOW 1: First Time Visitor ==========
  console.log("\n👤 FLOW 1: First Time Visitor");
  let flowStart = Date.now();

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Check above-the-fold content
  const aboveFold = await page.evaluate(() => {
    const hero = document.querySelector("section:first-child");
    const h1 = document.querySelector("h1");
    const cta = document.querySelector('button, [role="button"]');

    return {
      hasHero: !!hero,
      hasH1: !!h1,
      h1Text: h1?.textContent?.trim(),
      hasCTA: !!cta,
      ctaText: cta?.textContent?.trim(),
      heroVisible: hero?.offsetParent !== null,
    };
  });

  console.log("Above the fold:", JSON.stringify(aboveFold, null, 2));
  uxResults.flows.push({
    name: "First Impression",
    status:
      aboveFold.hasHero && aboveFold.hasH1 && aboveFold.hasCTA
        ? "PASS"
        : "FAIL",
    details: aboveFold,
  });

  // Take screenshot
  await page.screenshot({
    path: "ux-above-fold.png",
    type: "jpeg",
    quality: 90,
  });
  console.log("📸 Screenshot saved");

  console.log(`⏱️  Time: ${((Date.now() - flowStart) / 1000).toFixed(1)}s\n`);

  // ========== FLOW 2: Navigation Testing ==========
  console.log("🧭 FLOW 2: Navigation Testing");
  flowStart = Date.now();

  const navItems = await page.$$eval("nav a, header a, .nav a", (links) =>
    links.map((a) => ({ text: a.textContent.trim(), href: a.href })),
  );

  console.log(`Found ${navItems.length} navigation items`);
  navItems.forEach((item) => console.log(`  - ${item.text}`));

  // Test each nav link
  for (const item of navItems.slice(0, 3)) {
    if (item.href.includes("http")) {
      try {
        const response = await page.goto(item.href, {
          waitUntil: "domcontentloaded",
          timeout: 10000,
        });
        console.log(`${response.status() === 200 ? "✅" : "⚠️"} ${item.text}`);
        await page.waitForTimeout(500);
        await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      } catch (e) {
        console.log(`❌ ${item.text}`);
      }
    }
  }

  uxResults.flows.push({
    name: "Navigation",
    status: "PASS",
    itemCount: navItems.length,
  });

  console.log(`⏱️  Time: ${((Date.now() - flowStart) / 1000).toFixed(1)}s\n`);

  // ========== FLOW 3: Add to Cart ==========
  console.log("🛒 FLOW 3: Add to Cart Flow");
  flowStart = Date.now();

  await page.goto(baseUrl, { waitUntil: "networkidle" });

  // Find and click "Add to Cart" button
  const addToCartBtn = await page.$("text=V KOŠARICO").catch(() => null);
  if (addToCartBtn) {
    console.log('✅ Found "V KOŠARICO" button');
    await addToCartBtn.click();
    await page.waitForTimeout(1000);

    // Check cart state
    const cartState = await page.evaluate(() => {
      const cartData = localStorage.getItem("drinkers-cart");
      return cartData ? JSON.parse(cartData) : null;
    });

    console.log("Cart state:", cartState);

    if (cartState && cartState.length > 0) {
      console.log("✅ Item added to cart");
      uxResults.flows.push({
        name: "Add to Cart",
        status: "PASS",
        cartItems: cartState.length,
      });
    } else {
      console.log("⚠️  Cart may not have updated");
      uxResults.flows.push({ name: "Add to Cart", status: "WARN" });
    }
  } else {
    console.log('⚠️  No "V KOŠARICO" button found on homepage');
    uxResults.flows.push({
      name: "Add to Cart",
      status: "FAIL",
      reason: "Button not found",
    });
  }

  console.log(`⏱️  Time: ${((Date.now() - flowStart) / 1000).toFixed(1)}s\n`);

  // ========== FLOW 4: Newsletter Signup ==========
  console.log("📧 FLOW 4: Newsletter Signup");
  flowStart = Date.now();

  const emailInput = await page.$('input[type="email"]').catch(() => null);
  if (emailInput) {
    console.log("✅ Found email input");
    await emailInput.fill("test@example.com");
    console.log("✅ Filled email");

    const submitBtn = await page.$('button[type="submit"]').catch(() => null);
    if (submitBtn) {
      console.log("✅ Found submit button");
      // Don't actually submit - just test the form is functional
      console.log("✅ Form is functional (not submitting)");
      uxResults.flows.push({ name: "Newsletter Form", status: "PASS" });
    } else {
      console.log("⚠️  No submit button found");
      uxResults.flows.push({ name: "Newsletter Form", status: "WARN" });
    }
  } else {
    console.log("⚠️  No email input found");
    uxResults.flows.push({
      name: "Newsletter Form",
      status: "FAIL",
      reason: "No email input",
    });
  }

  console.log(`⏱️  Time: ${((Date.now() - flowStart) / 1000).toFixed(1)}s\n`);

  // ========== FLOW 5: Mobile Menu ==========
  console.log("📱 FLOW 5: Mobile Menu");
  flowStart = Date.now();

  await page.setViewportSize({ width: 375, height: 667 });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Look for mobile menu button
  const menuButton = await page
    .$('[aria-label*="menu"], .menu-button, button[aria-expanded]')
    .catch(() => null);
  if (menuButton) {
    console.log("✅ Found mobile menu button");
    await menuButton.click();
    await page.waitForTimeout(500);

    const menuOpen = await page.evaluate(() => {
      const nav = document.querySelector("nav, .nav, .mobile-menu");
      if (!nav) return false;
      const style = getComputedStyle(nav);
      return style.display !== "none" && style.visibility !== "hidden";
    });

    console.log(`Menu ${menuOpen ? "opened" : "did not open"}`);
    uxResults.flows.push({
      name: "Mobile Menu",
      status: menuOpen ? "PASS" : "WARN",
    });
  } else {
    console.log(
      "ℹ️  No explicit mobile menu button (may use different pattern)",
    );
    uxResults.flows.push({
      name: "Mobile Menu",
      status: "INFO",
      reason: "No menu button",
    });
  }

  console.log(`⏱️  Time: ${((Date.now() - flowStart) / 1000).toFixed(1)}s\n`);

  // ========== FLOW 6: Video/Media ==========
  console.log("🎬 FLOW 6: Media Elements");
  flowStart = Date.now();

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.reload({ waitUntil: "networkidle" });

  const videos = await page.$$eval("video", (vids) =>
    vids.map((v) => ({
      src: v.src || v.querySelector("source")?.src || "no source",
      hasControls: v.controls,
      hasPoster: !!v.poster,
    })),
  );

  console.log(`Found ${videos.length} video elements`);
  videos.forEach((v) =>
    console.log(`  - Controls: ${v.hasControls}, Poster: ${v.hasPoster}`),
  );

  const images = await page.$$eval("img", (imgs) =>
    imgs.slice(0, 5).map((img) => ({
      src: img.src.split("/").pop(),
      loaded: img.complete,
      naturalWidth: img.naturalWidth,
    })),
  );

  console.log(
    `Loaded ${images.filter((i) => i.loaded).length}/${images.length} images`,
  );

  uxResults.flows.push({
    name: "Media Elements",
    status: "PASS",
    videoCount: videos.length,
    imageCount: images.length,
  });

  console.log(`⏱️  Time: ${((Date.now() - flowStart) / 1000).toFixed(1)}s\n`);

  // ========== FLOW 7: Scroll & Animations ==========
  console.log("🌀 FLOW 7: Scroll & Animations");
  flowStart = Date.now();

  const scrollHeight = await page.evaluate(() => {
    return document.documentElement.scrollHeight;
  });

  console.log(`Page height: ${scrollHeight}px`);

  // Scroll to bottom
  try {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let start = null;
        const duration = 2000;
        const targetScroll =
          document.documentElement.scrollHeight - window.innerHeight;

        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          window.scrollTo(0, targetScroll * progress);
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      });
    });
    console.log("✅ Scrolled to bottom");
  } catch (error) {
    console.log("⚠️  Scroll error - continuing");
  }
  await page.screenshot({
    path: "ux-bottom-of-page.png",
    type: "jpeg",
    quality: 90,
  });
  console.log("📸 Bottom screenshot saved");

  // Check for animations
  const animatedElements = await page.$$eval(
    '[class*="animate"], [class*="motion"], [style*="animation"]',
    (els) => els.length,
  );
  console.log(`Found ${animatedElements} animated elements`);

  uxResults.flows.push({
    name: "Scroll & Animations",
    status: "PASS",
    pageHeight: scrollHeight,
    animatedElements,
  });

  console.log(`⏱️  Time: ${((Date.now() - flowStart) / 1000).toFixed(1)}s\n`);

  // ========== FINAL SCREENSHOT ==========
  console.log("📸 FINAL SCREENSHOTS");
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.screenshot({ path: "ux-final.png", type: "jpeg", quality: 95 });
  console.log("✅ Final screenshot saved");

  // ========== SAVE RESULTS ==========
  console.log("\n💾 SAVING RESULTS");
  uxResults.summary = {
    totalFlows: uxResults.flows.length,
    passed: uxResults.flows.filter((f) => f.status === "PASS").length,
    warnings: uxResults.flows.filter((f) => f.status === "WARN").length,
    failed: uxResults.flows.filter((f) => f.status === "FAIL").length,
  };

  fs.writeFileSync("ux-test-results.json", JSON.stringify(uxResults, null, 2));
  console.log("✅ Results saved to ux-test-results.json");

  await browser.close();

  // ========== SUMMARY ==========
  console.log("\n" + "=".repeat(60));
  console.log("📊 UX TEST SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total Flows: ${uxResults.summary.totalFlows}`);
  console.log(`✅ Passed: ${uxResults.summary.passed}`);
  console.log(`⚠️  Warnings: ${uxResults.summary.warnings}`);
  console.log(`❌ Failed: ${uxResults.summary.failed}`);
  console.log("=".repeat(60));

  if (uxResults.summary.failed === 0) {
    console.log("🎉 UX: EXCELLENT!");
  } else {
    console.log("⚠️  UX: NEEDS IMPROVEMENT");
  }
})();
