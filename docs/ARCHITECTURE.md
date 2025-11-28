# OWH Studio - Enterprise Architecture

## 🏗️ Structura Proiectului

```
src/
├── config/              # Configurări centralizate
│   └── wordpress.ts     # WordPress API configuration
├── types/              # TypeScript type definitions
│   └── wordpress.ts    # Complete WordPress entity types
├── lib/
│   └── api/
│       └── wordpress-client.ts  # HTTP client cu retry logic
├── hooks/
│   └── wordpress/      # React Query hooks (enterprise-grade)
│       ├── useFilms.ts
│       ├── useProductions.ts
│       ├── useBlog.ts
│       ├── useEquipment.ts
│       ├── useSeries.ts
│       ├── useTeam.ts
│       ├── useProjects.ts
│       ├── useEvents.ts
│       ├── useSettings.ts
│       └── index.ts    # Barrel export
├── components/
│   ├── portfolio/
│   │   └── PortfolioGallery.tsx  # Advanced gallery with filters
│   └── rental/
│       ├── RentalCart.tsx        # Zustand state management
│       └── RentalCalendar.tsx    # Date picker with availability
└── pages/
    ├── BlogPage.tsx
    ├── BlogPostPage.tsx
    └── ... (existing pages)
```

## 🚀 Features Implementate

### 1. WordPress API Integration
- ✅ Singleton HTTP client cu retry logic
- ✅ Timeout management (10s)
- ✅ Automatic retries cu exponential backoff
- ✅ Error handling și normalizare
- ✅ Query parameters builder
- ✅ Type-safe endpoints

### 2. React Query Hooks
- ✅ Cache management cu staleTime și gcTime
- ✅ Infinite scroll support pentru toate entitățile
- ✅ Prefetching capabilities
- ✅ Optimistic updates support
- ✅ Query invalidation patterns
- ✅ Type-safe query keys factory

### 3. Blog System
- ✅ Posts listing cu infinite scroll
- ✅ Single post page cu related posts
- ✅ Categories și tags filtering
- ✅ Search functionality
- ✅ Author bios
- ✅ Social sharing
- ✅ Reading time estimation

### 4. Portfolio Gallery
- ✅ Advanced filtering (category, year, client)
- ✅ Search functionality
- ✅ Multi-sort options
- ✅ Infinite scroll
- ✅ Responsive grid layout
- ✅ Lazy loading images
- ✅ Performance optimized

### 5. Enhanced Rental System
- ✅ Zustand global state pentru cart
- ✅ Persistent cart (localStorage)
- ✅ Calendar cu date picker
- ✅ Availability checking
- ✅ Price calculator
- ✅ Multi-item support
- ✅ Date range validation

## 🔧 Configurare

### Environment Variables
```env
VITE_WP_API_URL=https://cms.owh.md/wp-json/owh/v1
```

### WordPress Plugin Required
Plugin: `owh-api` (deja instalat pe cms.owh.md)

## 📊 Performance Optimizations

1. **React Query Caching**
   - staleTime: 2 minutes
   - cacheTime: 5 minutes
   - Automatic garbage collection

2. **Infinite Scroll**
   - 12 items per page
   - Automatic next page fetching
   - Smooth loading states

3. **Image Optimization**
   - Lazy loading
   - Aspect ratio preservation
   - Responsive images

4. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

## 🎯 Best Practices

- ✅ TypeScript strict mode
- ✅ ESLint configured
- ✅ Consistent naming conventions
- ✅ Error boundaries
- ✅ Loading states
- ✅ Empty states
- ✅ Accessibility (ARIA labels)
- ✅ SEO optimization
- ✅ Mobile-first design

## 🔐 Security

- CORS properly configured
- Read-only API access from frontend
- Environment variables for sensitive data
- XSS protection via React
- Input sanitization

## 📱 Responsive Design

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Ultra-wide: > 1920px

Toate componentele sunt 100% responsive!
