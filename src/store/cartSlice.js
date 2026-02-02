import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { items: [], total: 0 };
  } catch {
    return { items: [], total: 0 };
  }
};

const saveCart = (state) => {
  localStorage.setItem(
    "cart",
    JSON.stringify({ items: state.items, total: state.total }),
  );
};

const initialState = loadCart();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      saveCart(state);
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return;

      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== id);
      }

      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      saveCart(state);
    },

    clearCart(state) {
      state.items = [];
      state.total = 0;
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
