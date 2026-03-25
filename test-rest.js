const https = require("https");

// Test basic connection
const url =
  "https://ep-flat-violet-am26t3rj.apirest.c-5.us-east-1.aws.neon.tech/neondb/rest/v1/";

console.log("🔍 Testing Neon REST API...\n");

// Try without auth
const req = https.request(
  url,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  },
  (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers:`, res.headers);

    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => {
      console.log("\nResponse:", data.substring(0, 500));
    });
  },
);

req.on("error", (e) => {
  console.error("Error:", e.message);
});

req.end();
