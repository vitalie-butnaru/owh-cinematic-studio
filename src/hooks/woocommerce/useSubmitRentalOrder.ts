/**
 * Submit Rental Order Hook
 * Handles submitting the rental cart to WooCommerce
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wooCommerceClient } from '@/lib/api/woocommerce-client';
import { WOOCOMMERCE_ENDPOINTS } from '@/config/woocommerce';
import { useRentalCart } from '@/components/rental/RentalCart';
import type { WCOrder, CreateOrderRequest, CreateLineItem } from '@/types/woocommerce';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
}

interface SubmitOrderResult {
  order: WCOrder;
  success: boolean;
}

export function useSubmitRentalOrder() {
  const queryClient = useQueryClient();
  const { items, getCartTotal, getTotalDays, clearCart } = useRentalCart();

  return useMutation({
    mutationFn: async (customerInfo: CustomerInfo): Promise<SubmitOrderResult> => {
      if (items.length === 0) {
        throw new Error('Coșul este gol');
      }

      // Build line items from cart
      const lineItems: CreateLineItem[] = items.map((item) => {
        const days = getTotalDays(item.equipment.id);
        const startDate = format(item.startDate, 'dd.MM.yyyy');
        const endDate = format(item.endDate, 'dd.MM.yyyy');

        return {
          product_id: item.equipment.id,
          quantity: item.quantity,
          meta_data: [
            { key: 'rental_start_date', value: startDate },
            { key: 'rental_end_date', value: endDate },
            { key: 'rental_days', value: String(days) },
            { key: 'daily_rate', value: String(item.equipment.daily_rate) },
          ],
        };
      });

      // Calculate rental period for notes
      const rentalPeriods = items.map((item) => {
        const startDate = format(item.startDate, 'dd.MM.yyyy');
        const endDate = format(item.endDate, 'dd.MM.yyyy');
        return `${item.equipment.name}: ${startDate} - ${endDate} (${getTotalDays(item.equipment.id)} zile)`;
      });

      // Build order request
      const orderRequest: CreateOrderRequest = {
        payment_method: 'cod', // Cash on delivery for rental
        payment_method_title: 'Plată la ridicare',
        set_paid: false,
        billing: {
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          company: customerInfo.company || '',
          address_1: '',
          city: 'Chișinău',
          state: '',
          postcode: '',
          country: 'MD',
        },
        line_items: lineItems,
        customer_note: [
          customerInfo.message || '',
          '',
          '--- Detalii închiriere ---',
          ...rentalPeriods,
          '',
          `Total estimat: €${getCartTotal()}`,
        ].join('\n'),
        meta_data: [
          { key: 'order_type', value: 'rental' },
          { key: 'rental_total', value: String(getCartTotal()) },
        ],
      };

      // Submit to WooCommerce
      const order = await wooCommerceClient.post<WCOrder>(
        WOOCOMMERCE_ENDPOINTS.orders,
        orderRequest
      );

      return { order, success: true };
    },
    onSuccess: (result) => {
      // Clear cart after successful order
      clearCart();
      
      // Invalidate orders cache
      queryClient.invalidateQueries({ queryKey: ['wc-orders'] });
      
      toast.success('Cererea de închiriere a fost trimisă!', {
        description: `Comanda #${result.order.number} a fost înregistrată. Veți fi contactat în curând.`,
      });
    },
    onError: (error: Error) => {
      console.error('Order submission error:', error);
      toast.error('Eroare la trimiterea cererii', {
        description: error.message || 'Vă rugăm încercați din nou.',
      });
    },
  });
}

/**
 * Format cart items for display
 */
export function useFormattedCartItems() {
  const { items, getTotalDays, getTotalPrice } = useRentalCart();

  return items.map((item) => ({
    ...item,
    days: getTotalDays(item.equipment.id),
    totalPrice: getTotalPrice(item.equipment.id),
    formattedStartDate: format(item.startDate, 'dd.MM.yyyy'),
    formattedEndDate: format(item.endDate, 'dd.MM.yyyy'),
  }));
}
