// Generate placeholder images for albums
const fs = require("fs");
const path = require("path");
const https = require("https");

const albums = [
  { name: "lepi-in-trezni", year: "1995", color: "dc143c" },
  { name: "zeja", year: "1997", color: "8b4513" },
  { name: "pivolucija", year: "1999", color: "f4a460" },
  { name: "de-best-od", year: "2001", color: "4169e1" },
  { name: "prohibicija", year: "2003", color: "8b0000" },
  { name: "hajdi", year: "2007", color: "2e8b57" },
  { name: "recidiv", year: "2014", color: "4b0082" },
];

const outputDir = path.join(__dirname, "public", "images", "albums");

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log("🎨 Generating album placeholders...\n");

albums.forEach((album, index) => {
  const filename = `${album.name}.jpg`;
  const filepath = path.join(outputDir, filename);
  const url = `https://via.placeholder.com/400x400/${album.color}/ffffff?text=The%20Drinkers%0A${encodeURIComponent(album.name)}%0A${album.year}`;

  console.log(`[${index + 1}/${albums.length}] Downloading ${filename}...`);

  https
    .get(url, (response) => {
      const chunks = [];

      response.on("data", (chunk) => {
        chunks.push(chunk);
      });

      response.on("end", () => {
        fs.writeFileSync(filepath, Buffer.concat(chunks));
        console.log(`✅ ${filename} saved!`);

        if (index === albums.length - 1) {
          console.log("\n🎉 All placeholders generated!");
          console.log(`📁 Saved to: ${outputDir}`);
        }
      });
    })
    .on("error", (err) => {
      console.error(`❌ Error downloading ${filename}:`, err.message);
    });
});

// Also create gallery placeholders
const galleryDir = path.join(__dirname, "public", "images", "gallery");
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

const galleryImages = [
  { name: "live-001", color: "9932cc" },
  { name: "live-002", color: "8b008b" },
  { name: "live-003", color: "9400d3" },
];

setTimeout(() => {
  console.log("\n📸 Generating gallery placeholders...\n");

  galleryImages.forEach((img, index) => {
    const filename = `${img.name}.jpg`;
    const filepath = path.join(galleryDir, filename);
    const url = `https://via.placeholder.com/800x600/${img.color}/ffffff?text=The%20Drinkers%0ALive%20${index + 1}`;

    console.log(
      `[${index + 1}/${galleryImages.length}] Downloading ${filename}...`,
    );

    https
      .get(url, (response) => {
        const chunks = [];

        response.on("data", (chunk) => {
          chunks.push(chunk);
        });

        response.on("end", () => {
          fs.writeFileSync(filepath, Buffer.concat(chunks));
          console.log(`✅ ${filename} saved!`);

          if (index === galleryImages.length - 1) {
            console.log("\n🎉 All gallery placeholders generated!");
            console.log(`📁 Saved to: ${galleryDir}`);
            console.log("\n✨ Done! Restart dev server to see changes.");
          }
        });
      })
      .on("error", (err) => {
        console.error(`❌ Error downloading ${filename}:`, err.message);
      });
  });
}, 2000);
