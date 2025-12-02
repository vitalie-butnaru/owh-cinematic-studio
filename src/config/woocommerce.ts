/**
 * WooCommerce API Configuration
 * Configuration for WooCommerce REST API integration
 */

export const WOOCOMMERCE_CONFIG = {
  baseUrl: import.meta.env.VITE_WC_API_URL || 'https://cms.owh.md/wp-json/wc/v3',
  timeout: 15000,
  retries: 3,
  cacheTime: 1000 * 60 * 5, // 5 minutes
  staleTime: 1000 * 60 * 2, // 2 minutes
} as const;

export const WOOCOMMERCE_ENDPOINTS = {
  // Products
  products: '/products',
  productById: (id: number) => `/products/${id}`,
  productBySlug: (slug: string) => `/products?slug=${slug}`,
  productsByCategory: (categoryId: number) => `/products?category=${categoryId}`,
  
  // Categories
  categories: '/products/categories',
  categoryById: (id: number) => `/products/categories/${id}`,
  
  // Orders
  orders: '/orders',
  orderById: (id: number) => `/orders/${id}`,
  
  // Customers
  customers: '/customers',
  customerById: (id: number) => `/customers/${id}`,
  
  // Cart (via custom endpoint or CoCart plugin)
  cart: '/cart',
  cartAdd: '/cart/add-item',
  cartRemove: '/cart/remove-item',
  cartUpdate: '/cart/update-item',
  cartClear: '/cart/clear',
} as const;

/**
 * Equipment categories mapping to WooCommerce
 */
export const WC_EQUIPMENT_CATEGORIES = {
  cameras: { wcId: 1, label: 'Camere Video', slug: 'cameras' },
  lenses: { wcId: 2, label: 'Obiective', slug: 'lenses' },
  lighting: { wcId: 3, label: 'Lumini', slug: 'lighting' },
  audio: { wcId: 4, label: 'Audio', slug: 'audio' },
  grip: { wcId: 5, label: 'Grip & Stabilizare', slug: 'grip' },
  monitoring: { wcId: 6, label: 'Monitoring', slug: 'monitoring' },
  accessories: { wcId: 7, label: 'Accesorii', slug: 'accessories' },
} as const;

/**
 * Order statuses mapping
 */
export const WC_ORDER_STATUSES = {
  pending: { label: 'În așteptare', color: 'yellow' },
  processing: { label: 'În procesare', color: 'blue' },
  'on-hold': { label: 'În așteptare plată', color: 'orange' },
  completed: { label: 'Finalizată', color: 'green' },
  cancelled: { label: 'Anulată', color: 'red' },
  refunded: { label: 'Rambursată', color: 'gray' },
  failed: { label: 'Eșuată', color: 'red' },
} as const;
