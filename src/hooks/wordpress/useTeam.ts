import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressTeamMember } from '@/types/wordpress';

export const teamKeys = {
  all: ['team'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  detail: (id: number) => [...teamKeys.all, 'detail', id] as const,
};

export function useTeam(
  options?: Omit<UseQueryOptions<WordPressTeamMember[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: teamKeys.lists(),
    queryFn: () => wordPressClient.get<WordPressTeamMember[]>(WORDPRESS_ENDPOINTS.team),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

export function useTeamMember(
  id: number,
  options?: Omit<UseQueryOptions<WordPressTeamMember>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: teamKeys.detail(id),
    queryFn: () => wordPressClient.get<WordPressTeamMember>(WORDPRESS_ENDPOINTS.teamMember(id)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!id,
    ...options,
  });
}
