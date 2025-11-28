/**
 * Custom React Query hooks for Blog Posts
 */

import { useQuery, useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressPost, Category, Tag, PaginatedResponse, QueryParams } from '@/types/wordpress';

export const blogKeys = {
  all: ['blog'] as const,
  posts: () => [...blogKeys.all, 'posts'] as const,
  post: (params?: QueryParams) => [...blogKeys.posts(), params] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
  categories: () => [...blogKeys.all, 'categories'] as const,
  tags: () => [...blogKeys.all, 'tags'] as const,
  byCategory: (category: string) => [...blogKeys.all, 'category', category] as const,
  byTag: (tag: string) => [...blogKeys.all, 'tag', tag] as const,
};

export function usePosts(
  params?: QueryParams,
  options?: Omit<UseQueryOptions<WordPressPost[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: blogKeys.post(params),
    queryFn: () => wordPressClient.get<WordPressPost[]>(WORDPRESS_ENDPOINTS.posts, params),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

export function useInfinitePosts(params?: Omit<QueryParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: [...blogKeys.posts(), 'infinite', params],
    queryFn: ({ pageParam = 1 }) =>
      wordPressClient.get<PaginatedResponse<WordPressPost>>(WORDPRESS_ENDPOINTS.posts, {
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

export function usePost(
  slug: string,
  options?: Omit<UseQueryOptions<WordPressPost>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => wordPressClient.get<WordPressPost>(WORDPRESS_ENDPOINTS.postBySlug(slug)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}

export function usePostsByCategory(
  category: string,
  params?: Omit<QueryParams, 'category'>,
  options?: Omit<UseQueryOptions<WordPressPost[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: blogKeys.byCategory(category),
    queryFn: () =>
      wordPressClient.get<WordPressPost[]>(
        WORDPRESS_ENDPOINTS.postsByCategory(category),
        params
      ),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!category,
    ...options,
  });
}

export function usePostsByTag(
  tag: string,
  params?: Omit<QueryParams, 'tag'>,
  options?: Omit<UseQueryOptions<WordPressPost[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: blogKeys.byTag(tag),
    queryFn: () =>
      wordPressClient.get<WordPressPost[]>(
        WORDPRESS_ENDPOINTS.postsByTag(tag),
        params
      ),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!tag,
    ...options,
  });
}

export function useCategories(
  options?: Omit<UseQueryOptions<Category[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: blogKeys.categories(),
    queryFn: () => wordPressClient.get<Category[]>(WORDPRESS_ENDPOINTS.categories),
    staleTime: WORDPRESS_CONFIG.staleTime * 2, // Categories change less frequently
    gcTime: WORDPRESS_CONFIG.cacheTime * 2,
    ...options,
  });
}

export function useTags(
  options?: Omit<UseQueryOptions<Tag[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: blogKeys.tags(),
    queryFn: () => wordPressClient.get<Tag[]>(WORDPRESS_ENDPOINTS.tags),
    staleTime: WORDPRESS_CONFIG.staleTime * 2,
    gcTime: WORDPRESS_CONFIG.cacheTime * 2,
    ...options,
  });
}
