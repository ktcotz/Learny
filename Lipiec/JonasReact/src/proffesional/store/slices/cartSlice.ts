import { StateCreator } from "zustand";
import { CartData } from "../../features/cart/CartItem";

export type CartSlice = {
  cart: CartData[];
  addItem: (item: CartData) => void;
  deleteItem: (id: string) => void;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  totalCartQuantity: number;
  clearCart: () => void;
};

export const cartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => ({
  cart: [],

  get totalCartQuantity() {
    const cart = this.cart;

    console.log(cart);

    const totalQuantity = cart.reduce((acc, next) => (acc += next.quantity), 0);

    return totalQuantity;
  },
  addItem: (item: CartData) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),

  deleteItem: (id: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.pizzaId !== id),
    })),

  increaseItemQuantity: (id: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.pizzaId === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: item.quantity + 1 * item.unitPrice,
            }
          : item
      ),
    })),
  decreaseItemQuantity: (id: string) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.pizzaId === id
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice: item.quantity - 1 * item.unitPrice,
            }
          : item
      ),
    })),

  clearCart: () =>
    set({
      cart: [],
    }),
});
