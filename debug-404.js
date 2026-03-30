const { chromium } = require("playwright");

(async () => {
  console.log("🔍 DEBUGGING 404 ERRORS\n");

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  // Track all requests
  const requests = [];
  const failed = [];

  page.on("request", (request) => {
    requests.push({
      url: request.url(),
      type: request.resourceType(),
      method: request.method(),
    });
  });

  page.on("response", (response) => {
    if (response.status() === 404) {
      failed.push({
        url: response.url(),
        status: response.status(),
        type: response.request().resourceType(),
      });
      console.log(`❌ 404: ${response.url()}`);
    }
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log(`🐛 Console: ${msg.text()}`);
    }
  });

  console.log("Loading page...");
  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(5000);

  console.log(`\n📊 Total requests: ${requests.length}`);
  console.log(`❌ Failed requests: ${failed.length}`);

  if (failed.length > 0) {
    console.log("\n📋 FAILED RESOURCES:");
    failed.forEach((f, i) => {
      console.log(`  ${i + 1}. ${f.type.toUpperCase()} - ${f.url}`);
    });
  }

  // Check for service workers
  console.log("\n🔧 SERVICE WORKERS:");
  const swRegistrations = await page.evaluate(() => {
    return navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.length);
  });
  console.log(`Service workers registered: ${swRegistrations}`);

  // Check localStorage
  console.log("\n💾 LOCAL STORAGE:");
  const localStorage = await page.evaluate(() => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    return data;
  });
  console.log("Keys:", Object.keys(localStorage).length);
  Object.keys(localStorage).forEach((key) => {
    const value = localStorage[key];
    if (value && value.length < 100) {
      console.log(`  ${key}: ${value.substring(0, 50)}`);
    } else {
      console.log(`  ${key}: (${value?.length || 0} chars)`);
    }
  });

  // Check for Vite references
  console.log("\n⚡ VITE REFERENCES:");
  const viteRefs = await page.evaluate(() => {
    const refs = [];
    document.querySelectorAll("script, link").forEach((el) => {
      const src = el.src || el.href;
      if (
        src &&
        (src.includes("vite") ||
          src.includes("@vite") ||
          src.includes("@react-refresh"))
      ) {
        refs.push({ tag: el.tagName, src });
      }
    });
    return refs;
  });
  console.log(`Found ${viteRefs.length} Vite references`);
  viteRefs.forEach((ref) => console.log(`  ${ref.tag}: ${ref.src}`));

  await browser.close();

  console.log("\n✅ Debug complete");
})();
