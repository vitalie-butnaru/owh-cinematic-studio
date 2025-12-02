/**
 * WooCommerce Products Hooks
 * Custom React Query hooks for WooCommerce products
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { wooCommerceClient } from '@/lib/api/woocommerce-client';
import { WOOCOMMERCE_CONFIG, WOOCOMMERCE_ENDPOINTS } from '@/config/woocommerce';
import type { WCProduct, WCCategory, WCProductQueryParams } from '@/types/woocommerce';

export const wcProductKeys = {
  all: ['wc-products'] as const,
  lists: () => [...wcProductKeys.all, 'list'] as const,
  list: (params?: WCProductQueryParams) => [...wcProductKeys.lists(), params] as const,
  details: () => [...wcProductKeys.all, 'detail'] as const,
  detail: (id: number) => [...wcProductKeys.details(), id] as const,
  bySlug: (slug: string) => [...wcProductKeys.details(), 'slug', slug] as const,
  byCategory: (categoryId: number) => [...wcProductKeys.all, 'category', categoryId] as const,
  categories: () => [...wcProductKeys.all, 'categories'] as const,
};

/**
 * Fetch all products
 */
export function useWCProducts(
  params?: WCProductQueryParams,
  options?: Omit<UseQueryOptions<WCProduct[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: wcProductKeys.list(params),
    queryFn: () => wooCommerceClient.get<WCProduct[]>(WOOCOMMERCE_ENDPOINTS.products, params),
    staleTime: WOOCOMMERCE_CONFIG.staleTime,
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    ...options,
  });
}

/**
 * Fetch single product by ID
 */
export function useWCProduct(
  id: number,
  options?: Omit<UseQueryOptions<WCProduct>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: wcProductKeys.detail(id),
    queryFn: () => wooCommerceClient.get<WCProduct>(WOOCOMMERCE_ENDPOINTS.productById(id)),
    staleTime: WOOCOMMERCE_CONFIG.staleTime,
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    enabled: !!id,
    ...options,
  });
}

/**
 * Fetch product by slug
 */
export function useWCProductBySlug(
  slug: string,
  options?: Omit<UseQueryOptions<WCProduct | null>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: wcProductKeys.bySlug(slug),
    queryFn: async () => {
      const products = await wooCommerceClient.get<WCProduct[]>(
        WOOCOMMERCE_ENDPOINTS.productBySlug(slug)
      );
      return products[0] || null;
    },
    staleTime: WOOCOMMERCE_CONFIG.staleTime,
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    enabled: !!slug,
    ...options,
  });
}

/**
 * Fetch products by category
 */
export function useWCProductsByCategory(
  categoryId: number,
  params?: Omit<WCProductQueryParams, 'category'>,
  options?: Omit<UseQueryOptions<WCProduct[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: wcProductKeys.byCategory(categoryId),
    queryFn: () =>
      wooCommerceClient.get<WCProduct[]>(
        WOOCOMMERCE_ENDPOINTS.productsByCategory(categoryId),
        params
      ),
    staleTime: WOOCOMMERCE_CONFIG.staleTime,
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    enabled: !!categoryId,
    ...options,
  });
}

/**
 * Fetch all product categories
 */
export function useWCCategories(
  options?: Omit<UseQueryOptions<WCCategory[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: wcProductKeys.categories(),
    queryFn: () => wooCommerceClient.get<WCCategory[]>(WOOCOMMERCE_ENDPOINTS.categories),
    staleTime: WOOCOMMERCE_CONFIG.staleTime,
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    ...options,
  });
}

/**
 * Fetch rental equipment products (available items)
 */
export function useRentalEquipment(
  params?: WCProductQueryParams,
  options?: Omit<UseQueryOptions<WCProduct[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: [...wcProductKeys.list(params), 'rental'],
    queryFn: async () => {
      const products = await wooCommerceClient.get<WCProduct[]>(
        WOOCOMMERCE_ENDPOINTS.products,
        { ...params, stock_status: 'instock' }
      );
      return products;
    },
    staleTime: WOOCOMMERCE_CONFIG.staleTime / 2, // More frequent updates for availability
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    ...options,
  });
}
