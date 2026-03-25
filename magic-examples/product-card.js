// Product Card Example
const { execSync } = require("child_process");

execSync(
  'node magic-use.js create-ui "Create a product card for The Drinkers merch store with image, price, size selector, and add to cart button"',
  {
    stdio: "inherit",
  },
);
