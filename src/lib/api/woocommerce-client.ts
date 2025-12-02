/**
 * WooCommerce API Client
 * Enterprise-grade HTTP client for WooCommerce REST API
 */

import { WOOCOMMERCE_CONFIG } from '@/config/woocommerce';
import type { WCProductQueryParams, WCOrderQueryParams } from '@/types/woocommerce';

type QueryParams = WCProductQueryParams | WCOrderQueryParams | Record<string, any>;

interface ApiError {
  code: string;
  message: string;
  data?: any;
}

class WooCommerceApiClient {
  private baseUrl: string;
  private timeout: number;
  private retries: number;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {
    this.baseUrl = WOOCOMMERCE_CONFIG.baseUrl;
    this.timeout = WOOCOMMERCE_CONFIG.timeout;
    this.retries = WOOCOMMERCE_CONFIG.retries;
    // These will be set from environment or secrets
    this.consumerKey = import.meta.env.VITE_WC_CONSUMER_KEY || '';
    this.consumerSecret = import.meta.env.VITE_WC_CONSUMER_SECRET || '';
  }

  /**
   * Build URL with query parameters and authentication
   */
  private buildUrl(endpoint: string, params?: QueryParams): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add OAuth parameters for authentication
    if (this.consumerKey && this.consumerSecret) {
      url.searchParams.append('consumer_key', this.consumerKey);
      url.searchParams.append('consumer_secret', this.consumerSecret);
    }
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }
    
    return url.toString();
  }

  /**
   * Perform HTTP request with retry logic
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    params?: QueryParams,
    attempt = 1
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          code: 'UNKNOWN_ERROR',
          message: response.statusText,
        }));
        throw error;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      // Retry logic
      if (attempt < this.retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.request<T>(endpoint, options, params, attempt + 1);
      }

      throw this.handleError(error);
    }
  }

  /**
   * Handle and normalize errors
   */
  private handleError(error: any): ApiError {
    if (error.name === 'AbortError') {
      return {
        code: 'TIMEOUT',
        message: 'Request timeout',
      };
    }

    if (error.code && error.message) {
      return error as ApiError;
    }

    return {
      code: 'NETWORK_ERROR',
      message: error.message || 'Network error occurred',
    };
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, params);
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Check if API is configured
   */
  isConfigured(): boolean {
    return !!(this.consumerKey && this.consumerSecret);
  }
}

// Singleton instance
export const wooCommerceClient = new WooCommerceApiClient();
