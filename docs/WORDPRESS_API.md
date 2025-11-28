# WordPress API Integration

Acest document descrie integrarea dintre frontend-ul Lovable și backend-ul WordPress care servește ca CMS.

## Configurare

### Environment Variables

Adaugă în fișierul `.env`:

```env
VITE_WP_API_URL=https://owh.md/wp-json/owh/v1
```

## Structura API-ului

Toate endpoint-urile sunt servite de pluginul custom `owh-api` instalat în WordPress.

### Endpoints Disponibile

#### 1. Filme
- **GET** `/films` - Toate filmele
- **GET** `/films?category={category}` - Filme pe categorii
  - Categorii disponibile: `documentare`, `fictiune`, `prezentare`, `publicitate`, `altele`
- **GET** `/films/{slug}` - Film individual

#### 2. Producții Video
- **GET** `/productions` - Toate producțiile
- **GET** `/productions?category={category}` - Producții pe categorii
  - Categorii: `publicitate`, `spoturi_sociale`, `filme_institutionale`, `animatii`, `emisiuni`
- **GET** `/productions/{slug}` - Producție individuală

#### 3. Emisiuni TV (Series)
- **GET** `/series` - Toate emisiunile
- **GET** `/series/{slug}` - Emisiune individuală
- **GET** `/series/{slug}/episodes` - Episoadele unei emisiuni

#### 4. Echipament Rental
- **GET** `/equipment` - Tot echipamentul
- **GET** `/equipment?category={category}` - Echipament pe categorii
- **GET** `/equipment/{slug}` - Echipament individual

#### 5. Echipa
- **GET** `/team` - Toți membrii echipei
- **GET** `/team/{id}` - Membru individual

#### 6. Design Settings
- **GET** `/design` - Setări de design (culori, logo, etc)

#### 7. Meniuri
- **GET** `/menus` - Structura meniurilor

## Utilizare în Frontend

### Import

```typescript
import {
  fetchFilmsFromWordPress,
  fetchFilmsByCategory,
  fetchFilmBySlug,
  fetchProductionsFromWordPress,
  fetchSeriesFromWordPress,
  // ... alte funcții
} from '@/lib/wordpress';
```

### Exemple de Utilizare

#### Fetch toate filmele documentare

```typescript
const documentaries = await fetchFilmsByCategory('documentare');
```

#### Fetch detalii film

```typescript
const film = await fetchFilmBySlug('numele-filmului');
```

#### Fetch producții publicitate

```typescript
const ads = await fetchProductionsByCategory('publicitate');
```

## Categorii Filme

Conform site-ului actual (owh.md):

1. **Documentare** (`categorie=1`) - Filme documentare organizate pe ani
2. **Ficțiune** (`categorie=2`) - Filme de ficțiune organizate pe ani
3. **Filme de prezentare** (`categorie=3`) - Prezentări corporate/instituționale
4. **Publicitate** (`categorie=pub`) 
   - Subcategorii: Campanii și Spoturi
5. **Alte producții video** (`categorie=other`)
   - Emisiuni TV
   - Videoclipuri
   - Diverse

## Categorii Producții Video

1. **publicitate** - Spoturi publicitare comerciale
2. **spoturi_sociale** - Campanii sociale și conștientizare
3. **filme_institutionale** - Video corporate și prezentări
4. **animatii** - Conținut animat
5. **emisiuni** - Producții TV

## Proiecte Speciale

Proiectele precum:
- Școala mea, Filmul meu
- Film Together
- Aidoma - Te caută inima
- Seri de Cronograf
- Filme peste Nistru
- Eu Sunt Aici
- Opriți Violența Sexuală

Pot fi accesate prin:
```typescript
const projects = await fetchProductionsByCategory('proiecte');
```

## Distribuție (Distribution)

Pentru informații despre distribuție:
```typescript
const distribution = await fetchFilmsByCategory('distributie');
```

## Sincronizare Date

Pentru a sincroniza datele dintre WordPress și Supabase (dacă este necesar), poți crea un script de import sau un edge function care:

1. Preia datele din WordPress
2. Le procesează
3. Le salvează în Supabase pentru cache/performanță

## Structura Răspunsurilor

### Film Object
```typescript
{
  id: number;
  title: string;
  slug: string;
  description: string;
  poster_url: string;
  category: string;
  year: number;
  duration?: number;
  director?: string;
  trailer_url?: string;
  genre?: string;
}
```

### Production Object
```typescript
{
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  client?: string;
  year: number;
  gif_preview_url: string;
  video_url?: string;
}
```

### Series Object
```typescript
{
  id: number;
  title: string;
  slug: string;
  description: string;
  poster_url?: string;
  is_active: boolean;
}
```

## Cache Strategy

Pentru performanță optimă, se recomandă:

1. **React Query** pentru caching automat:
```typescript
const { data: films } = useQuery({
  queryKey: ['films', category],
  queryFn: () => fetchFilmsByCategory(category),
  staleTime: 1000 * 60 * 5, // 5 minutes
});
```

2. **Supabase ca Secondary Storage** pentru date critice care necesită real-time updates

## Error Handling

Toate funcțiile returnează array-uri goale sau `null` în caz de eroare și loghează eroarea în consolă:

```typescript
try {
  const films = await fetchFilmsFromWordPress();
  if (films.length === 0) {
    // Handle empty state
  }
} catch (error) {
  // Handle error
}
```

## Securitate

- API-ul WordPress este configurat cu CORS headers corecte
- Toate request-urile sunt read-only din frontend
- Modificările de conținut se fac doar prin WordPress Admin Panel

## Migrare Date

Pentru a migra date existente din Supabase către WordPress sau invers, vezi scriptul de migrare în:
`/scripts/migrate-to-wordpress.ts`
