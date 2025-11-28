/**
 * Custom React Query hooks for Equipment Rental
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { wordPressClient } from '@/lib/api/wordpress-client';
import { WORDPRESS_CONFIG, WORDPRESS_ENDPOINTS } from '@/config/wordpress';
import type { WordPressEquipment, QueryParams } from '@/types/wordpress';

export const equipmentKeys = {
  all: ['equipment'] as const,
  lists: () => [...equipmentKeys.all, 'list'] as const,
  list: (params?: QueryParams) => [...equipmentKeys.lists(), params] as const,
  details: () => [...equipmentKeys.all, 'detail'] as const,
  detail: (slug: string) => [...equipmentKeys.details(), slug] as const,
  byCategory: (category: string) => [...equipmentKeys.all, 'category', category] as const,
  available: () => [...equipmentKeys.all, 'available'] as const,
};

export function useEquipment(
  params?: QueryParams,
  options?: Omit<UseQueryOptions<WordPressEquipment[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: equipmentKeys.list(params),
    queryFn: () => wordPressClient.get<WordPressEquipment[]>(WORDPRESS_ENDPOINTS.equipment, params),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}

export function useEquipmentItem(
  slug: string,
  options?: Omit<UseQueryOptions<WordPressEquipment>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: equipmentKeys.detail(slug),
    queryFn: () => wordPressClient.get<WordPressEquipment>(WORDPRESS_ENDPOINTS.equipmentBySlug(slug)),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}

export function useEquipmentByCategory(
  category: string,
  params?: Omit<QueryParams, 'category'>,
  options?: Omit<UseQueryOptions<WordPressEquipment[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: equipmentKeys.byCategory(category),
    queryFn: () =>
      wordPressClient.get<WordPressEquipment[]>(
        WORDPRESS_ENDPOINTS.equipmentByCategory(category),
        params
      ),
    staleTime: WORDPRESS_CONFIG.staleTime,
    gcTime: WORDPRESS_CONFIG.cacheTime,
    enabled: !!category,
    ...options,
  });
}

export function useAvailableEquipment(
  options?: Omit<UseQueryOptions<WordPressEquipment[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: equipmentKeys.available(),
    queryFn: async () => {
      const equipment = await wordPressClient.get<WordPressEquipment[]>(
        WORDPRESS_ENDPOINTS.equipment
      );
      return equipment.filter(item => item.is_available);
    },
    staleTime: WORDPRESS_CONFIG.staleTime / 2, // More frequent updates for availability
    gcTime: WORDPRESS_CONFIG.cacheTime,
    ...options,
  });
}
