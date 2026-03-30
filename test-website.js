const { chromium } = require("playwright");

(async () => {
  console.log("🚀 Starting browser...");
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100,
  });

  console.log("📖 Opening page...");
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
  });

  console.log("🌐 Navigating to http://localhost:3000...");
  try {
    await page.goto("http://localhost:3000", {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    console.log("✅ Page loaded!");
    console.log("📄 Title:", await page.title());
    console.log("🔗 URL:", page.url());

    // Get H1
    const h1 = await page.textContent("h1").catch(() => "No H1 found");
    console.log("📝 H1:", h1);

    // Get meta description
    const metaDesc = await page
      .getAttribute('meta[name="description"]', "content")
      .catch(() => "No meta description");
    console.log("📋 Meta description:", metaDesc);

    // Screenshot
    await page.screenshot({
      path: "screenshot-homepage.png",
      fullPage: false,
      type: "jpeg",
      quality: 90,
    });
    console.log("📸 Screenshot saved to screenshot-homepage.png");

    // Full page screenshot
    await page.screenshot({
      path: "screenshot-fullpage.png",
      fullPage: true,
      type: "jpeg",
      quality: 90,
    });
    console.log("📸 Full page screenshot saved to screenshot-fullpage.png");

    // Check for errors in console
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        console.log("❌ Console error:", msg.text());
      }
    });

    // Check for broken links
    console.log("\n🔍 Checking for broken links...");
    const links = await page.$$eval("a[href]", (links) =>
      links.map((a) => a.href),
    );
    console.log(`Found ${links.length} links`);

    // Get all images and check for alt text
    console.log("\n🖼️  Checking images...");
    const images = await page.$$eval("img", (imgs) =>
      imgs.map((img) => ({
        src: img.src,
        alt: img.alt || "(missing alt)",
      })),
    );
    const missingAlt = images.filter((img) => img.alt === "(missing alt)");
    console.log(`Total images: ${images.length}`);
    console.log(`Missing alt text: ${missingAlt.length}`);

    console.log("\n✅ All tests completed!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }

  await browser.close();
  console.log("👋 Browser closed");
})();
