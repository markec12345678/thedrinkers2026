const axios = require("axios");
require("dotenv").config();

// Neon REST API
const NEON_API_URL =
  "https://ep-fragrant-hill-amwub3uk.apirest.c-5.us-east-1.aws.neon.tech/neondb/rest/v1";

console.log("🔍 Checking Neon REST API...\n");

async function checkTables() {
  try {
    // Check if we can access tables
    const response = await axios.get(`${NEON_API_URL}/rpc/list_tables`, {
      headers: {
        apikey: process.env.NEON_API_KEY || "your-api-key",
        Authorization: `Bearer ${process.env.NEON_API_KEY || "your-api-key"}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ REST API accessible!");
    console.log("Tables:", response.data);
  } catch (err) {
    console.log("⚠️  REST API check failed, trying direct query...");

    // Try to query a table directly
    try {
      const productResponse = await axios.get(
        `${NEON_API_URL}/product?limit=5`,
        {
          headers: {
            apikey: process.env.NEON_API_KEY || "your-api-key",
            Authorization: `Bearer ${process.env.NEON_API_KEY || "your-api-key"}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log("✅ Can query product table!");
      console.log("Products found:", productResponse.data?.length || 0);
    } catch (err2) {
      console.log("❌ Cannot access via REST API");
      console.log("Error:", err2.message);
    }
  }
}

checkTables();
