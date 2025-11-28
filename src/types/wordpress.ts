/**
 * WordPress API Type Definitions
 * Comprehensive type system for all WordPress entities
 */

export interface BaseWordPressEntity {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export interface WordPressFilm extends BaseWordPressEntity {
  title: string;
  slug: string;
  description: string;
  poster_url: string;
  category: string;
  year: number;
  release_year: number;
  duration?: number;
  director?: string;
  trailer_url?: string;
  genre?: string;
  is_featured?: boolean;
  images?: WordPressImage[];
  credits?: FilmCredit[];
  awards?: Award[];
}

export interface WordPressProduction extends BaseWordPressEntity {
  title: string;
  slug: string;
  description: string;
  category: string;
  client?: string;
  year: number;
  gif_preview_url: string;
  video_url?: string;
  is_featured?: boolean;
  tags?: string[];
}

export interface WordPressSeries extends BaseWordPressEntity {
  title: string;
  slug: string;
  description: string;
  poster_url?: string;
  is_active: boolean;
  episodes_count?: number;
  episodes?: WordPressEpisode[];
}

export interface WordPressEpisode extends BaseWordPressEntity {
  series_id: number;
  title: string;
  description?: string;
  episode_number: number;
  video_url: string;
  thumbnail_url?: string;
  duration?: number;
  release_date?: string;
}

export interface WordPressEquipment extends BaseWordPressEntity {
  name: string;
  slug: string;
  category: string;
  description: string;
  daily_rate: number;
  image_url: string;
  specifications?: Record<string, any>;
  is_available: boolean;
  images?: WordPressImage[];
}

export interface WordPressTeamMember extends BaseWordPressEntity {
  full_name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  display_order: number;
  is_active: boolean;
  social_links?: SocialLinks;
}

export interface WordPressPost extends BaseWordPressEntity {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: PostAuthor;
  categories: Category[];
  tags: Tag[];
  published_date: string;
  read_time?: number;
  views?: number;
}

export interface WordPressProject extends BaseWordPressEntity {
  title: string;
  slug: string;
  description: string;
  featured_image: string;
  gallery?: WordPressImage[];
  category: string;
  client?: string;
  year: number;
  status: 'active' | 'completed' | 'upcoming';
  partners?: string[];
}

export interface WordPressEvent extends BaseWordPressEntity {
  title: string;
  slug: string;
  description: string;
  featured_image?: string;
  event_date: string;
  event_time?: string;
  location?: string;
  tickets_url?: string;
  capacity?: number;
  is_active: boolean;
}

export interface WordPressImage {
  id: number;
  url: string;
  caption?: string;
  alt?: string;
  display_order?: number;
}

export interface FilmCredit {
  role: string;
  name: string;
}

export interface Award {
  title: string;
  year: number;
  category?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export interface PostAuthor {
  id: number;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export interface WordPressDesignSettings {
  logo_url?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  hero_video_url?: string;
  hero_image_url?: string;
  footer_text?: string;
  social_links?: SocialLinks;
}

export interface WordPressMenu {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  target?: string;
  children?: MenuItem[];
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  data?: any;
}

// Query parameters
export interface QueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  tag?: string;
  year?: number;
  orderby?: 'date' | 'title' | 'year' | 'views';
  order?: 'asc' | 'desc';
}
