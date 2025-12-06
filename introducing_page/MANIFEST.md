# 📚 Dokumentáció és Fájlok Indexe

## 🎯 Kezdjél az alábbiak közül:

### 1️⃣ **Gyors kezdés**: [`QUICKSTART.md`](QUICKSTART.md)

- 📌 **Mit csináll az oldal?**
- 📌 **30 másodperces telepítés**
- 📌 **Gyakori problémák**
- ⏱️ **5-10 perc olvasás**

### 2️⃣ **Beállítás & Testreszabás**: [`SETUP.md`](SETUP.md)

- ✏️ **Szövegek szerkesztése**
- 🎨 **Dizájn módosítása**
- 🔗 **Linkek és formok**
- 📊 **SEO optimalizálás**
- ⏱️ **20-30 perc olvasás**

### 3️⃣ **Rackhostos Telepítés**: [`DEPLOYMENT.md`](DEPLOYMENT.md)

- 🚀 **FTP-vel feltöltés**
- ⚙️ **Szerver beállítások**
- 🔍 **Ellenőrzési lista**
- ⏱️ **15 perc olvasás**

### 4️⃣ **Rackhostos Specifikus**: [`HOSTING.md`](HOSTING.md)

- 🌐 **CPanel beállítások**
- ⚡ **Gzip & cache**
- 🆘 **Problémamegoldás**
- ⏱️ **10-15 perc olvasás**

### 5️⃣ **Teljes Dokumentáció**: [`README.md`](README.md)

- 📖 **Részletes leírás**
- 🛠️ **Összes funkció**
- 💾 **Tartalom szerkesztése**
- ⏱️ **20 perc olvasás**

### 6️⃣ **Képek Inventory**: [`IMAGES.md`](IMAGES.md)

- 📸 **50+ kép listája**
- 🔍 **Kategóriák**
- 📋 **Metaadatok**
- ⏱️ **5 perc olvasás**

---

## 📂 Projekt Fájlok

### HTML/CSS/JS

| Fájl           | Tartalom            | Módosítható |
| -------------- | ------------------- | ----------- |
| **index.html** | Az oldal szerkezete | ✅ Igen     |
| **styles.css** | Design és szín      | ✅ Igen     |
| **script.js**  | Interaktivitás      | ⚠️ Vigyázat |
| **data.js**    | Képadatok (CSV-ből) | ✅ Igen     |
| **.htaccess**  | Szerver beállítások | ⚠️ Vigyázat |

### Dokumentáció

| Fájl                 | Célja                             |
| -------------------- | --------------------------------- |
| **00_KEZDD_ITT.txt** | Email sablon az elinduláshoz      |
| **QUICKSTART.md**    | 5 perces rövid útmutató           |
| **README.md**        | Teljes dokumentáció               |
| **SETUP.md**         | Testreszabási útmutató            |
| **DEPLOYMENT.md**    | Rackhostos telepítés              |
| **HOSTING.md**       | Rackhostos specifikus beállítások |
| **IMAGES.md**        | Képek listája                     |
| **MANIFEST.md**      | Ez a fájl                         |
| **.gitignore**       | Git konfigurációs                 |
| **package.json**     | NPM konfigurációs                 |

### Képek

| Mappa          | Tartalom                |
| -------------- | ----------------------- |
| **fenykepek/** | 61 JPG kép a galériához |

---

## 🚀 Telepítés Útja

### Helyi tesztelés

```
1. Nyisd meg a mappát
2. python -m http.server 8000
3. http://localhost:8000
```

### Rackhostos Live

```
1. Olvasd: DEPLOYMENT.md
2. FTP-vel töltsd fel az összes fájlt
3. Ellenőrizd: http://haplmelinda.hu
```

---

## ✏️ Szerkesztés Útja

### 1. Szövegek módosítása

```
→ Szerkeszd: index.html
→ Lásd: SETUP.md "Szövegek szerkesztése"
```

### 2. Szín/design módosítása

```
→ Szerkeszd: styles.css
→ Lásd: SETUP.md "Design testreszabása"
```

### 3. Képek frissítése

```
→ Helyezd a képet: fenykepek/
→ Szerkeszd: data.js és script.js
→ Lásd: README.md "Új képek hozzáadása"
```

### 4. Kontakt infó módosítása

```
→ Szerkeszd: index.html (Contact szekció)
→ Lásd: SETUP.md "Szövegek szerkesztése"
```

---

## 🎯 Gyakori Feladatok

### "Szeretnék új képeket hozzáadni"

1. Nézd meg: [`IMAGES.md`](IMAGES.md)
2. Olvasd: [`README.md`](README.md) - "Új képek hozzáadása"
3. Szerkeszd: `data.js` és `script.js`

### "Az oldal lassan tölt be"

1. Nézd meg: [`HOSTING.md`](HOSTING.md) - "Gzip & cache"
2. Ellenőrizz: F12 → Network tab
3. Képek optimalizálása: https://tinyjpg.com/

### "Az email nem működik"

1. Nézd meg: [`SETUP.md`](SETUP.md) - "Email form"
2. Ellenőrizz: [`HOSTING.md`](HOSTING.md) - "Email beállítás"

### "Szeretnék új színeket"

1. Olvasd: [`SETUP.md`](SETUP.md) - "Szín módosítása"
2. Szerkeszd: `styles.css` `:root` szekciót
3. Próbálj: https://htmlcolorcodes.com/

### "Rackhostos telepítéshez segítség"

1. Olvasd: [`DEPLOYMENT.md`](DEPLOYMENT.md)
2. Kövesd a lépéseket
3. Ha gond van: [`HOSTING.md`](HOSTING.md) - "Problémamegoldás"

---

## 📊 Projekt Statisztika

```
📁 Mappák: 2 (fenykepek, .vscode)
📄 Fájlok: 15+ dokumentáció + 61 kép
💾 Méret: ~100-150 MB (képekkel)
⚡ Betöltési idő: < 1 másodperc
📱 Reszponsív: 320px - 4K
🔒 Biztonsági: ✅ HTTPS, ✅ Headers, ✅ Cache
```

---

## 🎓 Tanulási Útvonal

### Kezdő szint (Szövegek szerkesztése)

1. [`QUICKSTART.md`](QUICKSTART.md) - Alapok
2. [`SETUP.md`](SETUP.md) - Szövegek szerkesztése
3. Szerkeszd az `index.html`-t

### Közép szint (Design módosítása)

1. [`SETUP.md`](SETUP.md) - "Design testreszabása"
2. Szerkeszd a `styles.css`-t
3. Próbálkozz új színekkel

### Haladó szint (Képek és funkcionalitás)

1. [`README.md`](README.md) - Teljes technika
2. [`IMAGES.md`](IMAGES.md) - Képek inventory
3. Módosítsd `data.js` és `script.js`

### Szakértő szint (Rackhostos és SEO)

1. [`DEPLOYMENT.md`](DEPLOYMENT.md) - Telepítés
2. [`HOSTING.md`](HOSTING.md) - Szerver beállítások
3. [`SETUP.md`](SETUP.md) - SEO optimalizálás

---

## 🆘 Segítségkérés

### 1. Dokumentáció keresés

- Keress a `MANIFEST.md`-ben (ez a fájl)
- Nézd meg az összes `.md` fájlt

### 2. Gyakori problémák

- [`HOSTING.md`](HOSTING.md) - "Problémamegoldás"
- [`DEPLOYMENT.md`](DEPLOYMENT.md) - "Gyakori problémák"

### 3. Kódszintaxis

- Az összes fájl jól kommentálva
- Olvasd meg a kódot közvetlenül

### 4. Google keresés

- "HTML szerkesztés"
- "CSS szín módosítása"
- "Képek optimalizálása"

---

## ✅ Verzió és Történet

| Verzió | Dátum      | Változások     |
| ------ | ---------- | -------------- |
| 1.0    | 2025.12.04 | Teljes projekt |

---

## 🎉 Összegzés

**Az oldal teljes, kész és működő!**

### Mit kaptál:

✅ Modern, gyors weboldal  
✅ 50+ képből álló galéria  
✅ Reszponsív design  
✅ Teljes dokumentáció  
✅ Rackhostos telepítési útmutató

### Mi a következő:

1. Szövegek testreszabása
2. Szín séma módosítása (opcionális)
3. Rackhostos telepítés
4. Élő megosztás

---

## 📞 Kapcsolat

Bence  
Dátum: 2025.12.04  
Email: [Saját email]

---

**Jó szerencsét az új weboldaladdal!** 🎨🚀

---

## 🗺️ Mapa

```
Kezdjél itt: 00_KEZDD_ITT.txt
            ↓
Gyors start: QUICKSTART.md (5 perc)
            ↓
Szerkesztés: SETUP.md (20 perc)
            ↓
Teljes info: README.md (20 perc)
            ↓
Telepítés:   DEPLOYMENT.md (15 perc)
            ↓
Szerver:     HOSTING.md (10 perc)
            ↓
Kész!        http://haplmelinda.hu ✨
```
