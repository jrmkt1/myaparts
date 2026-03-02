import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    product: {
        id: string;
        name: string;
        part_number: string;
        brand: string;
        image?: string;
    };
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: CartItem["product"], quantity?: number) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set: any, get: any) => ({
            items: [] as CartItem[],
            addItem: (product: CartItem["product"], quantity: number = 1) => {
                set((state: CartStore) => {
                    const existingItem = state.items.find((item: CartItem) => item.product.id === product.id);
                    if (existingItem) {
                        return {
                            items: state.items.map((item: CartItem) =>
                                item.product.id === product.id
                                    ? { ...item, quantity: item.quantity + quantity }
                                    : item
                            ),
                        };
                    }
                    return { items: [...state.items, { product, quantity }] };
                });
            },
            removeItem: (productId: string) => {
                set((state: CartStore) => ({
                    items: state.items.filter((item: CartItem) => item.product.id !== productId),
                }));
            },
            updateQuantity: (productId: string, quantity: number) => {
                set((state: CartStore) => ({
                    items: state.items.map((item: CartItem) =>
                        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
                    ),
                }));
            },
            clearCart: () => set({ items: [] }),
            getTotalItems: () => {
                return get().items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
            },
        }),
        {
            name: 'myaparts-cart',
        }
    )
);
