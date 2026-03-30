const { chromium } = require("playwright");

(async () => {
  console.log("🧪 Starting Interactive Testing...\n");

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
  });
  const page = await context.newPage();

  const baseUrl = "http://localhost:3000";

  // Test 1: Homepage loads
  console.log("Test 1: Homepage loads...");
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  console.log("✅ Homepage loaded\n");

  // Test 2: Check navigation links
  console.log("Test 2: Testing navigation links...");
  const navLinks = await page.$$eval("nav a, header a, .nav a", (links) =>
    links.map((a) => ({ text: a.textContent.trim(), href: a.href })),
  );
  console.log(`Found ${navLinks.length} navigation links`);
  navLinks.forEach((link) =>
    console.log(`  - ${link.text || "Link"}: ${link.href}`),
  );
  console.log("");

  // Test 3: Click on main CTA buttons
  console.log("Test 3: Testing CTA buttons...");
  const buttons = await page.$$eval(
    'button, .button, [role="button"]',
    (btns) =>
      btns.map((b) => ({
        text: b.textContent?.trim() || "Button",
        visible: b.offsetParent !== null,
      })),
  );
  console.log(`Found ${buttons.length} buttons`);
  buttons.forEach((btn) =>
    console.log(`  - ${btn.text} (${btn.visible ? "visible" : "hidden"})`),
  );
  console.log("");

  // Test 4: Test mobile menu
  console.log("Test 4: Testing mobile menu...");
  await page.setViewportSize({ width: 375, height: 667 });
  const mobileMenuButton = await page.$(
    '[aria-label="Toggle menu"], .menu-button, button[aria-expanded]',
  );
  if (mobileMenuButton) {
    await mobileMenuButton.click();
    await page.waitForTimeout(500);
    const menuOpen = await page
      .$eval(
        '.nav, .mobile-menu, [aria-label="Menu"]',
        (el) =>
          el.offsetParent !== null || getComputedStyle(el).display !== "none",
      )
      .catch(() => false);
    console.log(
      menuOpen ? "✅ Mobile menu opens" : "⚠️  Mobile menu may have issues",
    );
  } else {
    console.log(
      "ℹ️  No mobile menu button found (may use different implementation)",
    );
  }
  console.log("");

  // Test 5: Reset to desktop and test forms
  console.log("Test 5: Testing forms...");
  await page.setViewportSize({ width: 1600, height: 900 });
  const forms = await page.$$eval("form", (forms) =>
    forms.map((f) => ({
      id: f.id || "no-id",
      hasEmail: !!f.querySelector('input[type="email"]'),
      hasSubmit: !!f.querySelector(
        'button[type="submit"], input[type="submit"]',
      ),
    })),
  );
  console.log(`Found ${forms.length} forms`);
  forms.forEach((form) => {
    console.log(
      `  - Form ${form.id}: Email=${form.hasEmail}, Submit=${form.hasSubmit}`,
    );
  });
  console.log("");

  // Test 6: Check for console errors
  console.log("Test 6: Checking for console errors...");
  let errorCount = 0;
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      errorCount++;
      console.log(`  ❌ ${msg.text()}`);
    }
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  console.log(
    errorCount === 0
      ? "✅ No console errors"
      : `⚠️  ${errorCount} console error(s) found`,
  );
  console.log("");

  // Test 7: Test responsive images
  console.log("Test 7: Testing responsive images...");
  const images = await page.$$eval("img", (imgs) =>
    imgs.map((img) => ({
      src: img.src.split("/").pop(),
      hasSrcset: !!img.srcset,
      hasLoading: !!img.loading,
      loading: img.loading || "eager",
    })),
  );
  const lazyImages = images.filter((img) => img.loading === "lazy");
  console.log(`Total images: ${images.length}`);
  console.log(`Lazy loaded: ${lazyImages.length}`);
  console.log(`With srcset: ${images.filter((img) => img.hasSrcset).length}`);
  console.log("");

  // Test 8: Check animations
  console.log("Test 8: Checking animations...");
  const animatedElements = await page.$$eval(
    '[class*="animate"], [class*="motion"], [class*="transition"]',
    (els) => els.length,
  );
  console.log(`Found ${animatedElements} elements with animations/transitions`);
  console.log("");

  // Test 9: Test internal links
  console.log("Test 9: Testing sample internal links...");
  const internalLinks = await page.$$eval('a[href^="/"]', (links) =>
    links.slice(0, 5).map((a) => a.href),
  );
  for (const link of internalLinks) {
    try {
      const response = await page.goto(link, {
        waitUntil: "domcontentloaded",
        timeout: 10000,
      });
      console.log(`${response?.status() === 200 ? "✅" : "⚠️"} ${link}`);
    } catch (e) {
      console.log(`❌ ${link} - ${e.message}`);
    }
  }
  console.log("");

  // Test 10: Go back to homepage
  console.log("Test 10: Returning to homepage...");
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  console.log("✅ Back on homepage\n");

  // Final screenshot
  await page.screenshot({
    path: "test-complete.png",
    type: "jpeg",
    quality: 90,
  });
  console.log("📸 Final screenshot saved\n");

  console.log("✅ All interactive tests completed!");

  await browser.close();
})();
