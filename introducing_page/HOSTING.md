# 🌐 Rackhostos Specifikus Beállítások

## 📋 Rackhostos Szerveren Közös Beállítások

### FTP Hozzáférés

**Bejelentkezési adatok:**

```
Host: ftp.rackhostos.hu (vagy a szolgáltató által adott)
Felhasználónév: (az FTP username)
Jelszó: (az FTP password)
Port: 21
```

**FTP Kliensek:**

- FileZilla (ingyenes) - https://filezilla-project.org/
- WinSCP (ingyenes) - https://winscp.net/
- VS Code Remote - Built-in
- Cyberduck (ingyenes) - https://cyberduck.io/

### CPanel / Admin Felület

**Általában elérhető:**

```
https://haplmelinda.hu:2083  (vagy 2082)
```

Vagy a Rackhostos paneljén belül.

---

## ⚙️ Apache .htaccess Beállítások

A `introducing_page/.htaccess` fájl automatikusan konfigurálja:

### 1. Gzip Tömörítés

✅ **Engedélyezve** - Fájlok ~70% kisebbek

- HTML, CSS, JS tömörítve
- Képek már JPG formátumban vannak

Ellenőrzés:

```
https://www.giftofspeed.com/gzip-test/
```

### 2. Browser Cache

✅ **Engedélyezve** - Képek gyorsubbak másodszor

- Képek: 1 év
- CSS/JS: 1 hónap
- HTML: Nincs cache (friss marad)

### 3. Biztonsági Headrek

✅ **Beépítve**:

- `X-Frame-Options` - Clickjacking elleni védelem
- `X-Content-Type-Options` - MIME sniffing elleni
- `X-XSS-Protection` - XSS elleni

### 4. Direkt Hozzáférés Blokkolása

✅ **Aktív** - Nem lehet közvetlenül mappákat böngészni

---

## 🔥 Problémamegoldás

### 1. ".htaccess" nem működik

**Probléma:** "500 Internal Server Error"

**Megoldás:**

1. CPanel → "Advanced" vagy "Settings"
2. Keresd: "ModRewrite" vagy "Apache Modules"
3. Engedélyezd: `mod_rewrite` és `mod_deflate`
4. Próbáld újra

### 2. Gzip nem működik

**Ellenőrzés:**

```
F12 → Network tab
Kattints egy JS/CSS fájlra
Keress: "Content-Encoding: gzip"
```

**Ha nincs:**

1. CPanel → Enable Gzip Compression
2. Vagy manuálisan `.htaccess`-ben (már benne van)

### 3. Képek nem szinkronizálódnak

**Probléma:** FTP-n feltöltöm, de az oldalon nem jelenik meg

**Megoldás:**

1. Böngészőben: Ctrl+Shift+Delete (Cache törlés)
2. Vagy: Ctrl+F5 (Hard refresh)
3. Vagy: F12 → Network → "Disable cache" jelölni

### 4. Szöveg furcsán jelenik meg

**Probléma:** Magyar karakterek nem jók

**Megoldás:**

- Az `index.html` már UTF-8-as
- Mentsd el UTF-8-ként a szövegszerkesztőben
- VS Code: Kattints jobb alsó "UTF-8" jelre

### 5. Nagyon lassú betöltés

**Ellenőrizz:**

1. Képek optimalizáltak? (`<2 MB` per kép)
2. Gzip engedélyezve? (lásd: 2. pont)
3. Browser cache működik? (F12 → Headers → Cache-Control)

**Javítás:**

1. Képek tömörítése: https://tinyjpg.com/
2. GZIP engedélyezése (lásd fent)
3. CSS/JS minifikálás (már megtörtént)

---

## 🆙 Frissítés/Szerkesztés az FTP-n

### Fájlok módosítása

1. **Töltsd le** az FTP-n:

   ```
   /haplmelinda.hu/web/index.html
   ```

2. **Szerkeszd** lokálisan (VS Code)

3. **Töltsd fel** az FTP-n ugyanarra a helyre

4. **Hard refresh** a böngészőben (Ctrl+F5)

### Új képek hozzáadása

1. **FTP-n:** Hozz létre `fenykepek/` mappát
2. **Másold be** az összes JPG képet
3. **Frissítsd** a `data.js` és `script.js` fájlokat (lásd: `SETUP.md`)

---

## 📊 Rackhostos Dashboard Tippek

### Hely ellenőrzése

1. CPanel belépés
2. "Disk Usage" vagy "Storage"
3. Nézd meg a szabad helyet

Javasolt:

- 50-100 MB statikus oldalhoz + képek
- 500 MB - 1 GB jelenlegi Rackhostos tárhely

### Statisztikák

1. CPanel → "Raw Access Logs"
2. Vagy: "Webalizer" (vizuális statisztikák)
3. Nézd meg hányan látogatnak az oldalra

### E-mail

1. CPanel → "Email Accounts"
2. Hozz létre `info@haplmelinda.hu` emailt
3. Az `index.html` kontakt formájában használd

---

## 🔒 Biztonsági tippek

### SSL/TLS Tanúsítvány (HTTPS)

1. Rackhostos általában ingyen biztosít
2. CPanel → "AutoSSL" vagy "Let's Encrypt"
3. Engedélyezd - így biztonságos az oldal

### Jelszó védelem

Ha zárt területed van:

```
CPanel → "Password Protect Directories"
```

De az oldal nyilván kell maradjon!

### Adatok biztonsága

1. Rendszeres backup-ok
2. `.htaccess` + security headers (már van)
3. Nincsenek szenzitív adatok az oldalon

---

## 🎯 Rackhostos Speciális Beállítások

### PHP verzió (ha szükséges később)

1. CPanel → "PHP Version" vagy "Select PHP Version"
2. Jelenlegi setupban: **nem szükséges** (statikus oldal)

### Subdomain-ek

Ha szeretnél: `oldal.haplmelinda.hu` vagy `galeria.haplmelinda.hu`:

1. CPanel → "Addon Domains" vagy "Subdomains"
2. Hozz létre új subdomain-t
3. FTP-vel feltöltsd az oldalat

### Cron Jobs (Ütemezett taskok)

Jelenleg **nem szükséges** - statikus oldal

---

## 📞 Rackhostos Support

**Hivatkozások:**

- Weboldal: https://rackhostos.hu/
- Support: support@rackhostos.hu
- Dokumentáció: https://rackhostos.hu/dokumentacio/

**Közös problémák előrelátás:**

1. `.htaccess` nem működik → ModRewrite engedélyezés
2. Gzip nem működik → ModDeflate engedélyezés
3. Kimaradás → Backup-ok visszaállítása

---

## 🚀 Deployment Checklistje

Mielőtt élőre tennéd az oldalat:

### Fájlok

- [ ] `index.html` - feltöltve
- [ ] `styles.css` - feltöltve
- [ ] `script.js` - feltöltve
- [ ] `data.js` - feltöltve
- [ ] `.htaccess` - feltöltve
- [ ] `fenykepek/` - mappa feltöltve + képek

### Beállítások

- [ ] Jogosultságok: 644 (fájlok), 755 (mappák)
- [ ] ModRewrite engedélyezve
- [ ] Gzip tömörítés aktív
- [ ] SSL tanúsítvány: HTTPS működik

### Teszt

- [ ] http://haplmelinda.hu nyitva van
- [ ] Képek betöltenek
- [ ] Szűrők működnek
- [ ] Mobil és asztali verzió OK
- [ ] Nincsenek 404 hibák (F12 → Network)

### SEO

- [ ] Google indexelte az oldalt
- [ ] Google Analytics működik (opcionális)
- [ ] Meta tagek jók (description, keywords)

---

## 💡 Rackhostos Extrák

### Automatikus Backupok

1. CPanel → "Backup" vagy "File Backup"
2. Rendszeres automatikus mentés
3. Visszaállítható az admin felületről

### CDN (Content Delivery Network)

Ha több millió látogatót vársz:

- Cloudflare (ingyenes verzió)
- De az ideális: statikus oldal + CDN

### Compression Tool

```
CPanel → "Optimize Website"
```

(Már van `.htaccess`-ben)

---

## 🎉 Kész!

Az oldal most **télően működik** a Rackhostos szerveren!

**Nem szükséges többé:**

- Frissítések
- Karbantartás
- Biztonsági patchek (statikus)
- Felügyelés

**Csak szerkeszts:**

- Szövegek
- Képek
- Dizájn (CSS)

---

**Verzió:** 1.0  
**Dátum:** 2025.12.04  
**Platform:** Rackhostos

Sok sikert az új weboldaladdal! 🎨🚀
