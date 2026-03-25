// Tour Dates Example
const { execSync } = require("child_process");

execSync(
  'node magic-use.js create-ui "Create a tour dates list with 15 European concerts, venue info, and buy tickets buttons"',
  {
    stdio: "inherit",
  },
);
