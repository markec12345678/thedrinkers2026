const https = require("https");

const API_KEY =
  "napi_7yqb1p86gegtpqukk3nffdey0qvqk80ufu07uqcftzb393o011n9r1fo0nwl2kes";

console.log("🔍 Testing Neon API key...\n");

// Test 1: Get tables
const options = {
  hostname: "ep-flat-violet-am26t3rj.apirest.c-5.us-east-1.aws.neon.tech",
  port: 443,
  path: "/neondb/rest/v1/user?select=count",
  method: "GET",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Accept: "application/json",
    Prefer: "return=representation",
  },
};

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, JSON.stringify(res.headers, null, 2));

  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => {
    console.log("\nResponse:", data);

    if (res.statusCode === 200) {
      console.log("\n✅ API KEY WORKS!");
    } else if (res.statusCode === 404) {
      console.log("\n⚠️  Table not found (expected)");
    } else {
      console.log("\n❌ API key may not work");
    }
  });
});

req.on("error", (e) => {
  console.error("Error:", e.message);
});

req.end();
