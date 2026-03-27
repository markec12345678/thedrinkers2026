#!/usr/bin/env node

/**
 * 🧪 AUTOMATED TESTING SCRIPT
 * Tests all pages and functionality automatically
 *
 * Usage: node test-all.js
 */

const https = require("https");
const http = require("http");

console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🧪  AUTOMATED TESTING  🧪                              ║
║                                                           ║
║   Testing all pages and functionality                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`);

const BASE_URL = "http://localhost:3001";

const tests = [
  {
    name: "Homepage",
    url: "/",
    expected: 200,
  },
  {
    name: "Drops Page",
    url: "/drops",
    expected: 200,
  },
  {
    name: "Bundles Page",
    url: "/bundles",
    expected: 200,
  },
  {
    name: "API - Active Drops",
    url: "/api/drops/active",
    expected: 200,
  },
  {
    name: "API - Bundles",
    url: "/api/bundles",
    expected: 200,
  },
];

async function testPage(name, url, expected) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;

    const startTime = Date.now();

    lib
      .get(`${BASE_URL}${url}`, (res) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        if (res.statusCode === expected) {
          console.log(`✅ ${name} - ${res.statusCode} (${duration}ms)`);
          resolve(true);
        } else {
          console.log(`❌ ${name} - ${res.statusCode} (expected ${expected})`);
          resolve(false);
        }
      })
      .on("error", (err) => {
        console.log(`❌ ${name} - Error: ${err.message}`);
        resolve(false);
      });
  });
}

async function runTests() {
  console.log("📊 Starting Tests...\n");

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await testPage(test.name, test.url, test.expected);
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log(
    "\n╔═══════════════════════════════════════════════════════════╗",
  );
  console.log(
    `║📊 TEST RESULTS: ${passed}/${tests.length} passed                            ║`,
  );
  console.log(
    "╚═══════════════════════════════════════════════════════════╝\n",
  );

  if (failed === 0) {
    console.log("🎉 All tests passed! Ready to launch!\n");
  } else {
    console.log(`⚠️  ${failed} test(s) failed. Check the errors above.\n`);
  }
}

runTests().catch((err) => {
  console.error("❌ Testing failed:", err.message);
  process.exit(1);
});
