// Create admin user for Better Auth
require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function createAdmin() {
  console.log("👤 Creating admin user...\n");

  const email = "admin@thedrinkers.si";
  const password = "admin123"; // Change this!
  const name = "Admin User";

  try {
    // Hash password (Better Auth uses bcrypt)
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    // First create user
    const userId = await sql`
      INSERT INTO "user" (id, name, email, email_verified, created_at, updated_at)
      VALUES (gen_random_uuid(), ${name}, ${email}, false, NOW(), NOW())
      RETURNING id
    `;

    const userIdValue = userId[0].id;

    // Then create account with password
    await sql`
      INSERT INTO account (id, user_id, provider_id, provider_account_id, password, created_at, updated_at)
      VALUES (gen_random_uuid(), ${userIdValue}, 'credential', ${email}, ${hashedPassword}, NOW(), NOW())
    `;

    console.log("✅ Admin user created!");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log("\n⚠️  Change the password after first login!\n");
  } catch (error) {
    console.error("❌ Failed to create admin:", error.message);
  }
}

createAdmin().catch(console.error);
