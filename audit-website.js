const { chromium } = require("playwright");

(async () => {
  console.log("🔍 Starting comprehensive website audit...\n");

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
  });

  const url = "http://localhost:3000";
  console.log(`📍 Auditing: ${url}\n`);

  // Navigate and measure
  const startTime = Date.now();
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  const loadTime = Date.now() - startTime;

  console.log("⏱️  Load time:", loadTime + "ms");
  console.log("📄 Title:", await page.title());

  // Performance metrics
  const metrics = await page.evaluate(() => {
    const perf = performance.getEntriesByType("navigation")[0];
    return {
      domContentLoaded: perf?.domContentLoadedEventEnd || "N/A",
      fullyLoaded: perf?.loadEventEnd || "N/A",
      ttfb: perf?.responseStart || "N/A",
      domInteractive: perf?.domInteractive || "N/A",
    };
  });

  console.log("\n📊 Performance Metrics:");
  console.log("  - Time to First Byte:", metrics.ttfb + "ms");
  console.log("  - DOM Interactive:", metrics.domInteractive + "ms");
  console.log("  - DOM Content Loaded:", metrics.domContentLoaded + "ms");
  console.log("  - Fully Loaded:", metrics.fullyLoaded + "ms");

  // Core Web Vitals approximation
  const vitals = await page.evaluate(() => {
    return new Promise((resolve) => {
      let lcp = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        lcp = entries[entries.length - 1]?.startTime || 0;
      }).observe({ type: "largest-contentful-paint", buffered: true });

      let fid = 0;
      new PerformanceObserver((list) => {
        fid =
          list.getEntries()[0]?.processingStart -
            list.getEntries()[0]?.startTime || 0;
      }).observe({ type: "first-input", buffered: true });

      let cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) cls += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });

      setTimeout(() => resolve({ lcp, fid, cls }), 3000);
    });
  });

  console.log("\n🎯 Core Web Vitals (approximate):");
  console.log(
    "  - LCP (Largest Contentful Paint):",
    vitals.lcp.toFixed(2) + "ms",
  );
  console.log("  - FID (First Input Delay):", vitals.fid.toFixed(2) + "ms");
  console.log("  - CLS (Cumulative Layout Shift):", vitals.cls.toFixed(3));

  // SEO checks
  console.log("\n🔎 SEO Audit:");
  const seoChecks = await page.evaluate(() => {
    return {
      hasTitle: !!document.querySelector("title"),
      titleLength: document.querySelector("title")?.textContent?.length || 0,
      hasMetaDescription: !!document.querySelector('meta[name="description"]'),
      metaDescriptionLength:
        document.querySelector('meta[name="description"]')?.content?.length ||
        0,
      hasH1: !!document.querySelector("h1"),
      h1Count: document.querySelectorAll("h1").length,
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      hasRobots: !!document.querySelector('meta[name="robots"]'),
      hasViewport: !!document.querySelector('meta[name="viewport"]'),
      hasFavicon: !!document.querySelector('link[rel="icon"]'),
      hasOgTitle: !!document.querySelector('meta[property="og:title"]'),
      hasOgDescription: !!document.querySelector(
        'meta[property="og:description"]',
      ),
      hasOgImage: !!document.querySelector('meta[property="og:image"]'),
      hasTwitterCard: !!document.querySelector('meta[name="twitter:card"]'),
      hasStructuredData: !!document.querySelector(
        'script[type="application/ld+json"]',
      ),
      lang: document.documentElement.lang || "(not set)",
    };
  });

  console.log(
    "  ✓ Has title:",
    seoChecks.hasTitle,
    `(${seoChecks.titleLength} chars)`,
  );
  console.log(
    "  ✓ Has meta description:",
    seoChecks.hasMetaDescription,
    `(${seoChecks.metaDescriptionLength} chars)`,
  );
  console.log("  ✓ Has H1:", seoChecks.hasH1, `(${seoChecks.h1Count} on page)`);
  console.log("  ✓ Has canonical URL:", seoChecks.hasCanonical);
  console.log("  ✓ Has viewport meta:", seoChecks.hasViewport);
  console.log("  ✓ Has favicon:", seoChecks.hasFavicon);
  console.log(
    "  ✓ Open Graph tags:",
    seoChecks.hasOgTitle && seoChecks.hasOgDescription && seoChecks.hasOgImage
      ? "Complete"
      : "Incomplete",
  );
  console.log("  ✓ Twitter Card:", seoChecks.hasTwitterCard);
  console.log("  ✓ Structured data (JSON-LD):", seoChecks.hasStructuredData);
  console.log("  ✓ Language attribute:", seoChecks.lang);

  // Accessibility quick checks
  console.log("\n♿ Accessibility Quick Checks:");
  const a11yChecks = await page.evaluate(() => {
    const images = document.querySelectorAll("img");
    const imagesWithoutAlt = Array.from(images).filter(
      (img) => !img.alt,
    ).length;

    const buttons = document.querySelectorAll("button");
    const buttonsWithoutAria = Array.from(buttons).filter(
      (btn) => !btn.getAttribute("aria-label") && !btn.textContent.trim(),
    ).length;

    const links = document.querySelectorAll("a");
    const linksWithoutText = Array.from(links).filter(
      (a) => !a.textContent.trim() && !a.getAttribute("aria-label"),
    ).length;

    const forms = document.querySelectorAll("form");
    const formsWithoutLabels = Array.from(forms).filter(
      (form) => !form.querySelector("label"),
    ).length;

    const colorContrastIssues = 0; // Would need proper tool

    return {
      totalImages: images.length,
      imagesWithoutAlt,
      totalButtons: buttons.length,
      buttonsWithoutAria,
      totalLinks: links.length,
      linksWithoutText,
      totalForms: forms.length,
      formsWithoutLabels,
    };
  });

  console.log(
    `  - Images without alt text: ${a11yChecks.imagesWithoutAlt}/${a11yChecks.totalImages}`,
  );
  console.log(
    `  - Buttons without accessible name: ${a11yChecks.buttonsWithoutAria}/${a11yChecks.totalButtons}`,
  );
  console.log(
    `  - Links without text: ${a11yChecks.linksWithoutText}/${a11yChecks.totalLinks}`,
  );
  console.log(
    `  - Forms without labels: ${a11yChecks.formsWithoutLabels}/${a11yChecks.totalForms}`,
  );

  // Mobile-friendly check
  console.log("\n📱 Mobile-Friendly Check:");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });

  const mobileCheck = await page.evaluate(() => {
    return {
      hasViewportMeta: !!document.querySelector('meta[name="viewport"]'),
      viewportContent:
        document.querySelector('meta[name="viewport"]')?.content || "N/A",
      isResponsive: document.documentElement.clientWidth <= 390,
      hasTouchElements:
        document.querySelectorAll("[onclick], button, a").length > 0,
    };
  });

  console.log("  ✓ Has viewport meta:", mobileCheck.hasViewportMeta);
  console.log("  ✓ Viewport content:", mobileCheck.viewportContent);
  console.log("  ✓ Responsive layout:", mobileCheck.isResponsive);
  console.log("  ✓ Touch-friendly elements:", mobileCheck.hasTouchElements);

  // Screenshots
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.screenshot({
    path: "audit-desktop.png",
    type: "jpeg",
    quality: 90,
  });
  console.log("📸 Desktop screenshot saved");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "audit-mobile.png",
    type: "jpeg",
    quality: 90,
  });
  console.log("📸 Mobile screenshot saved");

  // Summary
  console.log("\n✅ Audit completed!");
  console.log("\n📈 Summary:");
  const issues = [];
  if (!seoChecks.hasMetaDescription) issues.push("Missing meta description");
  if (seoChecks.h1Count !== 1) issues.push("Multiple H1 tags");
  if (!seoChecks.hasCanonical) issues.push("Missing canonical URL");
  if (a11yChecks.imagesWithoutAlt > 0) issues.push("Images missing alt text");
  if (a11yChecks.linksWithoutText > 0) issues.push("Links without text");

  if (issues.length === 0) {
    console.log("  🎉 No critical issues found!");
  } else {
    console.log("  ⚠️  Issues to fix:");
    issues.forEach((issue) => console.log("    - " + issue));
  }

  await browser.close();
})();
