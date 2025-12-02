/**
 * WooCommerce Orders Hooks
 * Custom React Query hooks for WooCommerce orders
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { wooCommerceClient } from '@/lib/api/woocommerce-client';
import { WOOCOMMERCE_CONFIG, WOOCOMMERCE_ENDPOINTS } from '@/config/woocommerce';
import type { WCOrder, WCOrderQueryParams, CreateOrderRequest } from '@/types/woocommerce';

export const wcOrderKeys = {
  all: ['wc-orders'] as const,
  lists: () => [...wcOrderKeys.all, 'list'] as const,
  list: (params?: WCOrderQueryParams) => [...wcOrderKeys.lists(), params] as const,
  details: () => [...wcOrderKeys.all, 'detail'] as const,
  detail: (id: number) => [...wcOrderKeys.details(), id] as const,
  byCustomer: (customerId: number) => [...wcOrderKeys.all, 'customer', customerId] as const,
};

/**
 * Fetch all orders
 */
export function useWCOrders(
  params?: WCOrderQueryParams,
  options?: Omit<UseQueryOptions<WCOrder[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: wcOrderKeys.list(params),
    queryFn: () => wooCommerceClient.get<WCOrder[]>(WOOCOMMERCE_ENDPOINTS.orders, params),
    staleTime: WOOCOMMERCE_CONFIG.staleTime,
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    ...options,
  });
}

/**
 * Fetch single order by ID
 */
export function useWCOrder(
  id: number,
  options?: Omit<UseQueryOptions<WCOrder>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: wcOrderKeys.detail(id),
    queryFn: () => wooCommerceClient.get<WCOrder>(WOOCOMMERCE_ENDPOINTS.orderById(id)),
    staleTime: WOOCOMMERCE_CONFIG.staleTime,
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    enabled: !!id,
    ...options,
  });
}

/**
 * Fetch orders by customer ID
 */
export function useWCOrdersByCustomer(
  customerId: number,
  params?: Omit<WCOrderQueryParams, 'customer'>,
  options?: Omit<UseQueryOptions<WCOrder[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: wcOrderKeys.byCustomer(customerId),
    queryFn: () =>
      wooCommerceClient.get<WCOrder[]>(WOOCOMMERCE_ENDPOINTS.orders, {
        ...params,
        customer: customerId,
      }),
    staleTime: WOOCOMMERCE_CONFIG.staleTime,
    gcTime: WOOCOMMERCE_CONFIG.cacheTime,
    enabled: !!customerId,
    ...options,
  });
}

/**
 * Create a new order (rental request)
 */
export function useCreateWCOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: CreateOrderRequest) =>
      wooCommerceClient.post<WCOrder>(WOOCOMMERCE_ENDPOINTS.orders, orderData),
    onSuccess: () => {
      // Invalidate orders cache
      queryClient.invalidateQueries({ queryKey: wcOrderKeys.all });
    },
  });
}

/**
 * Update an existing order
 */
export function useUpdateWCOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<WCOrder> }) =>
      wooCommerceClient.put<WCOrder>(WOOCOMMERCE_ENDPOINTS.orderById(id), data),
    onSuccess: (_, variables) => {
      // Invalidate specific order and list
      queryClient.invalidateQueries({ queryKey: wcOrderKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: wcOrderKeys.lists() });
    },
  });
}

/**
 * Cancel an order
 */
export function useCancelWCOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      wooCommerceClient.put<WCOrder>(WOOCOMMERCE_ENDPOINTS.orderById(id), {
        status: 'cancelled',
      }),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: wcOrderKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: wcOrderKeys.lists() });
    },
  });
}
