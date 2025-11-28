/**
 * Custom React Query hooks for Films
 * Optimized with caching, prefetching, and error handling
 */

import { useQuery, useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressFilm, PaginatedResponse, QueryParams } from '@/types/wordpress';

/**
 * Query keys factory for type-safe cache management
 */
export const filmKeys = {
  all: ['films'] as const,
  lists: () => [...filmKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...filmKeys.lists(), params] as const,
  details: () => [...filmKeys.all, 'detail'] as const,
  detail: (slug: string) => [...filmKeys.details(), slug] as const,
  byCategory: (category: string) => [...filmKeys.all, 'category', category] as const,
  featured: () => [...filmKeys.all, 'featured'] as const,
};

/**
 * Fetch all films
 */
export function useFilms(
  params?: QueryParams,
  options?: Omit<UseQueryOptions<WordPressFilm[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: filmKeys.list(params),
    queryFn: () => wordPressClient.get<WordPressFilm[]>(WORDPRESS_ENDPOINTS.films, params),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

/**
 * Fetch films with infinite scroll
 */
export function useInfiniteFilms(params?: Omit<QueryParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...filmKeys.lists(), 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      wordPressClient.get<PaginatedResponse<WordPressFilm>>(WORDPRESS_ENDPOINTS.films, {
        ...params,
        page: pageParam,
        per_page: 12,
      }),
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.pagination;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
  });
}

/**
 * Fetch single film by slug
 */
export function useFilm(
  slug: string,
  options?: Omit<UseQueryOptions<WordPressFilm>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: filmKeys.detail(slug),
    queryFn: () => wordPressClient.get<WordPressFilm>(WORDPRESS_ENDPOINTS.filmBySlug(slug)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}

/**
 * Fetch films by category
 */
export function useFilmsByCategory(
  category: string,
  params?: Omit<QueryParams, 'category'>,
  options?: Omit<UseQueryOptions<WordPressFilm[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: filmKeys.byCategory(category),
    queryFn: () =>
      wordPressClient.get<WordPressFilm[]>(
        WORDPRESS_ENDPOINTS.filmsByCategory(category),
        params
      ),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!category,
    ...options,
  });
}

/**
 * Fetch featured films
 */
export function useFeaturedFilms(
  options?: Omit<UseQueryOptions<WordPressFilm[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: filmKeys.featured(),
    queryFn: () =>
      wordPressClient.get<WordPressFilm[]>(WORDPRESS_ENDPOINTS.films, {
        per_page: 6,
        orderby: 'date',
        order: 'desc',
      }),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

/**
 * Search films
 */
export function useSearchFilms(
  searchTerm: string,
  options?: Omit<UseQueryOptions<WordPressFilm[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: [...filmKeys.lists(), 'search', searchTerm],
    queryFn: () =>
      wordPressClient.get<WordPressFilm[]>(WORDPRESS_ENDPOINTS.films, {
        search: searchTerm,
      }),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: searchTerm.length >= 3,
    ...options,
  });
}
