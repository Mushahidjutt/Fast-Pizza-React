import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id, name, unitPrice, quantity}
  visibleIds: [], // jis item ke plus/minus buttons dikhane hain
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      if (!state.visibleIds.includes(product.id)) {
        state.visibleIds.push(product.id);
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        existing.quantity -= 1;
        if (existing.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
          state.visibleIds = state.visibleIds.filter((vid) => vid !== id);
        }
      }
    },

    deleteFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.visibleIds = state.visibleIds.filter((vid) => vid !== id);
    },

    clearCart(state) {
      state.items = [];
      state.visibleIds = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
} = cartSlice.actions;

// selectors
export const selectCartItems = (state) => state.cart.items;
export const selectVisibleIds = (state) => state.cart.visibleIds;
export const selectTotalAmount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export default cartSlice.reducer;
