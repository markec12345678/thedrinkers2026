const { chromium } = require("playwright");

(async () => {
  console.log("🔍 VERIFYING FIXES\n");

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  // Test 1: Check video optimization
  console.log("Test 1: Video optimization...");
  await page.goto("http://localhost:3000", { waitUntil: "domcontentloaded" });

  const videoElement = await page.evaluate(() => {
    const video = document.querySelector("video");
    if (!video) return null;
    return {
      src: video.querySelector("source")?.src,
      preload: video.preload,
      loading: video.loading,
      hasPoster: !!video.poster,
    };
  });
  console.log("Video element:", videoElement);
  console.log(
    videoElement?.preload === "metadata"
      ? "✅ Video preload optimized"
      : "⚠️ Video preload not optimized",
  );

  // Test 2: Check form labels
  console.log("\nTest 2: Form labels...");
  const formLabels = await page.evaluate(() => {
    const newsletterForm = document.querySelector(
      'form[aria-label="Newsletter signup form"]',
    );
    const contactForm = document.querySelector(
      'form[aria-label="Contact form"]',
    );

    const newsletterLabel = newsletterForm?.querySelector(
      'label[for="newsletter-email"]',
    );
    const newsletterInput = newsletterForm?.querySelector(
      'input[id="newsletter-email"]',
    );

    const contactEmailLabel = contactForm?.querySelector(
      'label[for="contact-email"]',
    );
    const contactEmailInput = contactForm?.querySelector(
      'input[id="contact-email"]',
    );

    return {
      newsletterForm: !!newsletterForm,
      contactForm: !!contactForm,
      newsletterLabel: !!newsletterLabel,
      newsletterInputId: !!newsletterInput,
      contactEmailLabel: !!contactEmailLabel,
      contactEmailInputId: !!contactEmailInput,
    };
  });
  console.log("Form labels:", JSON.stringify(formLabels, null, 2));
  console.log(
    formLabels.newsletterLabel && formLabels.contactEmailLabel
      ? "✅ Form labels added"
      : "⚠️ Form labels missing",
  );

  // Test 3: Check cart functionality
  console.log("\nTest 3: Cart functionality...");
  await page.goto("http://localhost:3000/merch", {
    waitUntil: "domcontentloaded",
  });

  const cartContext = await page.evaluate(() => {
    // Check if useCart is available
    const hasCartProvider = !!document.querySelector("[data-cart-provider]");
    return { hasCartProvider };
  });

  // Try to click add to cart button
  const addToCartBtn = await page.$("text=V KOŠARICO").catch(() => null);
  if (addToCartBtn) {
    console.log('✅ Found "V KOŠARICO" button');
    await addToCartBtn.click();
    await page.waitForTimeout(2000);

    const cartState = await page.evaluate(() => {
      const cartData = localStorage.getItem("drinkers-cart");
      return cartData ? JSON.parse(cartData) : null;
    });

    console.log("Cart state after click:", cartState);
    console.log(
      cartState && cartState.length > 0
        ? "✅ Cart updates correctly"
        : "⚠️ Cart may not update",
    );
  } else {
    console.log('⚠️ No "V KOŠARICO" button found');
  }

  // Test 4: Check image gallery
  console.log("\nTest 4: Image gallery...");
  const galleryImages = await page.$$eval("img", (imgs) =>
    imgs
      .filter((img) => img.src.includes("gallery"))
      .map((img) => ({
        src: img.src.split("/").pop(),
        loaded: img.complete,
        hasAlt: !!img.alt,
      })),
  );
  console.log(`Gallery images: ${galleryImages.length}`);
  const brokenImages = galleryImages.filter((img) => !img.loaded);
  console.log(
    brokenImages.length === 0
      ? "✅ All gallery images loaded"
      : `⚠️ ${brokenImages.length} broken images`,
  );

  // Test 5: Check 404 errors
  console.log("\nTest 5: 404 errors...");
  let errorCount = 0;
  const errors = [];
  page.on("response", (response) => {
    if (response.status() === 404) {
      errorCount++;
      errors.push(response.url());
    }
  });

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  console.log(`404 errors: ${errorCount}`);
  errors.forEach((url) => console.log(`  ❌ ${url}`));
  console.log(
    errorCount <= 1 ? "✅ Acceptable 404 count" : "⚠️ Too many 404 errors",
  );

  await browser.close();

  console.log("\n✅ VERIFICATION COMPLETE");
})();
