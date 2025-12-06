# Rackhostos Telepítési Útmutató

## 📋 Előfeltételek

- ✅ Rackhostos webtárhely (haplmelinda.hu domain)
- ✅ FTP hozzáférés
- ✅ Kb. 100-150 MB szabad hely (képekhez)

## 📂 A szerkezet az FTP-n:

```
/haplmelinda.hu/
├── web/                    ← Az oldal itt lesz
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── data.js
│   ├── .htaccess           ← Fontos!
│   └── fenykepek/
│       ├── 1.jpg
│       ├── 2.jpg
│       └── ...
├── cgi-bin/               ← Nem kell
├── log/                   ← Nem kell
└── private/               ← Nem kell
```

## 🚀 Telepítési lépések

### 1. FTP kliens megnyitása

Használj:

- **FileZilla** (ingyenes)
- **WinSCP** (ingyenes)
- **VS Code FTP** (beépített)

Bejelentkezési adatok:

```
Host: ftp.haplmelinda.hu (vagy a Rackhostos FTP szerver)
Username: Az FTP felhasználónév
Password: Az FTP jelszó
Port: 21
```

### 2. Mappák feltöltése

1. **Navigálj az `/web/` mappára az FTP-n**
2. **Töltsd fel az alábbi fájlokat:**

   - `index.html`
   - `styles.css`
   - `script.js`
   - `data.js`
   - `.htaccess` ⭐ (fontosabb biztonsági és teljesítmény beállítások miatt)

3. **Hozz létre egy `fenykepek/` mappát**, és töltsd fel az összes JPG képet

### 3. Fájl jogosultságok (Permissions)

Az FTP kliensben:

- Fájlok: `644` (rw-r--r--)
- Mappák: `755` (rwxr-xr-x)
- `.htaccess`: `644`

**FileZilla-ben:**

1. Jobb klikk az `.htaccess` fájlra
2. "File permissions" → `644`
3. Ugyanez az összes HTML, CSS, JS fájlra

### 4. URL ellenőrzés

Nyiss meg a böngészőben:

```
http://haplmelinda.hu/
```

vagy

```
http://haplmelinda.hu/web/
```

(Az opcionális `/web/` függ a Rackhostos konfigurációtól)

---

## ⚙️ Rackhostos specifikus beállítások

### Gzip tömörítés ellenőrzése:

1. Nyiss meg egy weboldal-elemzőt: https://www.giftofspeed.com/gzip-test/
2. Add meg a domain-edet
3. Meg kell jelennie: "GZIP compression is enabled"

### Gyorsítótár ellenőrzése:

1. Fejlesztői konzol (F12) → Network
2. Töltsd be az oldalt
3. Kattints egy képre, nézd meg a Response Headers:
   ```
   Cache-Control: max-age=31536000, public
   ```

---

## 🖼️ Képek frissítése később

### Új kép hozzáadása:

1. **FTP-n:** Töltsd fel az új képet a `/web/fenykepek/` mappába (pl: `120.jpg`)

2. **`data.js` frissítése:**

   - Nyisd meg a fájlt
   - Adj hozzá új bejegyzést a `galleryData` tömbhöz:

   ```javascript
   { id: 120, title: "Új mű", size: "20x15", externalSize: "28x23", price: 30000, category: "természet", technique: "tűzzománc", description: "kész", sold: false }
   ```

3. **`script.js` frissítése:**

   - Nyisd meg az `availableIds` tömböt
   - Add hozzá az `120`-at:

   ```javascript
   const availableIds = [1, 2, 5, 7, ... , 120];
   ```

4. **FTP-n:** Töltsd fel az updated `data.js` és `script.js` fájlokat

5. **Böngészőben:** Nyisd meg az oldalt és `Ctrl+F5` (hard refresh)

---

## 🔧 Szövegek szerkesztése

### Index.html módosítása:

1. FTP-n: Töltsd le az `index.html` fájlt
2. Nyisd meg egy szövegszerkesztővel (VS Code, Notepad++, stb.)
3. Módosítsd az alábbi részeket:

**Kontakt információ:**

```html
<div class="contact-item">
  <h3>📧 Email</h3>
  <p><a href="mailto:info@example.com">info@example.com</a></p>
</div>
```

**Rólam szöveg:**

```html
<p>Már középskolában kezdtem el a porcelán festéssel...</p>
```

4. Mentsd el és töltsd fel az FTP-n

---

## 🎨 Desgin módosítása

### Színek:

1. `styles.css` letöltése
2. Nyisd meg (a fájl elejét keress):

```css
:root {
  --primary-color: #2c3e50; /* Ez a sötét szín */
  --secondary-color: #e74c3c; /* Ez a piros */
  --accent-color: #3498db; /* Ez a kék */
}
```

3. Módosítsd a hex kódokat
4. Töltsd fel az FTP-n

### Betűtípus:

Az `index.html`-ben a `<head>` részben:

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
/>
```

---

## 📊 Teljesítmény-tippek

### A .htaccess biztosítja:

✅ **Gzip tömörítés** - ~70% kisebb fájlok
✅ **Browser cache** - Képek csak egyszer töltődnek
✅ **Security headers** - XSS, Clickjacking védelem

### Képek optimalizálása:

Javasolt képméretek:

- **Galériában:** 1200x900 vagy 1000x800 pixel
- **Fájlméret:** 500KB - 2MB JPG
- **Formátum:** JPEG jó minőséggel (80-90%)

**Online eszközök:**

- https://tinyjpg.com/ (képek tömörítése)
- https://imageresizer.com/ (átméretezés)

---

## ❌ Gyakori problémák

### Az oldal nem tölt be:

- ✓ Ellenőrizd az FTP elérési utat (`/web/` mappában vannak?)
- ✓ Nincs 404 hiba?
- ✓ Az index.html feltöltött?

### Képek nem jelennek meg:

- ✓ A képek a `fenykepek/` mappában vannak?
- ✓ A képfájlok neve `.jpg` kiterjesztésű?
- ✓ Az `availableIds` tömb tartalmazza az ID-t?

### Oldal lassan tölt be:

- ✓ Gzip engedélyezve van? (F12 → Network → Response Headers)
- ✓ A képek optimalizáltak?
- ✓ A böngésző cache-t használ? (Cache-Control header)

### Szöveg nem jelenik meg helyesen:

- ✓ UTF-8 encoding az `index.html`-ben? (✓ Van már!)
- ✓ Nincs-e special karakter probléma?

---

## 🆘 Support

Ha probléma van a Rackhostos szerveren:

1. **Rackhostos támogatás elérése:**

   - CPanel/Admin panel: `haplmelinda.hu:2083`
   - Támogatás: support@rackhostos.hu

2. **Közös problémák:**
   - `.htaccess` nem működik → Engedélyezd az `mod_rewrite`-t
   - Gzip nem működik → Engedélyezd az `mod_deflate`-et
   - PHP hibák → Győződj meg, hogy van `index.html`!

---

## 🎉 Kész!

Az oldal most élő!

**Ellenőrizd:**

- ✅ http://haplmelinda.hu nyitva van?
- ✅ Képek jól töltenek be?
- ✅ Szűrők működnek?
- ✅ Galéria modal megnyílik?

---

**Készült: 2025**
**Verzió: 1.0**
