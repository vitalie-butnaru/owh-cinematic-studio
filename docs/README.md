# 📚 OWH Studio - Documentație Completă

## 🎯 Prezentare Generală

**OWH Studio** este o platformă web modernă pentru studioul de producție cinematografică și video OWH din Chișinău, Moldova. Platforma oferă:

- 🎬 Prezentare filme și producții video
- 📺 Management emisiuni TV și seriale
- 🎥 Sistem rental echipament profesional
- 📝 Blog și arhivă articole
- 🎪 Informații despre CRONOGRAF Film Festival
- 👥 Prezentare echipă
- 📧 Sistem de contact și notificări email

---

## 📖 Structura Documentației

### 1. [ARCHITECTURE.md](./ARCHITECTURE.md)
**Arhitectura Tehnică Completă**
- Stack tehnologic (React, TypeScript, Tailwind CSS)
- Structura de foldere și organizare cod
- Integrare WordPress CMS
- State management cu React Query și Zustand
- Design system și componente UI

### 2. [WORDPRESS_INTEGRATION.md](./WORDPRESS_INTEGRATION.md)
**Integrare WordPress CMS**
- Configurare WordPress ca headless CMS
- Plugin OWH API - documentație completă
- Custom Post Types și ACF fields
- REST API endpoints
- Sincronizare date și caching

### 3. [WORDPRESS_API.md](./WORDPRESS_API.md)
**WordPress REST API - Referință Tehnică**
- Endpoints disponibile pentru toate entitățile
- Parametri query și filtrare
- Exemple de request/response
- Rate limiting și best practices

### 4. [SEO_OPTIMIZATION.md](./SEO_OPTIMIZATION.md)
**Optimizare SEO**
- Meta tags și Open Graph
- Schema.org structured data
- Performance optimization
- Mobile-first approach
- Best practices SEO

### 5. [DEPLOYMENT.md](./DEPLOYMENT.md)
**Ghid Deployment**
- Setup WordPress CMS pe cms.owh.md
- Deployment frontend pe Lovable
- Configurare DNS și SSL
- Email setup cu Resend
- Monitoring și backup

### 6. [BRANDBOOK.md](../BRANDBOOK.md)
**Brand Guidelines**
- Identitate vizuală OWH Studio
- Paleta de culori
- Tipografie
- Logo usage
- Voice & tone

---

## 🚀 Quick Start

### Instalare Locală

```bash
# Clone repository
git clone https://github.com/owh-studio/website.git
cd website

# Instalare dependențe
npm install

# Configurare environment
cp .env.example .env.local
# Editează .env.local cu datele tale

# Start development server
npm run dev
```

### Accesare

- **Frontend Dev:** http://localhost:5173
- **WordPress CMS:** https://cms.owh.md/wp-admin
- **Admin Panel:** http://localhost:5173/admin

---

## 🏗️ Stack Tehnologic

### Frontend
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool ultra-rapid
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Component library
- **React Router** - Routing
- **React Query** - Server state management
- **Zustand** - Client state management
- **Framer Motion** - Animations

### Backend & CMS
- **WordPress** - Headless CMS (cms.owh.md)
- **Custom Plugin (owh-api)** - REST API personalizat
- **Advanced Custom Fields (ACF)** - Custom fields
- **Lovable Cloud** - Backend automat (Supabase)
- **Supabase** - Database, Auth, Storage

### Infrastructure
- **Lovable** - Hosting frontend
- **Resend** - Email service
- **Let's Encrypt** - SSL/HTTPS

---

## 📁 Structura Proiect

```
owh-studio/
├── docs/                    # Documentație completă
│   ├── ARCHITECTURE.md      # Arhitectură tehnică
│   ├── WORDPRESS_API.md     # API documentation
│   ├── WORDPRESS_INTEGRATION.md
│   ├── SEO_OPTIMIZATION.md
│   ├── DEPLOYMENT.md
│   └── README.md            # Acest fișier
│
├── src/
│   ├── components/          # React components
│   │   ├── SEO/            # SEO components (PageMeta)
│   │   ├── admin/          # Admin panel components
│   │   ├── portfolio/      # Portfolio gallery
│   │   ├── rental/         # Rental system
│   │   └── ui/             # Shadcn UI components
│   │
│   ├── pages/              # Page components (routes)
│   │   ├── admin/          # Admin pages
│   │   ├── auth/           # Authentication
│   │   ├── BlogPage.tsx
│   │   ├── FilmePage.tsx
│   │   ├── ProductiePage.tsx
│   │   └── ...
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── wordpress/      # WordPress API hooks
│   │       ├── useFilms.ts
│   │       ├── useProductions.ts
│   │       ├── useBlog.ts
│   │       └── ...
│   │
│   ├── lib/                # Utility libraries
│   │   └── api/
│   │       └── wordpress-client.ts  # WordPress API client
│   │
│   ├── types/              # TypeScript type definitions
│   │   └── wordpress.ts
│   │
│   ├── config/             # Configuration files
│   │   └── wordpress.ts    # WordPress config & endpoints
│   │
│   ├── integrations/       # External integrations
│   │   └── supabase/       # Supabase client & types
│   │
│   └── index.css           # Global styles & design tokens
│
├── supabase/
│   ├── functions/          # Edge functions
│   │   ├── send-contact-email/
│   │   └── send-rental-email/
│   └── config.toml         # Supabase config
│
├── public/
│   ├── robots.txt          # SEO robots file
│   └── ...
│
└── owh-api/                # WordPress plugin (separate deployment)
    ├── acf-json/           # ACF field groups
    ├── inc/                # Core plugin functionality
    └── owh-api.php
```

---

## 🎨 Design System

### Culori Principale

```css
/* Design tokens din index.css */
--cinema-orange: #FF6B35;      /* Primary brand color */
--cinema-gold: #F7931E;        /* Secondary accent */
--cinema-darker: #0A0A0A;      /* Dark backgrounds */
--cinema-dark: #1A1A1A;        /* Card backgrounds */
```

### Componente UI

Toate componentele folosesc **Shadcn/ui** cu customizări pentru brand:

- **Button** - Multiple variante (default, outline, ghost, premium)
- **Card** - Layout containers cu hover effects
- **Badge** - Tags și labels
- **Dialog/Sheet** - Modals și drawers
- **Form** - Input fields cu validare
- **Skeleton** - Loading states

### Animations

```css
/* Definite în index.css */
.hover-lift     /* Lift effect on hover */
.shadow-glow    /* Glow shadow effect */
.gradient-text  /* Gradient text color */
```

---

## 🔌 API Integration

### WordPress REST API

Toate datele de conținut vin din WordPress CMS:

```typescript
// Exemplu de utilizare
import { useFilms } from '@/hooks/wordpress';

const { data: films, isLoading } = useFilms({
  category: 'documentare',
  per_page: 10,
  orderby: 'date',
});
```

### Endpoints Principale

```
GET /wp-json/owh/v1/films
GET /wp-json/owh/v1/productions
GET /wp-json/owh/v1/series
GET /wp-json/owh/v1/posts
GET /wp-json/owh/v1/equipment
GET /wp-json/owh/v1/team
GET /wp-json/owh/v1/events
```

Vezi [WORDPRESS_API.md](./WORDPRESS_API.md) pentru documentație completă.

---

## 🔐 Autentificare & Securitate

### Admin Panel

Acces restricționat cu **Supabase Auth**:
- Email/password authentication
- Role-based access control (RBAC)
- Session management
- Protected routes

### Security Features

- **RLS (Row Level Security)** pentru database
- **CORS** configurat corect
- **Rate limiting** pe API
- **SSL/HTTPS** obligatoriu
- **Content Security Policy** headers

---

## 📧 Email Notifications

### Sistem Resend

Două tipuri de notificări email:

1. **Contact Form** (`send-contact-email`)
   - Notificare admin
   - Confirmare client

2. **Rental Request** (`send-rental-email`)
   - Detalii comandă pentru admin
   - Confirmare și instrucțiuni pentru client

Vezi [DEPLOYMENT.md](./DEPLOYMENT.md) pentru configurare.

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Toate paginile se încarcă corect
- [ ] Formulare funcționează
- [ ] Email notifications trimit
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility
- [ ] SEO meta tags prezente
- [ ] Performance (PageSpeed Insights)

### Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

---

## 🐛 Debugging & Troubleshooting

### Common Issues

**1. WordPress API nu răspunde**
```bash
# Verifică CORS în wp-config.php
# Verifică permalink structure
# Verifică plugin OWH API activat
```

**2. Build errors**
```bash
npm run clean
npm install
npm run build
```

**3. Email nu se trimite**
- Verifică RESEND_API_KEY în secrets
- Verifică DNS records pentru domeniu
- Check logs în Resend dashboard

**4. Images nu se încarcă**
- Verifică URL-uri în WordPress
- Verifică permissions pe folder uploads/
- Check CORS headers

---

## 📈 Roadmap & Features

### ✅ Implementat

- [x] WordPress CMS integration
- [x] Blog system complet
- [x] Rental system cu calendar
- [x] Portfolio gallery cu filtrare
- [x] Admin panel pentru management
- [x] Email notifications (Resend)
- [x] SEO optimization completă
- [x] Mobile responsive design
- [x] Performance optimization

### 🚧 În Dezvoltare

- [ ] Multi-language support (RO/EN)
- [ ] Advanced analytics dashboard
- [ ] Video player integrat
- [ ] Online payment pentru rental
- [ ] Search functionality global
- [ ] Newsletter subscription

### 💡 Feature Ideas

- User reviews pentru filme
- Event booking system pentru CRONOGRAF
- Interactive equipment showcase
- Behind-the-scenes content section
- Alumni network pentru cursanți

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch
```bash
git checkout -b feature/amazing-feature
```

2. Make changes și commit
```bash
git add .
git commit -m "Add amazing feature"
```

3. Push to branch
```bash
git push origin feature/amazing-feature
```

4. Create Pull Request

### Code Style

- **ESLint** pentru linting
- **Prettier** pentru formatting
- **TypeScript** strict mode
- **Conventional Commits** pentru messages

---

## 📞 Support & Contact

**OWH Studio**
- 🌐 Website: https://owh.md
- 📧 Email: owh@owh.md
- 📞 Telefon: +373 22 232771
- 📍 Adresă: Str. 31 August 1989, 93, Chișinău, Moldova

**Technical Support**
- Documentation: [docs/](./docs/)
- Issues: GitHub Issues
- Lovable Support: https://docs.lovable.dev/

---

## 📄 License

© 2024 OWH Studio. All rights reserved.

---

## 🙏 Credits

**Echipa OWH Studio**
- Development Team
- Design Team
- Content Team

**Technologies Used**
- React Team
- Vercel (Lovable)
- WordPress Community
- Open Source Contributors

---

**Versiune Documentație:** 2.0.0  
**Ultima Actualizare:** 2024  
**Status:** ✅ Production Ready

---

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [Lovable Documentation](https://docs.lovable.dev/)
- [Supabase Docs](https://supabase.com/docs)

---

Pentru întrebări sau sugestii, contactați echipa OWH Studio. 🎬✨
