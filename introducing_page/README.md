# Heredi Műhely - Bemutatkozó Weboldal

Modern, gyors, és reszponsív bemutatkozó weboldal Heredi Margit porcelán- és tűzzománc-festési munkáihoz.

## 🚀 Jellemzők

- **⚡ Villámgyors betöltés** - Pure HTML/CSS/JS, nincsenek külső függőségek
- **📱 Teljesen reszponsív** - Szép megjelenítés minden eszközön
- **🖼️ Intelligens képgaléria** - Szűrhető kategóriák, lazy loading
- **🔍 SEO-optimalizált** - Jó keresőmotor-rangsorolás
- **📦 Statikus oldal** - Semmilyen adatbázis vagy szerveroldalas feldolgozás nem szükséges
- **🎨 Modern dizájn** - Szép, professzionális megjelenés

## 📁 Struktúra

```
introducing_page/
├── index.html          # Főoldal
├── styles.css          # CSS stílusok
├── script.js           # JavaScript interaktivitás
├── data.js             # Képadatok (CSV-ből generálva)
├── .htaccess           # Szserver konfigurációs
├── fenykepek/          # Képek mappája
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
└── README.md           # Ez a fájl
```

## 🛠️ Telepítés

### Rackhostos webtárhelyhez:

1. **FTP-vel töltsd fel** az összes fájlt az `haplmelinda.hu/web/` mappába
2. **Másolj be minden képet** a `fenykepek/` mappába
3. **Az `.htaccess` fájl** automatikusan aktiválja az optimalizálásokat

### Helyi teszteléshez:

```bash
# Python 3 webszerver
python -m http.server 8000

# Vagy Node.js http-server
npx http-server
```

Majd nyiss meg: `http://localhost:8000`

## ✏️ Tartalom szerkesztése

### Új képek hozzáadása:

1. Helyezd be a képet a `fenykepek/` mappába az ID-jával (pl: `125.jpg`)
2. Nyisd meg a `data.js` fájlt
3. Add hozzá az új képet a `galleryData` tömbhöz:

```javascript
{ id: 125, title: "Új mű címe", size: "20.0x15.0", externalSize: "28.0x23.0", price: 30000, category: "témakör", technique: "technika", description: "kész", sold: false }
```

4. Frissítsd az `availableIds` tömböt a `script.js` fájlban:

```javascript
const availableIds = [1, 2, 5, 7, ... , 125]; // Add 125-öt
```

### Szövegek szerkesztése:

- **index.html**: Szöveg, címek, linkek
- **styles.css**: Színek, betűtípusok, elrendezések
- `:root` részben a CSS színváltozók

## 🎨 Testreszabás

### Színek módosítása:

A `styles.css` fájl elején:

```css
:root {
  --primary-color: #2c3e50; /* Sötét szín */
  --secondary-color: #e74c3c; /* Piros akcentus */
  --accent-color: #3498db; /* Kék akcentus */
  --light-bg: #f8f9fa; /* Világos háttér */
}
```

### Betűtípus módosítása:

```css
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
```

## 📊 Teljesítmény

- **Oldalbetöltési idő**: < 1 másodperc (képek nélkül)
- **Képbetöltés**: Lazy loading - csak a látható képek betöltenek
- **Gzip tömörítés**: Automatikus, .htaccess-ből
- **Gyorsítótár**: 1 év képekhez, 1 hónap CSS/JS-hez

## 🔐 SEO & Biztonsági beállítások

Az `.htaccess` fájl automatikusan kezel:

- ✅ Gzip tömörítés
- ✅ Cache control
- ✅ Security headers (X-Frame-Options, etc.)
- ✅ MIME típusok
- ✅ Direkt hozzáférés blokkolása

## 📞 Kontakt

Az oldalon módosítható:

- Email
- Telefonszám
- Hely/város

## 💡 Tippek

1. **Képoptimalizálás**: Az 1-2 MB-os JPG képek teljesen rendben vannak
2. **Mobil tesztelés**: Használd a böngésző DevTools-ját (F12)
3. **SEO javítása**: Adj meg <meta> tagokat az index.html-ben (keywords, description)
4. **Google Analytics**: Adj hozzá Analytics kódot az </body> előtt

## 🚀 Jövőbeli fejlesztések

- [ ] Galériaszekcióban még több szűrési lehetőség
- [ ] "Érdeklődés" form
- [ ] Instagram/Social media linkek
- [ ] Visszajelzés/Értékelések
- [ ] Email Newsletter

## 📝 Licenc

Készült: 2025 - Heredi Műhely

---

**Támogatás**: Az oldal teljesen statikus HTML/CSS/JS, így nem igényel karbantartást vagy frissítéseket. Az egyedüli változás a képek és szövegek módosítása lehet.
