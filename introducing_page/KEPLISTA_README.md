# Képmegjelenítés - Dinamikus Elérhetőség Ellenőrzés

## Mit módosítottam?

Az oldal mostantól **csak azokat a képeket jeleníti meg**, amelyek valóban léteznek a `fenykepek/` mappában. Ez azt jelenti:

- Ha egy képnek van adatbejegyzése a `data.js`-ben, de a fénykép nem létezik, akkor **nem jelenik meg az oldalon**
- Ha új képet adokosztál a `fenykepek/` mappához, az automatikusan megjelenik az oldalon

## Hogyan működik?

### 1. **Automatikus képlista generálás**

A `generate-available-images.js` script megvizsgálja a `fenykepek/` mappát és létrehozza az `available-images.json` fájlt az alábbi szerkezettel:

```json
{
  "availableIds": [1, 2, 8, 9, 10, ...]
}
```

### 2. **Frontend betöltés**

A `script.js`-ben a `getAvailableImages()` függvény:

- Betölti az `available-images.json` fájlt
- Szűri a `data.js` GALLERY adatait csak az elérhető képekre
- Az összes renderelési funkció ezt a szűrt listát használja

## Hogyan kell használni?

### Fejlesztési módban (ajánlott):

```bash
npm run dev
```

Ez automatikusan:

1. Újra generálja az `available-images.json` fájlt
2. Indítja az http-server-t a portok 8001-en

### Vagy manuálisan:

```bash
npm run generate-images
```

Ezt akkor használd, ha új képeket adtál a `fenykepek/` mappához, és azt szeretnéd, hogy azonnal megjelenjenek az oldalon.

## Technikai részletek

- Az `available-images.json` **generált fájl**, gitignore-ban van
- Az `anya_kep.jpg`, `xx.jpg`, és `IMG_*.jpg` fájlok **kizárva** vannak a listából (ezek nem galériakép ID-k)
- Az oldal **asinkron** betöltést használ, így nem akad meg a renderelés
- Ha az `available-images.json` nem érhető el, az oldal nem jeleníti meg a képeket (fallback megoldás)

## Mit kellett módosítani?

1. ✅ `script.js` - Async/await hozzáadása, dinamikus betöltés
2. ✅ `package.json` - `generate-images` script hozzáadása
3. ✅ `generate-available-images.js` - Új Node.js script a képlista generálásához
4. ✅ `.gitignore` - `available-images.json` kizárása a version controlból

## Következő lépések (opcionális)

- Ha szervernél hosztolod az oldalt (pl. Django vagy Flask), integrálhatod a `generate-available-images.js`-t az indítási folyamatba
- Backend API-t is készítheted, amely dinamikusan visszaadja az elérhető képeket
