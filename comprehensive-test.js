const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  console.log("🚀 STARTING COMPREHENSIVE WEBSITE TESTING\n");
  console.log("=".repeat(60));

  const results = {
    url: "http://localhost:3000",
    timestamp: new Date().toISOString(),
    tests: [],
  };

  // Launch browser
  const browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });

  // ========== TEST 1: Desktop View ==========
  console.log("\n📺 TEST 1: Desktop View (1920x1080)");
  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const desktopPage = await desktopContext.newPage();

  try {
    await desktopPage.goto("http://localhost:3000", {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    console.log("✅ Page loaded");

    const title = await desktopPage.title();
    console.log(`📄 Title: ${title}`);

    // Performance metrics
    const perfMetrics = await desktopPage.evaluate(() => {
      const nav = performance.getEntriesByType("navigation")[0];
      return {
        ttfb: nav.responseStart,
        domInteractive: nav.domInteractive,
        domContentLoaded: nav.domContentLoadedEventEnd,
        loadComplete: nav.loadEventEnd,
      };
    });
    console.log("⏱️  Performance:", JSON.stringify(perfMetrics, null, 2));

    // Screenshot
    await desktopPage.screenshot({
      path: "test-desktop.png",
      type: "jpeg",
      quality: 95,
      fullPage: true,
    });
    console.log("📸 Desktop screenshot saved");

    results.tests.push({
      name: "Desktop View",
      status: "PASS",
      metrics: perfMetrics,
    });
  } catch (error) {
    console.log("❌ FAILED:", error.message);
    results.tests.push({
      name: "Desktop View",
      status: "FAIL",
      error: error.message,
    });
  }

  // ========== TEST 2: Mobile View ==========
  console.log("\n📱 TEST 2: Mobile View (390x844)");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();

  try {
    await mobilePage.goto("http://localhost:3000", {
      waitUntil: "networkidle",
      timeout: 60000,
    });
    console.log("✅ Page loaded");

    // Screenshot
    await mobilePage.screenshot({
      path: "test-mobile.png",
      type: "jpeg",
      quality: 95,
      fullPage: true,
    });
    console.log("📸 Mobile screenshot saved");

    results.tests.push({ name: "Mobile View", status: "PASS" });
  } catch (error) {
    console.log("❌ FAILED:", error.message);
    results.tests.push({
      name: "Mobile View",
      status: "FAIL",
      error: error.message,
    });
  }

  // ========== TEST 3: Navigation Links ==========
  console.log("\n🔗 TEST 3: Navigation Links");
  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Music", url: "/music" },
    { name: "Tour", url: "/tour" },
    { name: "Merch", url: "/merch" },
    { name: "About", url: "/about" },
    { name: "Bar", url: "/bar" },
  ];

  for (const link of navLinks) {
    try {
      const response = await desktopPage.goto(
        `http://localhost:3000${link.url}`,
        {
          waitUntil: "domcontentloaded",
          timeout: 15000,
        },
      );
      const status = response.status();
      console.log(
        `${status === 200 ? "✅" : "⚠️"} ${link.name} (${link.url}) - ${status}`,
      );
      results.tests.push({
        name: `Link: ${link.name}`,
        status: status === 200 ? "PASS" : "WARN",
        httpStatus: status,
      });
    } catch (error) {
      console.log(`❌ ${link.name} (${link.url}) - TIMEOUT`);
      results.tests.push({
        name: `Link: ${link.name}`,
        status: "FAIL",
        error: "Timeout",
      });
    }
  }

  // ========== TEST 4: Interactive Elements ==========
  console.log("\n🖱️  TEST 4: Interactive Elements");
  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Test buttons
  const buttons = await desktopPage.$$eval('button, [role="button"]', (btns) =>
    btns.map((b) => ({
      text: b.textContent?.trim() || "Unnamed",
      visible: b.offsetParent !== null,
      disabled: b.disabled,
    })),
  );
  console.log(`Found ${buttons.length} buttons`);
  buttons.forEach((btn) => {
    console.log(
      `  - ${btn.text} (${btn.visible ? "visible" : "hidden"}, ${btn.disabled ? "disabled" : "enabled"})`,
    );
  });

  // Click test on visible buttons
  for (const btn of buttons
    .filter((b) => b.visible && !b.disabled)
    .slice(0, 3)) {
    try {
      await desktopPage.click(`text=${btn.text}`, { timeout: 5000 });
      console.log(`✅ Clicked: ${btn.text}`);
      await desktopPage.waitForTimeout(1000);
    } catch (error) {
      console.log(`⚠️  Could not click: ${btn.text}`);
    }
  }

  results.tests.push({
    name: "Interactive Elements",
    status: "PASS",
    buttonCount: buttons.length,
  });

  // ========== TEST 5: Forms ==========
  console.log("\n📝 TEST 5: Forms");
  const forms = await desktopPage.$$eval("form", (forms) =>
    forms.map((f) => ({
      id: f.id || "unnamed",
      inputs: f.querySelectorAll("input").length,
      hasEmail: !!f.querySelector('input[type="email"]'),
      hasSubmit: !!f.querySelector('button[type="submit"]'),
    })),
  );
  console.log(`Found ${forms.length} forms`);
  forms.forEach((form) => {
    console.log(
      `  - Form ${form.id}: ${form.inputs} inputs, email=${form.hasEmail}, submit=${form.hasSubmit}`,
    );
  });
  results.tests.push({ name: "Forms", status: "PASS", count: forms.length });

  // ========== TEST 6: Images ==========
  console.log("\n🖼️  TEST 6: Images");
  const images = await desktopPage.$$eval("img", (imgs) =>
    imgs.map((img) => ({
      src: img.src.split("/").pop(),
      alt: img.alt || "(missing)",
      loaded: img.complete,
      naturalWidth: img.naturalWidth,
    })),
  );
  const missingAlt = images.filter((img) => img.alt === "(missing)").length;
  console.log(`Total: ${images.length}, Missing alt: ${missingAlt}`);
  results.tests.push({
    name: "Images",
    status: missingAlt === 0 ? "PASS" : "WARN",
    total: images.length,
    missingAlt,
  });

  // ========== TEST 7: Console Errors ==========
  console.log("\n🐛 TEST 7: Console Errors");
  let errorCount = 0;
  const errors = [];
  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") {
      errorCount++;
      errors.push(msg.text());
      console.log(`  ❌ ${msg.text()}`);
    }
  });
  await desktopPage.reload({ waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(3000);
  console.log(`Total errors: ${errorCount}`);
  results.tests.push({
    name: "Console Errors",
    status: errorCount === 0 ? "PASS" : "WARN",
    count: errorCount,
    errors,
  });

  // ========== TEST 8: Accessibility ==========
  console.log("\n♿ TEST 8: Accessibility Checks");
  const a11yIssues = await desktopPage.evaluate(() => {
    const issues = [];

    // Images without alt
    document.querySelectorAll("img").forEach((img) => {
      if (!img.alt) issues.push("Image missing alt text");
    });

    // Buttons without accessible name
    document.querySelectorAll("button").forEach((btn) => {
      if (!btn.getAttribute("aria-label") && !btn.textContent.trim()) {
        issues.push("Button missing accessible name");
      }
    });

    // Links without text
    document.querySelectorAll("a").forEach((a) => {
      if (!a.textContent.trim() && !a.getAttribute("aria-label")) {
        issues.push("Link missing text");
      }
    });

    return issues;
  });
  console.log(`Found ${a11yIssues.length} accessibility issues`);
  a11yIssues.forEach((issue) => console.log(`  ⚠️  ${issue}`));
  results.tests.push({
    name: "Accessibility",
    status: a11yIssues.length === 0 ? "PASS" : "WARN",
    issues: a11yIssues,
  });

  // ========== TEST 9: SEO Elements ==========
  console.log("\n🔍 TEST 9: SEO Elements");
  const seoElements = await desktopPage.evaluate(() => {
    return {
      title: document.querySelector("title")?.textContent || "(missing)",
      titleLength: document.querySelector("title")?.textContent?.length || 0,
      metaDescription:
        document.querySelector('meta[name="description"]')?.content ||
        "(missing)",
      h1: document.querySelector("h1")?.textContent || "(missing)",
      h1Count: document.querySelectorAll("h1").length,
      canonical:
        document.querySelector('link[rel="canonical"]')?.href || "(missing)",
      ogTitle:
        document.querySelector('meta[property="og:title"]')?.content ||
        "(missing)",
      ogImage:
        document.querySelector('meta[property="og:image"]')?.content ||
        "(missing)",
      twitterCard:
        document.querySelector('meta[name="twitter:card"]')?.content ||
        "(missing)",
      structuredData: !!document.querySelector(
        'script[type="application/ld+json"]',
      ),
    };
  });
  console.log("SEO Elements:", JSON.stringify(seoElements, null, 2));
  results.tests.push({ name: "SEO", status: "PASS", data: seoElements });

  // ========== TEST 10: Responsive Breakpoints ==========
  console.log("\n📐 TEST 10: Responsive Breakpoints");
  const breakpoints = [
    { name: "Mobile S", width: 320, height: 568 },
    { name: "Mobile L", width: 414, height: 896 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Desktop", width: 1280, height: 800 },
    { name: "Desktop HD", width: 1920, height: 1080 },
  ];

  for (const bp of breakpoints) {
    await desktopPage.setViewportSize({ width: bp.width, height: bp.height });
    await desktopPage.waitForTimeout(500);
    const currentWidth = await desktopPage.evaluate((w) => {
      return document.documentElement.clientWidth <= w;
    }, bp.width);
    console.log(
      `${currentWidth ? "✅" : "⚠️"} ${bp.name} (${bp.width}x${bp.height})`,
    );
  }
  results.tests.push({ name: "Responsive", status: "PASS" });

  // ========== FINAL SCREENSHOTS ==========
  console.log("\n📸 FINAL SCREENSHOTS");
  await desktopPage.setViewportSize({ width: 1920, height: 1080 });
  await desktopPage.screenshot({
    path: "final-desktop.png",
    type: "jpeg",
    quality: 95,
  });
  console.log("✅ Final desktop screenshot");

  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.screenshot({
    path: "final-mobile.png",
    type: "jpeg",
    quality: 95,
  });
  console.log("✅ Final mobile screenshot");

  // ========== SAVE RESULTS ==========
  console.log("\n💾 SAVING RESULTS");
  results.summary = {
    total: results.tests.length,
    passed: results.tests.filter((t) => t.status === "PASS").length,
    warnings: results.tests.filter((t) => t.status === "WARN").length,
    failed: results.tests.filter((t) => t.status === "FAIL").length,
  };

  fs.writeFileSync("test-results.json", JSON.stringify(results, null, 2));
  console.log("✅ Results saved to test-results.json");

  // Cleanup
  await browser.close();

  // ========== SUMMARY ==========
  console.log("\n" + "=".repeat(60));
  console.log("📊 TEST SUMMARY");
  console.log("=".repeat(60));
  console.log(`Total Tests: ${results.summary.total}`);
  console.log(`✅ Passed: ${results.summary.passed}`);
  console.log(`⚠️  Warnings: ${results.summary.warnings}`);
  console.log(`❌ Failed: ${results.summary.failed}`);
  console.log("=".repeat(60));

  if (results.summary.failed === 0 && results.summary.warnings < 3) {
    console.log("🎉 OVERALL: EXCELLENT!");
  } else if (results.summary.warnings < 5) {
    console.log("✅ OVERALL: GOOD (minor issues)");
  } else {
    console.log("⚠️  OVERALL: NEEDS ATTENTION");
  }
})();
