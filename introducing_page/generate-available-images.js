import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Képkönyvtár elérési útja
const imageDir = path.join(__dirname, "fenykepek");

// Az összes fájl beolvasása a mappából
const files = fs.readdirSync(imageDir);

// Csak a .jpg fájlok kinyerése, és az ID-k kinyerése
const availableIds = files
  .filter(
    (file) =>
      file.endsWith(".jpg") &&
      file !== "anya_kep.jpg" &&
      file !== "xx.jpg" &&
      file !== "IMG_20221217_122518.jpg"
  )
  .map((file) => {
    const id = parseInt(file.replace(".jpg", ""));
    return !isNaN(id) ? id : null;
  })
  .filter((id) => id !== null)
  .sort((a, b) => a - b);

// Az eredmény mentése
const outputPath = path.join(__dirname, "available-images.json");
fs.writeFileSync(outputPath, JSON.stringify({ availableIds }, null, 2));

console.log(
  `✓ Generated available-images.json with ${availableIds.length} images`
);
console.log(`Available IDs: ${availableIds.join(", ")}`);
