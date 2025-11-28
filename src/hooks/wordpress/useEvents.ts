import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressEvent, QueryParams } from '@/types/wordpress';

export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...eventKeys.lists(), params] as const,
  detail: (slug: string) => [...eventKeys.all, 'detail', slug] as const,
  upcoming: () => [...eventKeys.all, 'upcoming'] as const,
};

export function useEvents(
  params?: QueryParams,
  options?: Omit<UseQueryOptions<WordPressEvent[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: eventKeys.list(params),
    queryFn: () => wordPressClient.get<WordPressEvent[]>(WORDPRESS_ENDPOINTS.events, params),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

export function useEvent(
  slug: string,
  options?: Omit<UseQueryOptions<WordPressEvent>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: eventKeys.detail(slug),
    queryFn: () => wordPressClient.get<WordPressEvent>(WORDPRESS_ENDPOINTS.eventBySlug(slug)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}

export function useUpcomingEvents(
  options?: Omit<UseQueryOptions<WordPressEvent[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: eventKeys.upcoming(),
    queryFn: async () => {
      const events = await wordPressClient.get<WordPressEvent[]>(WORDPRESS_ENDPOINTS.events);
      const now = new Date();
      return events.filter(event => new Date(event.event_date) >= now);
    },
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}
