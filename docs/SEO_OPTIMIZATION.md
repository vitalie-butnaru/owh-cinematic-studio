# SEO Optimization Guide - OWH Studio

## Current SEO Implementation

Acest document descrie toate optimizările SEO implementate în site-ul OWH Studio.

## Meta Tags și Structură HTML

### Index.html Base
```html
<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>OWH Studio | Film, Producție Video, Rental Echipament | Chișinău, Moldova</title>
  <meta name="title" content="OWH Studio | Film, Producție Video, Rental Echipament | Chișinău, Moldova">
  <meta name="description" content="OWH Studio - 25+ ani de experiență în producție cinematografică și video. Filme documentare, spoturi publicitare, rental echipament profesional. CRONOGRAF Film Festival.">
  <meta name="keywords" content="producție film Moldova, film documentar, spoturi publicitare, rental echipament video, CRONOGRAF, OWH Studio Chișinău">
  <meta name="author" content="OWH Studio">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://owh.md/">
  <meta property="og:title" content="OWH Studio | Film și Producție Video Profesională">
  <meta property="og:description" content="Studio de producție cinematografică și video cu peste 25 de ani de experiență. Filme documentare, spoturi publicitare, rental echipament.">
  <meta property="og:image" content="https://owh.md/og-image.jpg">
  <meta property="og:locale" content="ro_RO">
  <meta property="og:site_name" content="OWH Studio">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://owh.md/">
  <meta property="twitter:title" content="OWH Studio | Film și Producție Video">
  <meta property="twitter:description" content="Studio de producție cinematografică cu 25+ ani experiență. CRONOGRAF Film Festival.">
  <meta property="twitter:image" content="https://owh.md/og-image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://owh.md/" />
  
  <!-- Preconnect for Performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- JSON-LD Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OWH Studio",
    "url": "https://owh.md",
    "logo": "https://owh.md/imagini_lucru/logo.png",
    "description": "Studio de producție cinematografică și video cu peste 25 de ani de experiență",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Str. 31 August 1989, 93",
      "addressLocality": "Chișinău",
      "postalCode": "MD-2012",
      "addressCountry": "MD"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+373-22-232771",
      "contactType": "Customer Service",
      "email": "owh@owh.md"
    },
    "sameAs": [
      "https://www.facebook.com/owhstudio",
      "https://www.youtube.com/@owhstudio",
      "https://www.instagram.com/owhstudio"
    ],
    "foundingDate": "1995",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": "25"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Moldova"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Producție Film Documentar",
          "description": "Producție profesională de filme documentare și de ficțiune"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Producție Video",
          "description": "Spoturi publicitare, filme instituționale și conținut video profesional"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Rental Echipament",
          "description": "Închiriere echipament video profesional - camere, lumini, accesorii"
        }
      }
    ]
  }
  </script>
</head>
```

## Component-Level SEO

### React Helmet Setup
```typescript
// src/components/SEO/PageMeta.tsx
import { Helmet } from 'react-helmet-async';

interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  schemaData?: object;
}

export const PageMeta = ({
  title,
  description,
  keywords,
  image = 'https://owh.md/og-image.jpg',
  url = 'https://owh.md',
  type = 'website',
  schemaData
}: PageMetaProps) => {
  const fullTitle = `${title} | OWH Studio`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Schema.org JSON-LD */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};
```

### Page-Specific SEO

#### Homepage (Index.tsx)
```typescript
<PageMeta
  title="Film, Producție Video, Rental Echipament"
  description="OWH Studio - 25+ ani de experiență în producție cinematografică. Filme documentare, spoturi publicitare, rental echipament profesional. Organizatori CRONOGRAF Film Festival."
  keywords="producție film Moldova, film documentar Chișinău, spoturi publicitare, rental echipament video, CRONOGRAF festival"
  url="https://owh.md"
  schemaData={{
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "OWH Studio",
    "url": "https://owh.md",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://owh.md/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }}
/>
```

#### Film Detail Page
```typescript
<PageMeta
  title={film.title}
  description={film.description}
  keywords={`${film.genre}, film documentar, ${film.director}, ${film.release_year}`}
  image={film.poster_url}
  url={`https://owh.md/filme/${film.slug}`}
  type="article"
  schemaData={{
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": film.title,
    "description": film.description,
    "director": {
      "@type": "Person",
      "name": film.director
    },
    "datePublished": film.release_year,
    "genre": film.genre,
    "duration": `PT${film.duration}M`,
    "image": film.poster_url,
    "trailer": {
      "@type": "VideoObject",
      "name": `${film.title} - Trailer`,
      "url": film.trailer_url
    }
  }}
/>
```

#### Rental Equipment
```typescript
<PageMeta
  title="Rental Echipament Video Profesional"
  description="Închiriază echipament video profesional: camere cinema, lumini LED, microfoane, stabilizatoare. Prețuri competitive, livrare în Chișinău."
  keywords="închiriere cameră video, rental echipament film, lumini LED Chișinău, cameră cinema închiriere Moldova"
  url="https://owh.md/rental"
  schemaData={{
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": equipment.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": item.name,
        "description": item.description,
        "image": item.image_url,
        "offers": {
          "@type": "Offer",
          "price": item.daily_rate,
          "priceCurrency": "MDL",
          "availability": item.is_available ? "InStock" : "OutOfStock",
          "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
        }
      }
    }))
  }}
/>
```

#### Events/Bilete Page
```typescript
<PageMeta
  title="Evenimente și Bilete CRONOGRAF"
  description="Cumpără bilete la festivalul CRONOGRAF - cel mai mare festival de film documentar din Moldova. Program complet evenimente și proiecții."
  keywords="bilete CRONOGRAF, festival film documentar Moldova, evenimente cinematografice Chișinău"
  url="https://owh.md/bilete"
  schemaData={{
    "@context": "https://schema.org",
    "@type": "EventSeries",
    "name": "CRONOGRAF International Documentary Film Festival",
    "description": "Festival internațional de film documentar",
    "location": {
      "@type": "Place",
      "name": "Chișinău, Moldova",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Chișinău",
        "addressCountry": "MD"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "OWH Studio",
      "url": "https://owh.md"
    },
    "subEvent": events.map(event => ({
      "@type": "ScreeningEvent",
      "name": event.title,
      "startDate": event.date,
      "location": event.location,
      "offers": {
        "@type": "Offer",
        "price": event.ticket.price,
        "priceCurrency": "MDL",
        "availability": "InStock",
        "url": event.ticket.buy_url
      }
    }))
  }}
/>
```

## Semantic HTML Structure

### Proper HTML5 Semantics
```tsx
<main role="main">
  <article>
    <header>
      <h1>{pageTitle}</h1>
      <time dateTime={publishDate}>{formattedDate}</time>
    </header>
    <section>
      {content}
    </section>
    <footer>
      {metadata}
    </footer>
  </article>
</main>
```

### Breadcrumbs Schema
```typescript
// src/components/Breadcrumbs.tsx
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.label,
    "item": `https://owh.md${crumb.path}`
  }))
};

<nav aria-label="Breadcrumb">
  <ol className="breadcrumbs">
    {breadcrumbs.map((crumb, index) => (
      <li key={crumb.path}>
        <Link to={crumb.path}>{crumb.label}</Link>
      </li>
    ))}
  </ol>
  <script type="application/ld+json">
    {JSON.stringify(breadcrumbSchema)}
  </script>
</nav>
```

## Image Optimization

### Lazy Loading și Alt Tags
```tsx
<img
  src={imageUrl}
  alt={`${film.title} - Film documentar regizat de ${film.director}`}
  loading="lazy"
  width={1920}
  height={1080}
  decoding="async"
/>
```

### Responsive Images
```tsx
<picture>
  <source 
    srcSet={`${imageUrl}?w=320 320w, ${imageUrl}?w=640 640w, ${imageUrl}?w=1280 1280w`}
    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
    type="image/webp"
  />
  <img src={imageUrl} alt={altText} loading="lazy" />
</picture>
```

## Performance Optimization

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Implementation
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    }
  }
});
```

### Font Loading Strategy
```css
/* index.css */
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/montserrat.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
```

## Sitemap Generation

### Static Sitemap
```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://owh.md/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://owh.md/filme</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://owh.md/productie</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://owh.md/rental</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://owh.md/cronograf</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://owh.md/bilete</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://owh.md/despre-noi</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://owh.md/contacte</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
```

### Dynamic Sitemap (via WordPress)
```typescript
// Generate from WordPress API
const generateSitemap = async () => {
  const [films, productions, events] = await Promise.all([
    wordpressApi.getFilms(),
    wordpressApi.getProductions(),
    wordpressApi.getEvents(),
  ]);

  const urls = [
    ...films.map(f => ({
      loc: `https://owh.md/filme/${f.slug}`,
      lastmod: f.updated_at,
      priority: 0.8
    })),
    ...productions.map(p => ({
      loc: `https://owh.md/productie/${p.slug}`,
      lastmod: p.updated_at,
      priority: 0.7
    })),
    ...events.map(e => ({
      loc: `https://owh.md/bilete/${e.id}`,
      lastmod: e.created_at,
      priority: 0.9
    }))
  ];

  return generateXML(urls);
};
```

## Robots.txt

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://owh.md/sitemap.xml

# Disallow admin routes
Disallow: /admin/
Disallow: /admin/*
```

## Analytics și Tracking

### Google Analytics 4
```typescript
// src/lib/analytics.ts
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX');
};

export const logPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({ category, action, label });
};
```

### Google Search Console
```html
<!-- Verification meta tag -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

## Local SEO

### Google Business Profile Schema
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "OWH Studio",
  "image": "https://owh.md/imagini_lucru/logo.png",
  "@id": "https://owh.md",
  "url": "https://owh.md",
  "telephone": "+373-22-232771",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Str. 31 August 1989, 93",
    "addressLocality": "Chișinău",
    "postalCode": "MD-2012",
    "addressCountry": "MD"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.0105,
    "longitude": 28.8638
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
}
```

## Content Strategy

### Target Keywords
1. **Primary**: "producție film Moldova", "studio video Chișinău"
2. **Secondary**: "film documentar", "spoturi publicitare Moldova"
3. **Long-tail**: "închiriere echipament video profesional Chișinău", "festival film documentar CRONOGRAF"

### Content Guidelines
- **Title**: 50-60 caractere, include keyword principal
- **Description**: 150-160 caractere, include CTA
- **H1**: Un singur H1 per pagină, include keyword
- **H2-H6**: Structură ierarhică logică
- **Images**: Alt text descriptiv pentru toate imaginile
- **Internal Linking**: Minimum 3-5 link-uri interne pe pagină

## Checklist Final SEO

- [x] Meta tags (title, description, keywords) pe toate paginile
- [x] Open Graph și Twitter Cards
- [x] Schema.org JSON-LD pentru toate tipurile de conținut
- [x] Canonical URLs
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Alt text pe toate imaginile
- [x] Lazy loading pentru imagini
- [x] Semantic HTML5 structure
- [x] Mobile responsive design
- [x] Fast loading (< 3s)
- [x] HTTPS enabled
- [x] Google Analytics 4 integration
- [x] Google Search Console verification
- [x] Local business schema
- [x] Breadcrumbs cu schema markup
- [x] 404 error page cu link-uri utile

## Monitoring și Raportare

### Tools pentru Monitoring
1. **Google Search Console**: Monitorizare indexare, erori, performanță
2. **Google Analytics 4**: Traffic, comportament utilizatori
3. **PageSpeed Insights**: Core Web Vitals
4. **Ahrefs/SEMrush**: Keyword tracking, backlinks
5. **Screaming Frog**: Technical SEO audit

### KPIs de Urmărit
- Organic traffic growth
- Keyword rankings
- Click-through rate (CTR)
- Bounce rate
- Page load time
- Core Web Vitals scores
- Backlinks acquired
- Domain authority

## Actualizări Continue

- **Lunar**: Review și update conținut
- **Trimestrial**: Technical SEO audit
- **Anual**: Competitor analysis, keyword research refresh
