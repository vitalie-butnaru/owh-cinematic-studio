import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressProject, QueryParams } from '@/types/wordpress';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...projectKeys.lists(), params] as const,
  detail: (slug: string) => [...projectKeys.all, 'detail', slug] as const,
};

export function useProjects(
  params?: QueryParams,
  options?: Omit<UseQueryOptions<WordPressProject[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => wordPressClient.get<WordPressProject[]>(WORDPRESS_ENDPOINTS.projects, params),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

export function useProject(
  slug: string,
  options?: Omit<UseQueryOptions<WordPressProject>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: projectKeys.detail(slug),
    queryFn: () => wordPressClient.get<WordPressProject>(WORDPRESS_ENDPOINTS.projectBySlug(slug)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}
