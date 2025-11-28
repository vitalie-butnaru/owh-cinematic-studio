/**
 * Custom React Query hooks for Series/Emisiuni
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressSeries, WordPressEpisode, QueryParams } from '@/types/wordpress';

export const seriesKeys = {
  all: ['series'] as const,
  lists: () => [...seriesKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...seriesKeys.lists(), params] as const,
  details: () => [...seriesKeys.all, 'detail'] as const,
  detail: (slug: string) => [...seriesKeys.details(), slug] as const,
  episodes: (slug: string) => [...seriesKeys.detail(slug), 'episodes'] as const,
};

export function useSeries(
  params?: QueryParams,
  options?: Omit<UseQueryOptions<WordPressSeries[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: seriesKeys.list(params),
    queryFn: () => wordPressClient.get<WordPressSeries[]>(WORDPRESS_ENDPOINTS.series, params),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

export function useSeriesItem(
  slug: string,
  options?: Omit<UseQueryOptions<WordPressSeries>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: seriesKeys.detail(slug),
    queryFn: () => wordPressClient.get<WordPressSeries>(WORDPRESS_ENDPOINTS.seriesBySlug(slug)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}

export function useSeriesEpisodes(
  slug: string,
  options?: Omit<UseQueryOptions<WordPressEpisode[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: seriesKeys.episodes(slug),
    queryFn: () => wordPressClient.get<WordPressEpisode[]>(WORDPRESS_ENDPOINTS.seriesEpisodes(slug)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}
