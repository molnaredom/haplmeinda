# ⚙️ BEÁLLÍTÁS ÉS TESTRESZABÁS

## 🎯 Célok beállítása

Mielőtt szerkesztenél, tisztázz pár dolgot:

### 1. Tartalom

- [ ] Ki vagy? (Margit Heredi)
- [ ] Mit csináció? (Porcelán- és tűzzománc-festés)
- [ ] Hol? (Herecsény, Magyarország)
- [ ] Kontakt? (Email, telefon)

### 2. Vizuálisan

- [ ] Szín séma (jelenlegi: lila/piros)
- [ ] Betűtípus (jelenlegi: Segoe UI)
- [ ] Logó/ikon (jelenlegi: 🎨 emoji)
- [ ] Profilkép (jelenlegi: `anya_kep.jpg`)

### 3. Funkció

- [ ] Szűrők szükségesek? (jelenlegi: 5 kategória)
- [ ] Kapcsolati forma? (jelenlegi: nincs)
- [ ] Newsletter? (jelenlegi: nincs)

---

## 📝 Szövegek szerkesztése

### index.html módosítása

Nyisd meg az `index.html` fájlt egy szövegszerkesztőben (VS Code, Notepad++, stb.)

#### Navigáció

```html
<!-- Jelenlegi -->
<div class="logo">🎨 Heredi Műhely</div>

<!-- Módosítva -->
<div class="logo">🖌️ Margit Festészeté</div>
```

#### Hero szekció (Kezdőoldal)

```html
<h1>Heredi Műhely</h1>
<p class="subtitle">Porcelán- és tűzzománc-festési műalkotások</p>

<!-- Módosítva: -->
<h1>Festészeti Műhely</h1>
<p class="subtitle">Egyedi porcelán és tűzzománc-festés</p>
```

#### Rólam szekció

```html
<p>
  Már középskolában kezdtem el a porcelán festéssel. Az évek során kialakult egy
  egyedi stílus, amely a természet, az emberek és a spirituális motívumok
  harmóniáját tükrözi.
</p>
```

**Módosítsd az alábbiak szerint:**

- Születési év: 19XX
- Kiemelt évek: például 2000 óta festek
- Stílus leírása
- Ihletek forrása

#### Kontakt szekció

```html
<div class="contact-item">
  <h3>📧 Email</h3>
  <p><a href="mailto:info@example.com">info@example.com</a></p>
</div>

<div class="contact-item">
  <h3>📱 Telefon</h3>
  <p>+36 XX XXX XXXX</p>
</div>

<div class="contact-item">
  <h3>📍 Hely</h3>
  <p>Herecsény, Magyarország</p>
</div>
```

**Helyettesítsd be az igazi adatokat.**

---

## 🎨 Design testreszabása

### Színek módosítása

Nyisd meg a `styles.css` fájlt.

Megtalálod ezt az elején:

```css
:root {
  --primary-color: #2c3e50; /* Sötét kék - háttér, szöveg */
  --secondary-color: #e74c3c; /* Piros - gombok, akcentusok */
  --accent-color: #3498db; /* Kék - linkek, tag-ek */
  --light-bg: #f8f9fa; /* Világos szürke - háttér */
  --text-color: #333; /* Sötét szürke - szöveg */
  --text-light: #666; /* Közép szürke - másodlagos szöveg */
  --border-color: #ddd; /* Szürke - határok */
}
```

**Próbálj ki új kombinációkat:**

| Téma       | Primary | Secondary | Accent  |
| ---------- | ------- | --------- | ------- |
| Klasszikus | #2c3e50 | #e74c3c   | #3498db |
| Természet  | #27ae60 | #d35400   | #16a085 |
| Elegáns    | #34495e | #c0392b   | #8e44ad |
| Modern     | #2980b9 | #e67e22   | #1abc9c |
| Meleg      | #d68910 | #e74c3c   | #a93226 |

**Szövegszerkesztő tippje:**

1. Keress: `:root {`
2. Cseréld ki a hex értékeket
3. Mentsd el
4. Frissítsd a böngészőt (F5)

### Betűtípus módosítása

A `styles.css`-ben keress:

```css
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
```

**Google Fonts integráció:**

1. Látogass el: https://fonts.google.com
2. Válassz egy font-ot (pl. "Playfair Display")
3. Kattints "Select this style"
4. Másolj ki az `<link>` kódot
5. Illeszd be az `index.html` `<head>` részébe:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap"
  rel="stylesheet"
/>
```

6. Cseréld ki a `font-family`-t:

```css
body {
  font-family: "Playfair Display", serif;
}
```

### Logo/Hero ikon módosítása

Az `index.html` navigációs részében:

```html
<div class="logo">🎨 Heredi Műhely</div>
```

**Emoji lehetőségek:**

- 🎨 Festékpaletta (jelenlegi)
- 🖌️ Ecset
- 🖼️ Kép
- ✨ Csillagok
- 💎 Gyémánt
- 🌸 Virág
- 🎭 Szín

Látogass: https://getemoji.com/

---

## 📸 Profilkép módosítása

Jelenleg a "Rólam" szekciónban: `anya_kep.jpg`

**Módosításhoz:**

1. Van egy jobb profilkép? (pl. `portfólió.jpg`)
2. Helyezd az `fenykepek/` mappába
3. Módosítsd az `index.html`-ben:

```html
<img src="fenykepek/anya_kep.jpg" alt="Heredi műhely" />

<!-- Helyettesítsd: -->
<img src="fenykepek/portfolio.jpg" alt="Margit festő" />
```

**Javasolt méret:** 400x400 - 600x600 pixel

---

## 🔗 Linkek hozzáadása

### Instagram/Facebook

A footer előtt az `index.html`-ben:

```html
<!-- Social links (optional) -->
<div class="social-links">
  <a href="https://instagram.com/..." target="_blank">📷 Instagram</a>
  <a href="https://facebook.com/..." target="_blank">👍 Facebook</a>
</div>
```

Majd a `styles.css`-ben add hozzá:

```css
.social-links {
  text-align: center;
  margin: 2rem 0;
}

.social-links a {
  display: inline-block;
  margin: 0 1rem;
  padding: 10px 20px;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: var(--secondary-color);
}
```

### Email form

Ha szeretnél üzeneteket kapni (igényel szerver-oldali feldolgozást):

```html
<form action="mailto:email@example.com" method="POST" enctype="text/plain">
  <input type="text" name="name" placeholder="Neved" required />
  <input type="email" name="email" placeholder="Email" required />
  <textarea name="message" placeholder="Üzenet" required></textarea>
  <button type="submit">Küldés</button>
</form>
```

**Megjegyzés:** Ez egyszerű, de fejlettebb megoldáshoz formserverket kell használni (pl. Formspree, EmailJS).

---

## 📊 SEO optimalizáció

### Meta tagek

Nyisd meg az `index.html` `<head>` részét:

```html
<meta
  name="description"
  content="Heredi Margit porcelán és tűzzománc-festési műalkotásai. Egyedi, kézzel festett kunstörténeti munkák."
/>
<meta
  name="keywords"
  content="porcelán, tűzzománc, festészet, kézmunka, Herecsény"
/>
<meta property="og:title" content="Heredi Műhely - Porcelán Festészet" />
<meta
  property="og:description"
  content="Heredi Margit egyedi porcelán- és tűzzománc-festési munkái"
/>
<meta property="og:image" content="fenykepek/107.jpg" />
```

### Google Analytics (opcionális)

1. Menj a https://analytics.google.com-ra
2. Regisztrálj/bejelentkezz
3. Hozz létre új property-t a domaindhez
4. Másold ki a tracking kódot
5. Illeszd be az `index.html` `</body>` elé:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_4_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_4_ID');
</script>
</body>
```

---

## 🚀 Telepítés után

1. ✅ Tesztelj minden eszközön (PC, tablet, mobil)
2. ✅ Ellenőrizd a linkeket
3. ✅ Nézd meg az oldalt Google-ban
4. ✅ Kérj visszajelzést barátoknak/családnak

---

## ✅ Ellenőrzési lista

Mielőtt élőre tennéd:

- [ ] Szövegek jók? (elírások, nyelvtan)
- [ ] Képek jók? (felhasználónév, minőség)
- [ ] Szín séma jó? (harmonikus)
- [ ] Linkek működnek?
- [ ] Mobil nézeget működik?
- [ ] Kontakt infó helyes?
- [ ] Nincsenek placeholder szövegek ("example", "TODO")?

---

## 💾 Mentés és deploy

```bash
# Helyi tesztelés
python -m http.server 8000

# FTP-vel feltöltés
# Vagy git push (ha GitHub-on van)
```

---

## 🆘 Segítségre van szükséged?

1. **Szintaxishiba?** → F12 (Developer Tools) → Console
2. **Kép nem jelenik meg?** → Fájl neve helyes? Helyen van?
3. **Design furcsán néz ki?** → Cache törlés (Ctrl+F5)

---

**Sikeres testreszabást!** 🎨

---

**Verzió:** 1.0  
**Dátum:** 2025.12.04
