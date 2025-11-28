# WordPress Integration Guide - OWH Studio

## Overview
Acest ghid descrie cum să integrezi acest frontend React cu un backend WordPress pentru managementul complet al conținutului.

## Arhitectură: Headless WordPress

Frontend-ul React actual va comunica cu WordPress prin **REST API**, fără a folosi temele WordPress tradiționale.

```
[WordPress Backend]  ←→  [REST API]  ←→  [React Frontend (OWH Studio)]
   (Admin Panel)                            (This App)
```

## Setup WordPress

### 1. Instalare WordPress

Instalează WordPress pe un subdomeniu sau domeniu separat:
- **Recomandat**: `admin.owh.md` sau `cms.owh.md`
- **Alternativ**: `owh.md/wp-admin` (instalare în subdirectory)

### 2. Pluginuri Necesare

Instalează următoarele pluginuri WordPress:

#### A. **WPGraphQL** sau **REST API Extended**
Pentru expunerea datelor prin API
```bash
# Via WP-CLI
wp plugin install wp-graphql --activate
# SAU
wp plugin install rest-api-extensions --activate
```

#### B. **JWT Authentication**
Pentru autentificare securizată
```bash
wp plugin install jwt-authentication-for-wp-rest-api --activate
```

#### C. **Advanced Custom Fields (ACF) PRO**
Pentru câmpuri custom
```bash
# Descarcă de pe: https://www.advancedcustomfields.com/pro/
```

#### D. **Custom Post Type UI**
Pentru tipuri de conținut custom
```bash
wp plugin install custom-post-type-ui --activate
```

#### E. **WooCommerce** (pentru bilete și rental)
```bash
wp plugin install woocommerce --activate
```

#### F. **Event Tickets** sau **The Events Calendar**
Pentru evenimente CRONOGRAF
```bash
wp plugin install the-events-calendar --activate
wp plugin install event-tickets --activate
```

#### G. **Polylang** (opțional, pentru multilingv)
```bash
wp plugin install polylang --activate
```

### 3. Configurare Custom Post Types

Creează următoarele Custom Post Types în WordPress:

#### **Filme** (films)
```php
// functions.php sau plugin custom
register_post_type('films', [
    'labels' => [
        'name' => 'Filme',
        'singular_name' => 'Film'
    ],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
    'has_archive' => true,
]);
```

**ACF Fields pentru Filme:**
- `director` (text)
- `release_year` (number)
- `duration` (number)
- `genre` (text)
- `trailer_url` (url)
- `poster_url` (image)
- `is_featured` (true/false)

#### **Producții** (productions)
```php
register_post_type('productions', [
    'labels' => [
        'name' => 'Producții',
        'singular_name' => 'Producție'
    ],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
]);
```

**ACF Fields:**
- `category` (select: publicitate, spoturi_sociale, filme_institutionale, animatii, emisiuni)
- `client` (text)
- `year` (number)
- `video_url` (url)
- `gif_preview_url` (image)

#### **Echipament Rental** (rental_equipment)
```php
register_post_type('rental_equipment', [
    'labels' => [
        'name' => 'Echipament Rental',
        'singular_name' => 'Echipament'
    ],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
]);
```

**ACF Fields:**
- `category` (select: cameras, lighting, audio, grip)
- `daily_rate` (number)
- `specifications` (repeater: label, value)
- `is_available` (true/false)

#### **Emisiuni/Series** (series)
```php
register_post_type('series', [
    'labels' => [
        'name' => 'Emisiuni',
        'singular_name' => 'Emisiune'
    ],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
]);
```

**ACF Fields:**
- `is_active` (true/false)

#### **Evenimente** (events)
Folosește "The Events Calendar" plugin, sau creează custom:
```php
register_post_type('events', [
    'labels' => [
        'name' => 'Evenimente',
        'singular_name' => 'Eveniment'
    ],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
]);
```

**ACF Fields:**
- `event_date` (date_time_picker)
- `event_location` (text)
- `ticket_price` (number)
- `ticket_url` (url)
- `event_type` (select: film_festival, screening, workshop)

#### **Membri Echipă** (team_members)
```php
register_post_type('team_members', [
    'labels' => [
        'name' => 'Echipa',
        'singular_name' => 'Membru'
    ],
    'public' => true,
    'show_in_rest' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
]);
```

**ACF Fields:**
- `role` (text)
- `bio` (textarea)
- `video_url` (url)
- `display_order` (number)

### 4. Configurare REST API

Adaugă în `functions.php`:

```php
// Enable CORS for React frontend
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        return $value;
    });
});

// Expose ACF fields in REST API
add_filter('acf/settings/rest_api_format', function() {
    return 'standard';
});

// Custom REST endpoints
add_action('rest_api_init', function() {
    
    // Get all films with custom fields
    register_rest_route('owh/v1', '/films', [
        'methods' => 'GET',
        'callback' => function() {
            $args = [
                'post_type' => 'films',
                'posts_per_page' => -1,
                'orderby' => 'meta_value_num',
                'meta_key' => 'release_year',
                'order' => 'DESC'
            ];
            
            $posts = get_posts($args);
            $films = [];
            
            foreach($posts as $post) {
                $films[] = [
                    'id' => $post->ID,
                    'title' => $post->post_title,
                    'slug' => $post->post_name,
                    'description' => $post->post_content,
                    'director' => get_field('director', $post->ID),
                    'release_year' => get_field('release_year', $post->ID),
                    'duration' => get_field('duration', $post->ID),
                    'genre' => get_field('genre', $post->ID),
                    'trailer_url' => get_field('trailer_url', $post->ID),
                    'poster_url' => get_field('poster_url', $post->ID),
                    'is_featured' => get_field('is_featured', $post->ID),
                ];
            }
            
            return $films;
        }
    ]);
    
    // Similar routes for productions, equipment, series, events, team
    // ... (repeat pattern for each post type)
});
```

### 5. WooCommerce pentru Bilete

Configurează WooCommerce:
1. Creează produse tip "Event Ticket"
2. Conectează cu The Events Calendar
3. Expune prin REST API:

```php
add_action('rest_api_init', function() {
    register_rest_route('owh/v1', '/events-with-tickets', [
        'methods' => 'GET',
        'callback' => function() {
            // Get events with WooCommerce products attached
            $events = tribe_get_events([
                'posts_per_page' => -1,
                'eventDisplay' => 'list'
            ]);
            
            $result = [];
            foreach($events as $event) {
                $ticket_product_id = get_post_meta($event->ID, '_ticket_product_id', true);
                $product = wc_get_product($ticket_product_id);
                
                $result[] = [
                    'id' => $event->ID,
                    'title' => $event->post_title,
                    'date' => tribe_get_start_date($event),
                    'location' => tribe_get_venue($event->ID),
                    'image' => get_the_post_thumbnail_url($event->ID, 'full'),
                    'description' => $event->post_content,
                    'ticket' => [
                        'price' => $product ? $product->get_price() : 0,
                        'available' => $product ? $product->get_stock_quantity() : 0,
                        'buy_url' => $product ? $product->get_permalink() : ''
                    ]
                ];
            }
            
            return $result;
        }
    ]);
});
```

## Integrare în React Frontend

### 1. Creează WordPress API Service

```typescript
// src/services/wordpressApi.ts

const WP_API_URL = 'https://admin.owh.md/wp-json';

interface Film {
  id: number;
  title: string;
  slug: string;
  description: string;
  director: string;
  release_year: number;
  duration: number;
  genre: string;
  trailer_url: string;
  poster_url: string;
  is_featured: boolean;
}

interface Production {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  client: string;
  year: number;
  video_url: string;
  gif_preview_url: string;
}

interface Equipment {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  daily_rate: number;
  image_url: string;
  specifications: Array<{ label: string; value: string }>;
  is_available: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  ticket: {
    price: number;
    available: number;
    buy_url: string;
  };
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  video_url: string;
  display_order: number;
}

export const wordpressApi = {
  // Filme
  async getFilms(): Promise<Film[]> {
    const response = await fetch(`${WP_API_URL}/owh/v1/films`);
    if (!response.ok) throw new Error('Failed to fetch films');
    return response.json();
  },

  async getFilm(slug: string): Promise<Film> {
    const response = await fetch(`${WP_API_URL}/owh/v1/films/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch film');
    return response.json();
  },

  // Producții
  async getProductions(): Promise<Production[]> {
    const response = await fetch(`${WP_API_URL}/owh/v1/productions`);
    if (!response.ok) throw new Error('Failed to fetch productions');
    return response.json();
  },

  async getProduction(slug: string): Promise<Production> {
    const response = await fetch(`${WP_API_URL}/owh/v1/productions/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch production');
    return response.json();
  },

  // Echipament
  async getEquipment(category?: string): Promise<Equipment[]> {
    const url = category 
      ? `${WP_API_URL}/owh/v1/equipment?category=${category}`
      : `${WP_API_URL}/owh/v1/equipment`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch equipment');
    return response.json();
  },

  // Evenimente
  async getEvents(): Promise<Event[]> {
    const response = await fetch(`${WP_API_URL}/owh/v1/events-with-tickets`);
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  },

  async getEvent(id: number): Promise<Event> {
    const response = await fetch(`${WP_API_URL}/owh/v1/events/${id}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    return response.json();
  },

  // Echipa
  async getTeamMembers(): Promise<TeamMember[]> {
    const response = await fetch(`${WP_API_URL}/owh/v1/team`);
    if (!response.ok) throw new Error('Failed to fetch team');
    return response.json();
  },

  // Meniu principal (pentru a face tot editabil din WP)
  async getMenu(location: string): Promise<any> {
    const response = await fetch(`${WP_API_URL}/menus/v1/menus/${location}`);
    if (!response.ok) throw new Error('Failed to fetch menu');
    return response.json();
  },

  // Design tokens (culori, fonturi) - folosind ACF Options Page
  async getDesignSettings(): Promise<any> {
    const response = await fetch(`${WP_API_URL}/acf/v3/options/design-settings`);
    if (!response.ok) throw new Error('Failed to fetch design settings');
    return response.json();
  }
};
```

### 2. Actualizează Componentele React

Exemple de actualizare pentru componente:

```typescript
// src/pages/FilmePage.tsx
import { useQuery } from '@tanstack/react-query';
import { wordpressApi } from '@/services/wordpressApi';

const FilmePage = () => {
  const { data: films, isLoading } = useQuery({
    queryKey: ['films'],
    queryFn: wordpressApi.getFilms
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {films?.map(film => (
        <FilmCard key={film.id} film={film} />
      ))}
    </div>
  );
};
```

### 3. Configurare Design System din WordPress

Creează o **ACF Options Page** pentru design tokens:

```php
// functions.php
if(function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title' => 'Design Settings',
        'menu_title' => 'Design System',
        'menu_slug' => 'design-settings',
        'capability' => 'edit_posts',
        'show_in_rest' => true,
    ]);
}

// ACF Fields pentru Design Settings:
// - primary_color (color picker)
// - secondary_color (color picker)
// - accent_color (color picker)
// - heading_font (text)
// - body_font (text)
// - logo_url (image)
// - footer_text (textarea)
```

Apoi în React:

```typescript
// src/hooks/useDesignSystem.ts
import { useQuery } from '@tanstack/react-query';
import { wordpressApi } from '@/services/wordpressApi';

export const useDesignSystem = () => {
  const { data } = useQuery({
    queryKey: ['design-settings'],
    queryFn: wordpressApi.getDesignSettings,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  // Apply design tokens to CSS variables
  useEffect(() => {
    if (data) {
      document.documentElement.style.setProperty('--primary', data.primary_color);
      document.documentElement.style.setProperty('--secondary', data.secondary_color);
      // ... apply all design tokens
    }
  }, [data]);

  return data;
};
```

## Workflow Complet

### Editare Conținut în WordPress:

1. **Filme**: WP Admin → Filme → Add New
   - Completează toate câmpurile ACF
   - Upload poster, trailer URL
   - Publish → Apare automat în React frontend

2. **Evenimente CRONOGRAF**: WP Admin → Events → Add New
   - Set date/location
   - Create WooCommerce ticket product
   - Link ticket to event
   - Publish → Apare în `/bilete` page

3. **Design System**: WP Admin → Design System
   - Schimbă culori, fonturi
   - Upload new logo
   - Save → Se actualizează instant în React

4. **Meniu**: WP Admin → Appearance → Menus
   - Creează/editează meniu
   - React fetch menu dinamic

### Cache Strategy:

```typescript
// React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
    },
  },
});
```

## Security

### CORS și Autentificare

```php
// În .htaccess sau wp-config.php
header('Access-Control-Allow-Origin: https://owh.md');
header('Access-Control-Allow-Credentials: true');

// Pentru requests autentificate (admin)
add_filter('jwt_auth_whitelist', function($endpoints) {
    return [
        '/wp-json/owh/v1/*',
        '/wp-json/acf/v3/*'
    ];
});
```

## Performance

1. **CDN pentru Media**: Folosește Cloudflare sau BunnyCDN pentru imagini
2. **Caching**: WP Rocket sau W3 Total Cache
3. **Image Optimization**: ShortPixel sau Imagify
4. **API Response Caching**: Redis pentru API responses

## Deployment Checklist

- [ ] WordPress instalat pe subdomeniu
- [ ] Toate pluginurile instalate și configurate
- [ ] Custom Post Types create
- [ ] ACF Fields configurate
- [ ] REST API endpoints testate
- [ ] CORS configurat corect
- [ ] Design Settings options page creată
- [ ] WooCommerce configurat pentru bilete
- [ ] SSL certificate instalat
- [ ] Backup automat configurat
- [ ] React frontend pointat la WordPress API

## Costuri Estimate

- **WordPress Hosting**: $10-50/lună (Kinsta, WP Engine, sau VPS)
- **ACF PRO**: $49/an (licență unică)
- **WooCommerce**: Gratuit
- **The Events Calendar PRO**: $89/an (opțional)
- **Total Setup**: ~$150-200 prima dată
- **Mentenanță lunară**: $15-100/lună

## Suport și Documentație

- WordPress REST API: https://developer.wordpress.org/rest-api/
- ACF: https://www.advancedcustomfields.com/resources/
- WooCommerce API: https://woocommerce.github.io/woocommerce-rest-api-docs/
- The Events Calendar: https://evnt.is/
