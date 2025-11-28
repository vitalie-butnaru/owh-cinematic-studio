import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressDesignSettings, WordPressMenu } from '@/types/wordpress';

export const settingsKeys = {
  all: ['settings'] as const,
  design: () => [...settingsKeys.all, 'design'] as const,
  menus: () => [...settingsKeys.all, 'menus'] as const,
};

export function useDesignSettings(
  options?: Omit<UseQueryOptions<WordPressDesignSettings>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: settingsKeys.design(),
    queryFn: () => wordPressClient.get<WordPressDesignSettings>(WORDPRESS_ENDPOINTS.design),
    staleTime: WORDPRESS_CONFIG.staleTime * 4, // Design settings change rarely
    gcTime: WORDPRESS_CONFIG.cacheTime * 4,
    ...options,
  });
}

export function useMenus(
  options?: Omit<UseQueryOptions<WordPressMenu[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: settingsKeys.menus(),
    queryFn: () => wordPressClient.get<WordPressMenu[]>(WORDPRESS_ENDPOINTS.menus),
    staleTime: WORDPRESS_CONFIG.staleTime * 4,
    gcTime: WORDPRESS_CONFIG.cacheTime * 4,
    ...options,
  });
}
