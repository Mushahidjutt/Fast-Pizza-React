import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], 
  cart : '',
  visibleIds: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addToCart(state, action) {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        // Make sure incoming payload has unitPrice
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const existing = state.items.find(item => item.id === action.payload);
      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// ✅ Selector to calculate total amount
export const selectTotalAmount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

export default cartSlice.reducer;
