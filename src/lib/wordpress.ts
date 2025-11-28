/**
 * WordPress API Integration
 * 
 * This file handles all WordPress REST API calls for content management.
 * The WordPress backend serves as the CMS for the OWH Studio website.
 */

const WP_BASE_URL = import.meta.env.VITE_WP_API_URL || 'https://owh.md/wp-json/owh/v1';

interface WordPressFilm {
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

interface WordPressProduction {
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

interface WordPressSeries {
  id: number;
  title: string;
  slug: string;
  description: string;
  poster_url?: string;
  is_active: boolean;
}

interface WordPressEquipment {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  daily_rate: number;
  image_url: string;
  specifications?: any;
  is_available: boolean;
}

interface WordPressTeamMember {
  id: number;
  full_name: string;
  role: string;
  bio?: string;
  photo_url?: string;
  display_order: number;
  is_active: boolean;
}

/**
 * Fetch all films from WordPress
 */
export async function fetchFilmsFromWordPress(): Promise<WordPressFilm[]> {
  try {
    const response = await fetch(`${WP_BASE_URL}/films`);
    if (!response.ok) throw new Error('Failed to fetch films');
    return await response.json();
  } catch (error) {
    console.error('Error fetching films from WordPress:', error);
    return [];
  }
}

/**
 * Fetch films by category
 */
export async function fetchFilmsByCategory(category: string): Promise<WordPressFilm[]> {
  try {
    const response = await fetch(`${WP_BASE_URL}/films?category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch films by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching films by category:', error);
    return [];
  }
}

/**
 * Fetch a single film by slug
 */
export async function fetchFilmBySlug(slug: string): Promise<WordPressFilm | null> {
  try {
    const response = await fetch(`${WP_BASE_URL}/films/${slug}`);
    if (!response.ok) throw new Error('Film not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching film:', error);
    return null;
  }
}

/**
 * Fetch all productions
 */
export async function fetchProductionsFromWordPress(): Promise<WordPressProduction[]> {
  try {
    const response = await fetch(`${WP_BASE_URL}/productions`);
    if (!response.ok) throw new Error('Failed to fetch productions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching productions from WordPress:', error);
    return [];
  }
}

/**
 * Fetch productions by category
 */
export async function fetchProductionsByCategory(category: string): Promise<WordPressProduction[]> {
  try {
    const response = await fetch(`${WP_BASE_URL}/productions?category=${category}`);
    if (!response.ok) throw new Error('Failed to fetch productions by category');
    return await response.json();
  } catch (error) {
    console.error('Error fetching productions by category:', error);
    return [];
  }
}

/**
 * Fetch a single production by slug
 */
export async function fetchProductionBySlug(slug: string): Promise<WordPressProduction | null> {
  try {
    const response = await fetch(`${WP_BASE_URL}/productions/${slug}`);
    if (!response.ok) throw new Error('Production not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching production:', error);
    return null;
  }
}

/**
 * Fetch all series
 */
export async function fetchSeriesFromWordPress(): Promise<WordPressSeries[]> {
  try {
    const response = await fetch(`${WP_BASE_URL}/series`);
    if (!response.ok) throw new Error('Failed to fetch series');
    return await response.json();
  } catch (error) {
    console.error('Error fetching series from WordPress:', error);
    return [];
  }
}

/**
 * Fetch a single series by slug
 */
export async function fetchSeriesBySlug(slug: string): Promise<WordPressSeries | null> {
  try {
    const response = await fetch(`${WP_BASE_URL}/series/${slug}`);
    if (!response.ok) throw new Error('Series not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching series:', error);
    return null;
  }
}

/**
 * Fetch all equipment
 */
export async function fetchEquipmentFromWordPress(): Promise<WordPressEquipment[]> {
  try {
    const response = await fetch(`${WP_BASE_URL}/equipment`);
    if (!response.ok) throw new Error('Failed to fetch equipment');
    return await response.json();
  } catch (error) {
    console.error('Error fetching equipment from WordPress:', error);
    return [];
  }
}

/**
 * Fetch all team members
 */
export async function fetchTeamFromWordPress(): Promise<WordPressTeamMember[]> {
  try {
    const response = await fetch(`${WP_BASE_URL}/team`);
    if (!response.ok) throw new Error('Failed to fetch team');
    return await response.json();
  } catch (error) {
    console.error('Error fetching team from WordPress:', error);
    return [];
  }
}

/**
 * Fetch design settings (colors, branding, etc)
 */
export async function fetchDesignSettings(): Promise<any> {
  try {
    const response = await fetch(`${WP_BASE_URL}/design`);
    if (!response.ok) throw new Error('Failed to fetch design settings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching design settings:', error);
    return null;
  }
}

/**
 * Fetch menu structure
 */
export async function fetchMenus(): Promise<any> {
  try {
    const response = await fetch(`${WP_BASE_URL}/menus`);
    if (!response.ok) throw new Error('Failed to fetch menus');
    return await response.json();
  } catch (error) {
    console.error('Error fetching menus:', error);
    return null;
  }
}