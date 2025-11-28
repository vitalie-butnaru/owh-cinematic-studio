/**
 * WordPress API Configuration
 * Enterprise-grade configuration with environment validation
 */

export const WORDPRESS_CONFIG = {
  baseUrl: import.meta.env.VITE_WP_API_URL || 'https://cms.owh.md/wp-json/owh/v1',
  timeout: 10000,
  retries: 3,
  cacheTime: 1000 * 60 * 5, // 5 minutes
  staleTime: 1000 * 60 * 2, // 2 minutes
} as const;

export const WORDPRESS_ENDPOINTS = {
  // Films
  films: '/films',
  filmsByCategory: (category: string) => `/films?category=${category}`,
  filmBySlug: (slug: string) => `/films/${slug}`,
  
  // Productions
  productions: '/productions',
  productionsByCategory: (category: string) => `/productions?category=${category}`,
  productionBySlug: (slug: string) => `/productions/${slug}`,
  
  // Series
  series: '/series',
  seriesBySlug: (slug: string) => `/series/${slug}`,
  seriesEpisodes: (slug: string) => `/series/${slug}/episodes`,
  
  // Equipment
  equipment: '/equipment',
  equipmentByCategory: (category: string) => `/equipment?category=${category}`,
  equipmentBySlug: (slug: string) => `/equipment/${slug}`,
  
  // Team
  team: '/team',
  teamMember: (id: number) => `/team/${id}`,
  
  // Blog
  posts: '/posts',
  postBySlug: (slug: string) => `/posts/${slug}`,
  postsByCategory: (category: string) => `/posts?category=${category}`,
  postsByTag: (tag: string) => `/posts?tag=${tag}`,
  categories: '/categories',
  tags: '/tags',
  
  // Projects
  projects: '/projects',
  projectBySlug: (slug: string) => `/projects/${slug}`,
  
  // Design & Settings
  design: '/design',
  menus: '/menus',
  
  // Events
  events: '/events',
  eventBySlug: (slug: string) => `/events/${slug}`,
} as const;

/**
 * Film categories mapping
 */
export const FILM_CATEGORIES = {
  documentare: { id: 1, label: 'Documentare', slug: 'documentare' },
  fictiune: { id: 2, label: 'Ficțiune', slug: 'fictiune' },
  prezentare: { id: 3, label: 'Filme de prezentare', slug: 'prezentare' },
  publicitate: { id: 'pub', label: 'Publicitate', slug: 'publicitate' },
  altele: { id: 'other', label: 'Alte producții', slug: 'altele' },
  distributie: { id: 5, label: 'Distribuție', slug: 'distributie' },
} as const;

/**
 * Production categories mapping
 */
export const PRODUCTION_CATEGORIES = {
  publicitate: { label: 'Publicitate', slug: 'publicitate' },
  spoturi_sociale: { label: 'Spoturi Sociale', slug: 'spoturi_sociale' },
  filme_institutionale: { label: 'Filme Instituționale', slug: 'filme_institutionale' },
  animatii: { label: 'Animații', slug: 'animatii' },
  emisiuni: { label: 'Emisiuni', slug: 'emisiuni' },
  proiecte: { label: 'Proiecte Speciale', slug: 'proiecte' },
} as const;

/**
 * Equipment categories
 */
export const EQUIPMENT_CATEGORIES = {
  camere: { label: 'Camere Video', slug: 'camere' },
  obiective: { label: 'Obiective', slug: 'obiective' },
  audio: { label: 'Audio', slug: 'audio' },
  iluminat: { label: 'Iluminat', slug: 'iluminat' },
  stabilizare: { label: 'Stabilizare', slug: 'stabilizare' },
  accesorii: { label: 'Accesorii', slug: 'accesorii' },
} as const;

/**
 * Validate WordPress API configuration
 */
export function validateWordPressConfig(): boolean {
  if (!WORDPRESS_CONFIG.baseUrl) {
    console.error('VITE_WP_API_URL is not configured');
    return false;
  }
  
  try {
    new URL(WORDPRESS_CONFIG.baseUrl);
    return true;
  } catch {
    console.error('Invalid WordPress API URL');
    return false;
  }
}
