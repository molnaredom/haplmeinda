const fs = require("fs");

// Olvassuk be a fájlt
let content = fs.readFileSync("data.js", "utf8");

// Függvény az ár kalkulálásához méret és anyag alapján
function calculatePrice(size, technique) {
  // Számoljuk ki a képméretet (terület)
  let area = 0;

  if (size.includes("x")) {
    const parts = size.split("x").map((x) => parseFloat(x.trim()));
    if (parts.length === 2) {
      area = parts[0] * parts[1];
    }
  } else {
    const dim = parseFloat(size);
    area = dim * dim;
  }

  // Alapár terület alapján
  let basePrice = 30000 + area * 150; // 150Ft per négyzetcentiméter

  // Szorzó az anyag alapján
  let multiplier = 1;
  switch (technique.toLowerCase().trim()) {
    case "tűzzománc":
      multiplier = 1.3;
      break;
    case "porcelán":
      multiplier = 1.2;
      break;
    case "fa":
      multiplier = 1.1;
      break;
    case "vászon":
      multiplier = 1.15;
      break;
    case "üveg":
      multiplier = 1.25;
      break;
    case "rajzlap":
      multiplier = 0.9;
      break;
    case "...":
      multiplier = 1;
      break;
  }

  // Végső ár
  let finalPrice = basePrice * multiplier;

  // Korlát: 30000-100000 közötti
  finalPrice = Math.max(30000, Math.min(100000, finalPrice));

  // Kerekítés 1000Ft-ra
  finalPrice = Math.round(finalPrice / 1000) * 1000;

  return finalPrice;
}

// Regex-szel cseréljük az árakat
const items = [];
const priceRegex = /price:\s*(\d+)/g;

// Gyűjtjük az összes price előfordulást és az előzetes információkat
let match;
while ((match = priceRegex.exec(content)) !== null) {
  items.push({ index: match.index, price: match[1] });
}

// Az objektumok sorrendben történő extrahálása
const objectRegex =
  /{\s*id:\s*(\d+)[\s\S]*?size:\s*"([^"]*)"\s*,[\s\S]*?technique:\s*"([^"]*)"/g;
const objects = [];
while ((match = objectRegex.exec(content)) !== null) {
  objects.push({
    id: parseInt(match[1]),
    size: match[2],
    technique: match[3],
    priceIndex: match.index,
  });
}

// Új árakat számítunk ki
const newPrices = objects.map((obj) => calculatePrice(obj.size, obj.technique));

// Helyettesítjük az árakat visszafelé haladva (hogy az indexek ne változzon)
let newContent = content;
let offset = 0;

// Kicseréljük az árakat
for (let i = 0; i < objects.length; i++) {
  const oldPrice = calculatePrice(objects[i].size, objects[i].technique);
  const newPrice = newPrices[i];

  // Keresünk egy price: szöveget az objektum után
  const searchStart = objects[i].priceIndex;
  const searchText = content.substring(searchStart, searchStart + 1000);
  const priceMatch = searchText.match(/price:\s*(\d+)/);

  if (priceMatch) {
    const oldPriceStr = "price: " + priceMatch[1];
    const newPriceStr = "price: " + newPrice;
    newContent = newContent.replace(oldPriceStr, newPriceStr);
  }
}

fs.writeFileSync("data.js", newContent, "utf8");

console.log("✅ Képek árai sikeresen frissítve!");
console.log("Összesen: " + objects.length + " kép");
console.log(
  "Átlag ár: " +
    Math.round(newPrices.reduce((a, b) => a + b, 0) / newPrices.length) +
    " Ft"
);
console.log("Min ár: " + Math.min(...newPrices) + " Ft");
console.log("Max ár: " + Math.max(...newPrices) + " Ft");

// Néhány példa
console.log("\nPéldák:");
for (let i = 0; i < Math.min(5, objects.length); i++) {
  console.log(
    "- ID " +
      objects[i].id +
      " (" +
      objects[i].size +
      " cm, " +
      objects[i].technique +
      "): " +
      newPrices[i] +
      " Ft"
  );
}
