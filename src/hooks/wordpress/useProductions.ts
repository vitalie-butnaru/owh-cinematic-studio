/**
 * Custom React Query hooks for Productions
 */

import { useQuery, useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressProduction, PaginatedResponse, QueryParams } from '@/types/wordpress';

export const productionKeys = {
  all: ['productions'] as const,
  lists: () => [...productionKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...productionKeys.lists(), params] as const,
  details: () => [...productionKeys.all, 'detail'] as const,
  detail: (slug: string) => [...productionKeys.details(), slug] as const,
  byCategory: (category: string) => [...productionKeys.all, 'category', category] as const,
  featured: () => [...productionKeys.all, 'featured'] as const,
};

export function useProductions(
  params?: QueryParams,
  options?: Omit<UseQueryOptions<WordPressProduction[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productionKeys.list(params),
    queryFn: () => wordPressClient.get<WordPressProduction[]>(WORDPRESS_ENDPOINTS.productions, params),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

export function useInfiniteProductions(params?: Omit<QueryParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...productionKeys.lists(), 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      wordPressClient.get<PaginatedResponse<WordPressProduction>>(WORDPRESS_ENDPOINTS.productions, {
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

export function useProduction(
  slug: string,
  options?: Omit<UseQueryOptions<WordPressProduction>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productionKeys.detail(slug),
    queryFn: () => wordPressClient.get<WordPressProduction>(WORDPRESS_ENDPOINTS.productionBySlug(slug)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}

export function useProductionsByCategory(
  category: string,
  params?: Omit<QueryParams, 'category'>,
  options?: Omit<UseQueryOptions<WordPressProduction[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productionKeys.byCategory(category),
    queryFn: () =>
      wordPressClient.get<WordPressProduction[]>(
        WORDPRESS_ENDPOINTS.productionsByCategory(category),
        params
      ),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!category,
    ...options,
  });
}

export function useFeaturedProductions(
  options?: Omit<UseQueryOptions<WordPressProduction[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productionKeys.featured(),
    queryFn: () =>
      wordPressClient.get<WordPressProduction[]>(WORDPRESS_ENDPOINTS.productions, {
        per_page: 6,
        orderby: 'date',
        order: 'desc',
      }),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}
