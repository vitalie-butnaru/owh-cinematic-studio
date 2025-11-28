import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WordPressEquipment } from '@/types/wordpress';

export interface RentalCartItem {
  equipment: WordPressEquipment;
  startDate: Date;
  endDate: Date;
  quantity: number;
}

interface RentalCartStore {
  items: RentalCartItem[];
  addItem: (item: Omit<RentalCartItem, 'quantity'>) => void;
  removeItem: (equipmentId: number) => void;
  updateQuantity: (equipmentId: number, quantity: number) => void;
  updateDates: (equipmentId: number, startDate: Date, endDate: Date) => void;
  clearCart: () => void;
  getTotalDays: (equipmentId: number) => number;
  getTotalPrice: (equipmentId: number) => number;
  getCartTotal: () => number;
}

export const useRentalCart = create<RentalCartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.equipment.id === item.equipment.id
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.equipment.id === item.equipment.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeItem: (equipmentId) => {
        set((state) => ({
          items: state.items.filter((i) => i.equipment.id !== equipmentId),
        }));
      },

      updateQuantity: (equipmentId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(equipmentId);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.equipment.id === equipmentId ? { ...i, quantity } : i
          ),
        }));
      },

      updateDates: (equipmentId, startDate, endDate) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.equipment.id === equipmentId ? { ...i, startDate, endDate } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalDays: (equipmentId) => {
        const item = get().items.find((i) => i.equipment.id === equipmentId);
        if (!item) return 0;

        const days = Math.ceil(
          (item.endDate.getTime() - item.startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        return Math.max(1, days);
      },

      getTotalPrice: (equipmentId) => {
        const item = get().items.find((i) => i.equipment.id === equipmentId);
        if (!item) return 0;

        const days = get().getTotalDays(equipmentId);
        return item.equipment.daily_rate * days * item.quantity;
      },

      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          return total + get().getTotalPrice(item.equipment.id);
        }, 0);
      },
    }),
    {
      name: 'rental-cart',
    }
  )
);
