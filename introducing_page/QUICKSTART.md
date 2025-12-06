# 🚀 GYORSINDÍTÁS - Heredi Műhely Weboldal

## Mi is ez?

Egy **modern, rendkívül gyors** bemutatkozó weboldal Heredi Margit festészeti munkáihoz.

- **Nincsenek külső függőségek** - Pure HTML/CSS/JS
- **Teljesen statikus** - Semmilyen szerver oldali feldolgozás nem kell
- **100% reszponsív** - Szép minden eszközön

## 📦 Mit találsz itt?

```
introducing_page/
├── index.html          ← Az oldal
├── styles.css          ← Design
├── script.js           ← Interaktivitás
├── data.js             ← Képadatok (CSV-ből)
├── .htaccess           ← Szerver beállítások
├── fenykepek/          ← Képek mappája (61 kép)
├── README.md           ← Részletes dokumentáció
├── DEPLOYMENT.md       ← Rackhostos telepítés
└── QUICKSTART.md       ← Ez a fájl
```

## ⚡ 30 másodperces telepítés

### Option 1: Helyi tesztelés (fejlesztéshez)

```bash
cd introducing_page
# Python
python -m http.server 8000

# vagy Node.js
npx http-server
```

Majd: `http://localhost:8000`

### Option 2: Rackhostos (éles)

1. **FTP kliens** (FileZilla, WinSCP)
2. **Csatlakozz az FTP szerverhez**
3. **Navigálj `/web/` mappára**
4. **Drag & drop az alábbi fájlok közvetlenül:**
   - `index.html`
   - `styles.css`
   - `script.js`
   - `data.js`
   - `.htaccess`
5. **Hozz létre `fenykepek/` mappát**
6. **Töltsd fel az összes JPG képet**

**Kész!** → `http://haplmelinda.hu`

(Részletes: Lásd `DEPLOYMENT.md`)

## 🎯 Mit csinál az oldal?

✅ **Kezdőoldal** - Szép hero szekció + rólam rész
✅ **Kiemelt képek** - 6 kép a kezdőoldalon
✅ **Teljes galéria** - 50+ kép, szűrhető kategóriák
✅ **Modal** - Kattintás a képre = nagyított nézet
✅ **Lazy loading** - Képek csak akkor töltenek, ha szükséges
✅ **Gyorsítótár** - Képek csak egyszer töltődnek
✅ **Gzip** - 70% kisebb adatmennyiség

## ✏️ Szerkesztés (egyszerű)

### Szöveg módosítása

Fájl: `index.html`

```html
<!-- Rólam szöveg -->
<p>Már középskolában kezdtem el a porcelán festéssel...</p>

<!-- Kontakt -->
<p><a href="mailto:info@example.com">info@example.com</a></p>
<p>+36 XX XXX XXXX</p>
```

### Színek módosítása

Fájl: `styles.css` (fájl eleje):

```css
:root {
  --primary-color: #2c3e50; /* Fő szín */
  --secondary-color: #e74c3c; /* Kiemelés szín */
  --accent-color: #3498db; /* Harmadik szín */
}
```

Próbálj ki: https://htmlcolorcodes.com/

### Képek frissítése

1. **Új kép hozzáadása:**

   - Másolj be egy JPG képet az `fenykepek/` mappába
   - Nevez meg szerzámként: `120.jpg` (az ID a szerzám)

2. **Metaadatok:** Módosítsd a `data.js` fájlt:

```javascript
const galleryData = [
  // ... meglévő képek ...
  {
    id: 120,
    title: "Új mű titlusa",
    size: "20x15",
    externalSize: "28x23",
    price: 30000,
    category: "természet",
    technique: "tűzzománc",
    description: "kész",
    sold: false,
  },
];
```

3. **Elérhetővé tétel:** `script.js` módosítása:

```javascript
const availableIds = [
    1, 2, 5, 7, 8, ..., 120  // ← Add hozzá az ID-t
];
```

## 🔧 Gyakori testreszabások

### Szó módosítása szerte az oldalon

Keress rá: `Ctrl+H` a szövegszerkesztőben (Find & Replace)

**Példa:**

- "Heredi Műhely" → "Margit Festészeti Műhely"
- "info@example.com" → a valódi email

### Új szekció hozzáadása

Az `index.html`-ben az `<section>` elemek között:

```html
<section id="galeria">
  <div class="container">
    <h2>Új szekció</h2>
    <p>Tartalom itt...</p>
  </div>
</section>
```

### Logo/ikon módosítása

A navigation-ban:

```html
<div class="logo">🎨 Heredi Műhely</div>
```

Próbálj más emoji-kat: https://getemoji.com/

## 📊 Teljesítmény

| Metrika        | Érték                   |
| -------------- | ----------------------- |
| Oldalbetöltés  | < 1 másodperc           |
| Képbetöltés    | ~50ms (lazy loaded)     |
| Gzip tömörítés | Engedélyezve ✓          |
| Cache          | 1 év képek, 1 hó JS/CSS |
| Mobile         | Teljesen reszponsív     |

## 🆘 Gyakori problémák

### "Képek nem jelennek meg"

→ Képek az `fenykepek/` mappában vannak?
→ Az ID-k helyesek a `data.js`-ben?

### "Az oldal lassan tölt be"

→ Képek optimalizáltak? (< 2MB)
→ Gzip engedélyezve? (F12 → Network)

### "Szöveg furcsán jelenik meg"

→ Ékezetek? (Már UTF-8)
→ Egyedi font? (Az alap Arial/Segoe OK)

### "Szűrők nem működnek"

→ Frissítsd az oldalt (Ctrl+F5)
→ Browser console hiba? (F12)

## 💡 Pro Tips

1. **SEO:** Add meg a `<meta>` tagokat az `index.html` `<head>`-ben:

```html
<meta
  name="description"
  content="Heredi Margit porcelán és tűzzománc-festési munkái"
/>
<meta name="keywords" content="porcelán, festés, tűzzománc, kézmunka" />
```

2. **Analytics:** Rakj be Google Analytics kódot:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

3. **Instagram link:** Add hozzá a footer-hoz:

```html
<a href="https://instagram.com/..." target="_blank">Instagram</a>
```

## 📞 Támogatás

1. **Dokumentáció:** Lásd `README.md`
2. **Telepítés:** Lásd `DEPLOYMENT.md`
3. **Kódszintaxis:** A fájlok jól kommentáltak

## 🎉 Készen vagy!

Az oldal most működik és **nulla karbantartást igényel**.

Csak frissítsd a képeket és szövegeket, ahogy szükséges.

---

**Verzió:** 1.0  
**Készült:** 2025  
**Köszönet:** Bence ❤️
