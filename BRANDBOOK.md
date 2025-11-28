# OWH Studio - Design Brandbook

## 📐 Design System Overview

Acest document definește sistemul complet de design pentru OWH Studio, asigurând consistență vizuală și o experiență de brand coerentă pe toate platformele.

---

## 🎨 Paleta de Culori

### Culori Primare

**Cinema Orange (Principal)**
- HSL: `24 100% 55%`
- RGB: `rgb(255, 120, 0)`
- HEX: `#FF7800`
- **Utilizare**: Logo, butoane primare, accenturi importante, call-to-action
- **Variante**:
  - Primary Glow: `24 100% 65%` - pentru efecte de strălucire
  - Primary Dark: `24 100% 45%` - pentru hover states

### Culori de Fundal

**Cinema Dark (Fundal Principal)**
- HSL: `220 25% 4%`
- **Utilizare**: Background principal, secțiuni dark

**Cinema Darker (Fundal Secundar)**
- HSL: `220 28% 3%`
- **Utilizare**: Footer, secțiuni alternative

**Background Card**
- HSL: `220 20% 6%`
- **Utilizare**: Card-uri, popover-uri, elemente ridicate

### Culori de Text

**Foreground (Text Principal)**
- HSL: `0 0% 98%`
- **Utilizare**: Text principal, headlines

**Muted Foreground (Text Secundar)**
- HSL: `0 0% 70%`
- **Utilizare**: Text descriptiv, subtitluri

### Culori Funcționale

**Secondary**
- HSL: `220 20% 10%`
- **Utilizare**: Butoane secundare, hover states

**Border**
- HSL: `220 15% 15%`
- **Utilizare**: Margini, separatoare

**Accent**
- HSL: `24 100% 55%` (identic cu Cinema Orange)
- **Utilizare**: Elemente interactive, link-uri

---

## 🔤 Tipografie

### Font Families

**Heading Font: Montserrat**
```css
font-family: 'Montserrat', sans-serif;
```
- **Utilizare**: Titluri (H1-H6), navigare, butoane importante
- **Greutăți disponibile**: 400, 500, 600, 700, 800
- **Caracteristici**: Modern, bold, geometric

**Body Font: Inter**
```css
font-family: 'Inter', sans-serif;
```
- **Utilizare**: Text paragrafe, descrieri, formulare
- **Greutăți disponibile**: 300, 400, 500, 600
- **Caracteristici**: Excellent readability, profesional

### Scara Tipografică

```css
/* Desktop */
h1: 3.5rem (56px) - font-heading, font-bold
h2: 2.5rem (40px) - font-heading, font-bold
h3: 2rem (32px) - font-heading, font-semibold
h4: 1.5rem (24px) - font-heading, font-semibold
h5: 1.25rem (20px) - font-heading, font-medium
h6: 1rem (16px) - font-heading, font-medium

body: 1rem (16px) - font-body, font-normal
small: 0.875rem (14px) - font-body, font-normal
```

### Mobile Typography
```css
h1: 2.5rem (40px)
h2: 2rem (32px)
h3: 1.75rem (28px)
```

---

## 📏 Spacing & Layout

### Container
- Max-width: `1400px`
- Padding: `2rem` (32px) desktop, `1rem` (16px) mobile
- Centrat automat

### Spacing Scale
```css
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
4xl: 6rem (96px)
```

### Section Padding
- Desktop: `py-24` (96px vertical)
- Mobile: `py-16` (64px vertical)

---

## 🎭 Componente UI

### Butoane

**Primary Button**
```css
Background: hsl(24 100% 55%)
Color: white
Padding: 0.75rem 2rem
Border-radius: 0.5rem
Font: Montserrat, 600
Hover: scale(1.02), shadow-glow
```

**Secondary Button**
```css
Background: hsl(220 20% 10%)
Color: hsl(0 0% 98%)
Border: 1px solid hsl(220 15% 15%)
Hover: bg-secondary/80
```

**Outline Button**
```css
Background: transparent
Border: 2px solid hsl(24 100% 55%)
Color: hsl(24 100% 55%)
Hover: bg-primary, color-white
```

### Card-uri

```css
Background: hsl(220 20% 6%)
Border-radius: 0.5rem
Padding: 1.5rem
Box-shadow: var(--shadow-card)
Hover: transform translateY(-6px), shadow-glow
Transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Input Fields

```css
Background: hsl(220 15% 15%)
Border: 1px solid hsl(220 15% 15%)
Border-radius: 0.5rem
Padding: 0.75rem 1rem
Color: hsl(0 0% 98%)
Focus: ring(2px, hsl(24 100% 55%))
```

---

## ✨ Efecte & Animații

### Gradients

**Primary Gradient**
```css
--gradient-primary: linear-gradient(135deg, hsl(24 100% 55%), hsl(24 100% 65%));
```
- Utilizare: Text gradient, backgrounds speciale

**Dark Gradient**
```css
--gradient-dark: linear-gradient(180deg, hsl(220 25% 4%), hsl(220 28% 3%));
```
- Utilizare: Hero sections, overlays

**Overlay Gradient**
```css
--gradient-overlay: linear-gradient(180deg, transparent, hsl(220 25% 4% / 0.9));
```
- Utilizare: Image overlays

### Shadows

**Glow Shadow**
```css
--shadow-glow: 0 0 40px hsl(24 100% 55% / 0.3);
```
- Utilizare: Hover effects, active elements

**Card Shadow**
```css
--shadow-card: 0 4px 20px hsl(220 25% 0% / 0.4);
```
- Utilizare: Cards, elevated elements

### Hover Effects

**Hover Lift**
```css
.hover-lift:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-glow);
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Hover Zoom (pentru imagini)**
```css
.hover-zoom:hover img {
  transform: scale(1.08);
  transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Hover Glow**
```css
.hover-glow:hover {
  filter: drop-shadow(0 0 20px hsl(24 100% 55% / 0.5));
  transform: translateY(-2px);
}
```

### Animații de Intrare

**Fade Up**
```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* Aplicare: animate-fade-up, duration: 0.8s */
```

**Fade In**
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* Aplicare: animate-fade-in, duration: 0.6s */
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
2xl: 1400px /* Large desktop */
```

### Design Guidelines per Device

**Mobile (< 768px)**
- Single column layouts
- Full-width cards
- Hamburger menu obligatoriu
- Font-size redus cu 20-30%
- Padding redus la jumătate

**Tablet (768px - 1024px)**
- 2 coloane pentru grid-uri
- Menu hybrid (partial vizibil)
- Font-size la 90% din desktop

**Desktop (> 1024px)**
- 3-4 coloane pentru grid-uri
- Full navigation menu
- Efecte hover complete
- Animații parallax

---

## 🎬 Imagini & Media

### Aspect Ratios

- **Hero Images**: 16:9
- **Film Posters**: 2:3 (portrait)
- **Production Thumbnails**: 16:9
- **Team Photos**: 1:1 (square)
- **Equipment Photos**: 4:3

### Image Treatment

```css
/* Overlay standard pentru imagini */
.image-overlay {
  position: relative;
}
.image-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, hsl(220 25% 4% / 0.8));
}
```

### Loading States

```css
/* Skeleton pentru loading */
.skeleton {
  background: linear-gradient(
    90deg,
    hsl(220 15% 12%) 25%,
    hsl(220 15% 15%) 50%,
    hsl(220 15% 12%) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}
```

---

## 🧩 Iconografie

### Icon Library: Lucide React

**Dimensiuni Standard**
- Small: 16px
- Medium: 20px
- Large: 24px
- XLarge: 32px

**Culori**
- Primary icons: `hsl(24 100% 55%)`
- Secondary icons: `hsl(0 0% 70%)`
- Muted icons: `hsl(0 0% 50%)`

---

## 🌐 Navigare

### Header

```css
Height: 80px (5rem)
Background: Transparent → Glass effect on scroll
Position: Fixed, top: 0, z-index: 50
Transition: all 0.3s ease

/* Scrolled state */
.scrolled {
  background: hsl(220 20% 6% / 0.7);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 6px hsl(220 25% 0% / 0.1);
}
```

### Footer

```css
Background: hsl(220 28% 3%)
Border-top: 1px solid hsl(220 15% 15%)
Padding: 3rem 0
Grid: 4 columns (desktop), 1 column (mobile)
```

---

## ♿ Accessibility

### Contrast Ratios
- Normal text: minimum 4.5:1
- Large text: minimum 3:1
- Interactive elements: minimum 3:1

### Focus States
```css
focus-visible:ring-2
focus-visible:ring-primary
focus-visible:ring-offset-2
focus-visible:ring-offset-background
```

### Screen Reader Support
- Toate imaginile au `alt` text descriptiv
- Butoane interactive au `aria-label`
- Form fields au `label` asociate
- Skip links pentru navigare rapidă

---

## 📊 Performance Guidelines

### Optimizări Imagini
- Format: WebP cu fallback JPG
- Lazy loading pentru imagini off-screen
- Responsive images cu `srcset`
- Max file size: 200KB pentru hero, 100KB pentru thumbnails

### Animații
- Folosește `transform` și `opacity` (hardware accelerated)
- Evită animații pe `width`, `height`, `top`, `left`
- Durata maximă: 1s pentru animații complexe
- Folosește `will-change` cu precauție

### Code Splitting
- Lazy load componente admin
- Lazy load modale și dialogs
- Preload imagini critice

---

## 🎯 Brand Voice

### Tonul Comunicării
- **Profesional** dar **prietenos**
- **Confident** fără a fi arogant
- **Creativ** și **inspirațional**
- **Clar** și **concis**

### Mesaje Cheie
- "30+ ani de experiență în producția cinematografică"
- "Povestim istorii care contează"
- "De la concept la ecran"
- "Producție cinematografică profesională în Moldova"

---

## 📋 Checklist Implementare

### Pentru fiecare pagină nouă:
- [ ] Folosește culori din sistemul de design (HSL values)
- [ ] Aplică font-urile Montserrat (headings) și Inter (body)
- [ ] Implementează animații fade-up pentru secțiuni
- [ ] Asigură responsive pe toate breakpoint-urile
- [ ] Testează contrast-ul pentru accessibility
- [ ] Optimizează imaginile (WebP, lazy loading)
- [ ] Adaugă hover effects pe elemente interactive
- [ ] Verifică focus states pentru keyboard navigation
- [ ] Testează pe mobile, tablet și desktop
- [ ] Verifică timpii de încărcare (<3s)

---

## 🔄 Mentenanță

### Update-uri Periodice
- Review colors la fiecare 6 luni
- Update dependencies lunar
- Performance audit trimestrial
- Accessibility audit semestrial

### Documentație
- Documentează toate componentele noi
- Menține screenshots pentru componente
- Update brandbook la modificări majore

---

## 📞 Contact Design System

Pentru întrebări despre design system:
- Design Lead: design@owh.md
- Technical Lead: dev@owh.md

---

**Versiune**: 1.0  
**Ultima actualizare**: Noiembrie 2024  
**Status**: Active

© 2024 OWH Studio. Toate drepturile rezervate.
