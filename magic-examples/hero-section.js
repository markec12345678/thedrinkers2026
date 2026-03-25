// Hero Section Example
const { execSync } = require("child_process");

execSync(
  'node magic-use.js create-ui "Create a hero section for The Drinkers band website with dark theme, band logo, and two CTA buttons"',
  {
    stdio: "inherit",
  },
);
