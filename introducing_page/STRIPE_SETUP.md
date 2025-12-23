# Stripe Integráció Beállítási Útmutató

## 🎯 Áttekintés

Ez az útmutató segít beállítani a Stripe fizetési rendszert a Hápl Melinda weboldalhoz.

## 📋 Előfeltételek

1. **Stripe fiók** - Regisztrálj a [stripe.com](https://stripe.com) oldalon
2. **Netlify fiók** - Regisztrálj a [netlify.com](https://netlify.com) oldalon (ingyenes)

## 🔧 Beállítási lépések

### 1. Stripe Dashboard beállítása

1. Jelentkezz be a [Stripe Dashboard](https://dashboard.stripe.com)-ba
2. Menj a **Developers > API keys** menüpontra
3. Másold ki a következő kulcsokat:
   - **Publishable key** (pk*test*... vagy pk*live*...)
   - **Secret key** (sk*test*... vagy sk*live*...)

### 2. Netlify beállítása

1. Jelentkezz be a [Netlify](https://app.netlify.com)-ra
2. Kattints a **"Add new site"** > **"Import an existing project"**
3. Válaszd ki a GitHub repót (molnaredom/haplmeinda)
4. Beállítások:

   - **Base directory**: `introducing_page`
   - **Build command**: (hagyd üresen)
   - **Publish directory**: `introducing_page`

5. Környezeti változók beállítása:
   - Menj a **Site settings > Environment variables**
   - Add hozzá:
     ```
     STRIPE_SECRET_KEY = sk_test_XXXXXXXX (vagy sk_live_XXXXXXXX élesben)
     ```

### 3. script.js konfigurálása

Nyisd meg a `script.js` fájlt és frissítsd a következő sorokat:

```javascript
// Állítsd be a saját Stripe publishable key-edet!
const STRIPE_PUBLISHABLE_KEY = "pk_test_XXXXXXXX"; // Cseréld ki!

// Aktiváld a Stripe-ot
const USE_STRIPE = true; // Állítsd true-ra!
```

### 4. Serverless function frissítése

A `netlify/functions/create-checkout-session.js` fájlban frissítsd a képek URL-jét:

```javascript
images: [`https://SAJAT-DOMAIN.netlify.app/fenykepek/${item.id}.jpg`],
```

## 🧪 Tesztelés

### Teszt mód

- Használd a `pk_test_...` és `sk_test_...` kulcsokat
- Teszt kártya: `4242 4242 4242 4242` (bármilyen jövőbeli dátum és CVC)

### Éles mód

1. Végezd el a Stripe fiók aktiválását
2. Cseréld ki a kulcsokat `pk_live_...` és `sk_live_...` értékekre
3. Teszteld egy valódi kis összegű tranzakcióval

## 💰 Árazás

### Netlify

- **Ingyenes csomag**: 125,000 function request/hónap (bőven elég)

### Stripe

- **Tranzakciós díj**: 1.4% + 25 HUF (EU kártyák) / 2.9% + 25 HUF (nemzetközi)
- Nincs havi díj

## 🔒 Biztonság

- A Secret Key **SOHA** ne kerüljön a frontend kódba
- A Secret Key csak a Netlify környezeti változóban legyen
- HTTPS automatikus Netlify-on

## 📱 Támogatott fizetési módok

A Stripe Checkout automatikusan kezeli:

- ✅ Bankkártya (Visa, Mastercard, Amex)
- ✅ Apple Pay
- ✅ Google Pay
- ✅ Link (Stripe gyors checkout)

## 🆘 Hibaelhárítás

### "STRIPE_SECRET_KEY is not defined"

→ Ellenőrizd a Netlify környezeti változókat

### "No such price"

→ Az árak HUF-ban, fillér nélkül vannak megadva (pl. 30000 = 30,000 Ft)

### CORS hiba

→ A Netlify function automatikusan kezeli, de ellenőrizd a netlify.toml-t

## 📞 Támogatás

- [Stripe Dokumentáció](https://stripe.com/docs)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
