/**
 * WooCommerce API Type Definitions
 * Comprehensive type system for WooCommerce entities
 */

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  date_modified: string;
  type: 'simple' | 'grouped' | 'external' | 'variable';
  status: 'draft' | 'pending' | 'private' | 'publish';
  featured: boolean;
  catalog_visibility: 'visible' | 'catalog' | 'search' | 'hidden';
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  manage_stock: boolean;
  stock_quantity: number | null;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  backorders: 'no' | 'notify' | 'yes';
  categories: WCCategory[];
  tags: WCTag[];
  images: WCImage[];
  attributes: WCAttribute[];
  variations: number[];
  meta_data: WCMetaData[];
  // Custom fields for rental equipment
  acf?: {
    daily_rate?: number;
    is_available?: boolean;
    specifications?: Record<string, string>;
  };
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: WCImage | null;
  menu_order: number;
  count: number;
}

export interface WCTag {
  id: number;
  name: string;
  slug: string;
}

export interface WCImage {
  id: number;
  date_created: string;
  date_modified: string;
  src: string;
  name: string;
  alt: string;
}

export interface WCAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WCMetaData {
  id: number;
  key: string;
  value: string | number | boolean | Record<string, any>;
}

export interface WCOrder {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  created_via: string;
  version: string;
  status: WCOrderStatus;
  currency: string;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  prices_include_tax: boolean;
  customer_id: number;
  customer_ip_address: string;
  customer_user_agent: string;
  customer_note: string;
  billing: WCBillingAddress;
  shipping: WCShippingAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  date_paid: string | null;
  date_completed: string | null;
  cart_hash: string;
  meta_data: WCMetaData[];
  line_items: WCLineItem[];
  tax_lines: WCTaxLine[];
  shipping_lines: WCShippingLine[];
  fee_lines: WCFeeLine[];
  coupon_lines: WCCouponLine[];
  refunds: WCRefund[];
}

export type WCOrderStatus = 
  | 'pending'
  | 'processing'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed';

export interface WCBillingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface WCShippingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface WCLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: WCTax[];
  meta_data: WCMetaData[];
  sku: string;
  price: number;
  image: WCImage;
}

export interface WCTax {
  id: number;
  total: string;
  subtotal: string;
}

export interface WCTaxLine {
  id: number;
  rate_code: string;
  rate_id: number;
  label: string;
  compound: boolean;
  tax_total: string;
  shipping_tax_total: string;
  meta_data: WCMetaData[];
}

export interface WCShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  total: string;
  total_tax: string;
  taxes: WCTax[];
  meta_data: WCMetaData[];
}

export interface WCFeeLine {
  id: number;
  name: string;
  tax_class: string;
  tax_status: string;
  total: string;
  total_tax: string;
  taxes: WCTax[];
  meta_data: WCMetaData[];
}

export interface WCCouponLine {
  id: number;
  code: string;
  discount: string;
  discount_tax: string;
  meta_data: WCMetaData[];
}

export interface WCRefund {
  id: number;
  reason: string;
  total: string;
}

export interface WCCustomer {
  id: number;
  date_created: string;
  date_modified: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: WCBillingAddress;
  shipping: WCShippingAddress;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: WCMetaData[];
}

// API Request types
export interface CreateOrderRequest {
  payment_method?: string;
  payment_method_title?: string;
  set_paid?: boolean;
  billing: Partial<WCBillingAddress>;
  shipping?: Partial<WCShippingAddress>;
  line_items: CreateLineItem[];
  shipping_lines?: CreateShippingLine[];
  meta_data?: Partial<WCMetaData>[];
  customer_note?: string;
}

export interface CreateLineItem {
  product_id: number;
  quantity: number;
  variation_id?: number;
  meta_data?: { key: string; value: string }[];
}

export interface CreateShippingLine {
  method_id: string;
  method_title: string;
  total: string;
}

// Query parameters
export interface WCProductQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: number;
  tag?: number;
  status?: string;
  featured?: boolean;
  on_sale?: boolean;
  min_price?: string;
  max_price?: string;
  stock_status?: 'instock' | 'outofstock' | 'onbackorder';
  orderby?: 'date' | 'id' | 'title' | 'slug' | 'price' | 'popularity' | 'rating';
  order?: 'asc' | 'desc';
}

export interface WCOrderQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: WCOrderStatus | WCOrderStatus[];
  customer?: number;
  after?: string;
  before?: string;
  orderby?: 'date' | 'id' | 'title' | 'slug';
  order?: 'asc' | 'desc';
}
