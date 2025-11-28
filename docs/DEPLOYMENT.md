# 🚀 OWH Studio - Ghid Complet de Deployment

## 📋 Cuprins

1. [Cerințe Preliminare](#cerințe-preliminare)
2. [Configurare Mediu](#configurare-mediu)
3. [WordPress CMS Setup](#wordpress-cms-setup)
4. [Deployment Frontend](#deployment-frontend)
5. [Configurare Email](#configurare-email)
6. [Optimizare SEO](#optimizare-seo)
7. [Monitorizare și Întreținere](#monitorizare-și-întreținere)

---

## 🎯 Cerințe Preliminare

### Software Necesar
- **Node.js** 18+ și npm/yarn
- **Git** pentru version control
- Cont **Lovable Cloud** (pentru backend automat)
- Cont **WordPress** pentru CMS
- Cont **Resend** pentru email (opțional)

### Cunoștințe Recomandate
- React & TypeScript basics
- WordPress REST API
- Concepte SEO fundamentale

---

## ⚙️ Configurare Mediu

### 1. Variabile de Mediu

Creează fișierul `.env.local` în rădăcina proiectului:

```bash
# WordPress CMS API
VITE_WP_API_URL=https://cms.owh.md/wp-json/owh/v1

# Supabase (auto-configurat de Lovable Cloud)
VITE_SUPABASE_URL=auto-generat
VITE_SUPABASE_ANON_KEY=auto-generat

# Email (opțional - doar pentru Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
```

### 2. Instalare Dependențe

```bash
# Instalare pachete
npm install

# sau
yarn install
```

### 3. Verificare Build Local

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production
npm run preview
```

---

## 🎨 WordPress CMS Setup

### 1. Instalare Plugin OWH API

Copiază folderul `owh-api` în directorul `wp-content/plugins/` al WordPress-ului:

```
wp-content/
  plugins/
    owh-api/
      ├── acf-json/          # Configurări ACF
      ├── inc/               # Core functionality
      ├── owh-api.php        # Main plugin file
```

### 2. Activare Plugin

1. Accesează **WordPress Admin** → **Plugins**
2. Găsește **OWH API**
3. Click **Activate**

### 3. Instalare Advanced Custom Fields (ACF)

```bash
# Prin WordPress Admin
Plugins → Add New → Caută "Advanced Custom Fields"
Instalează și activează ACF PRO (recomandat) sau versiunea free
```

### 4. Import Câmpuri ACF

Câmpurile ACF sunt incluse în `owh-api/acf-json/`. După activarea plugin-ului, acestea vor fi importate automat.

### 5. Configurare Custom Post Types

Plugin-ul creează automat următoarele post types:

- **Films** (`/filme`)
- **Productions** (`/productii`)
- **Series** (`/emisiuni`)
- **Equipment** (`/echipament`)
- **Events** (`/evenimente`)
- **Team** (`/echipa`)

### 6. Configurare CORS

În `wp-config.php`, adaugă:

```php
// Allow CORS for frontend
header('Access-Control-Allow-Origin: https://owh.md');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

### 7. Permalink Structure

**Settings** → **Permalinks** → Selectează **Post name**

```
https://cms.owh.md/%postname%/
```

---

## 🌐 Deployment Frontend

### 1. Deploy pe Lovable

```bash
# Deploy automat prin Lovable interface
1. Click "Publish" în Lovable
2. Alege domeniul (owh.md)
3. Așteaptă deploy-ul automat
```

### 2. Configurare DNS

**Pentru domeniul owh.md:**

```dns
Type: A
Name: @
Value: [IP-ul furnizat de Lovable]
TTL: 3600

Type: CNAME
Name: www
Value: owh.md
TTL: 3600
```

**Pentru subdomeniile cms.owh.md:**

```dns
Type: A
Name: cms
Value: [IP-ul serverului WordPress]
TTL: 3600
```

### 3. SSL/HTTPS

Lovable configurează automat SSL prin Let's Encrypt.

---

## 📧 Configurare Email

### 1. Resend Setup

1. Creează cont pe [resend.com](https://resend.com)
2. Verifică domeniul `owh.md`
3. Generează API Key

### 2. Configurare DNS pentru Email

```dns
Type: TXT
Name: @
Value: [TXT record furnizat de Resend]

Type: CNAME
Name: _dmarc
Value: [DMARC record]
```

### 3. Testare Email

```bash
# Test contact form
curl -X POST https://owh.md/api/send-contact-email \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

---

## 🔍 Optimizare SEO

### 1. Meta Tags Verificare

Toate paginile au meta tags optimizate prin componenta `PageMeta`:

```tsx
<PageMeta
  title="Titlu Pagină"
  description="Descriere SEO"
  keywords="cuvinte, cheie, relevante"
  url="https://owh.md/pagina"
  type="website"
/>
```

### 2. Sitemap XML

Configurează plugin WordPress SEO (Yoast/RankMath):

```xml
https://cms.owh.md/sitemap.xml
```

### 3. robots.txt

Fișierul `public/robots.txt` este deja configurat:

```
User-agent: *
Allow: /
Sitemap: https://owh.md/sitemap.xml
```

### 4. Schema.org Markup

Schema.org este implementat automat pentru:
- **Organization** (homepage)
- **Movie** (film pages)
- **Article** (blog posts)
- **Service** (production services)

### 5. Performance Optimization

```bash
# Build optimizat pentru production
npm run build

# Verificare bundle size
npm run analyze (dacă ai webpack-bundle-analyzer)
```

**Optimizări automate:**
- Image lazy loading
- Code splitting
- React Query caching
- CSS minification
- Tree shaking

---

## 📊 Monitorizare și Întreținere

### 1. Google Analytics Setup

În `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 2. Error Monitoring

Configurează Sentry pentru monitorizare erori:

```bash
npm install @sentry/react
```

```tsx
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

### 3. Uptime Monitoring

Folosește servicii ca:
- **UptimeRobot** (gratuit)
- **Pingdom**
- **StatusCake**

### 4. Backup Strategy

**WordPress:**
- Backup zilnic bază de date
- Backup săptămânal fișiere
- Folosește plugin-uri: **UpdraftPlus**, **BackupBuddy**

**Frontend:**
- Git repository (GitHub/GitLab)
- Lovable versioning automat

### 5. Updates și Maintenance

**WordPress:**
```bash
# Update plugins
wp plugin update --all

# Update WordPress core
wp core update
```

**Frontend:**
```bash
# Update dependencies
npm update

# Security audit
npm audit fix
```

---

## 🔒 Securitate

### 1. WordPress Hardening

```php
// wp-config.php
define('DISALLOW_FILE_EDIT', true);
define('WP_AUTO_UPDATE_CORE', true);
```

### 2. Rate Limiting

Configurează rate limiting pentru API endpoints în WordPress.

### 3. Security Headers

În `.htaccess` sau server config:

```apache
<IfModule mod_headers.c>
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-Content-Type-Options "nosniff"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

---

## 🆘 Troubleshooting

### Probleme Comune

**1. CORS Errors**
```php
// În wp-config.php
header('Access-Control-Allow-Origin: https://owh.md');
```

**2. API 404 Errors**
- Verifică permalink structure în WordPress
- Regenerează .htaccess: Settings → Permalinks → Save

**3. Build Errors**
```bash
# Clear cache
rm -rf node_modules .cache
npm install
npm run build
```

**4. Email nu funcționează**
- Verifică API key Resend
- Verifică DNS records
- Check logs în Resend dashboard

---

## 📞 Support

**Documentație:**
- [Lovable Docs](https://docs.lovable.dev/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [React Query Docs](https://tanstack.com/query/latest)

**Contact:**
- Email: owh@owh.md
- Website: https://owh.md

---

## ✅ Checklist Deployment

- [ ] WordPress CMS configurat pe cms.owh.md
- [ ] Plugin OWH API activat
- [ ] ACF Pro instalat și configurat
- [ ] DNS records configurate
- [ ] SSL/HTTPS activ
- [ ] Email configuration (Resend)
- [ ] Google Analytics implementat
- [ ] Sitemap.xml generat
- [ ] robots.txt configurat
- [ ] Performance optimization verificat
- [ ] Security headers configurate
- [ ] Backup strategy implementat
- [ ] Error monitoring activ
- [ ] Mobile responsiveness testat
- [ ] Cross-browser testing completat
- [ ] SEO audit efectuat

---

**Versiune:** 1.0.0  
**Ultima actualizare:** 2024  
**Autor:** OWH Studio Development Team
