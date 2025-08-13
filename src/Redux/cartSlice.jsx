import { createSlice } from "@reduxjs/toolkit";

function calcMinutesLeft(estimatedDelivery) {
  const now = new Date();
  const deliveryTime = new Date(estimatedDelivery);
  const diffMs = deliveryTime - now;
  return Math.max(Math.floor(diffMs / 60000), 0);
}

const initialState = {
  items: [],
  visibleIds: [],
  isPriority: false,
  priorityCost: 6,
  estimatedDelivery: null,
  deliveryInMinutes: 0,
  orderNumber: null,
  searchOrderId: "",
  orders: [],
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
      state.isPriority = false;
      state.estimatedDelivery = null;
      state.deliveryInMinutes = 0;
      state.orderNumber = null;
      state.searchOrderId = "";
    },

    togglePriority(state) {
      state.isPriority = !state.isPriority;
    },

    setEstimatedDelivery(state, action) {
      state.estimatedDelivery = action.payload;
      state.deliveryInMinutes = calcMinutesLeft(action.payload);
    },

    updateDeliveryTime(state) {
      if (state.estimatedDelivery) {
        state.deliveryInMinutes = calcMinutesLeft(state.estimatedDelivery);
      }
    },

    setOrderNumber(state, action) {
      state.orderNumber = action.payload;
    },

    setSearchOrderId(state, action) {
      state.searchOrderId = action.payload;
    },

    clearSearchOrderId(state) {
      state.searchOrderId = "";
    },

    addOrder(state, action) {
      const newOrder = action.payload;
      const exists = state.orders.some((order) => order.id === newOrder.id);
      if (!exists) {
        state.orders.push(newOrder);
      }
    },

    placeOrder(state) {
      if (state.items.length === 0) return;

      const newOrder = {
        id: state.orderNumber || Date.now().toString(),
        items: state.items,
        totalAmount:
          state.items.reduce(
            (total, item) => total + item.unitPrice * item.quantity,
            0
          ) + (state.isPriority ? state.priorityCost : 0),
        isPriority: state.isPriority,
        priorityCost: state.isPriority ? state.priorityCost : 0,
        estimatedDelivery: state.estimatedDelivery,
        placedAt: new Date().toISOString(),
      };

      const exists = state.orders.some((order) => order.id === newOrder.id);
      if (!exists) {
        state.orders.push(newOrder);
      }

      state.items = [];
      state.visibleIds = [];
      state.isPriority = false;
      state.estimatedDelivery = null;
      state.deliveryInMinutes = 0;
      state.orderNumber = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
  togglePriority,
  setEstimatedDelivery,
  updateDeliveryTime,
  setOrderNumber,
  setSearchOrderId,
  clearSearchOrderId,
  placeOrder,
  addOrder,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectVisibleIds = (state) => state.cart.visibleIds;
export const selectPriority = (state) => state.cart.isPriority;
export const selectPriorityCost = (state) =>
  state.cart.isPriority ? state.cart.priorityCost : 0;
export const selectTotalAmount = (state) =>
  state.cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  ) + (state.cart.isPriority ? state.cart.priorityCost : 0);
export const selectTotalQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectEstimatedDelivery = (state) => state.cart.estimatedDelivery;
export const selectDeliveryInMinutes = (state) => state.cart.deliveryInMinutes;
export const selectOrderNumber = (state) => state.cart.orderNumber;
export const selectSearchOrderId = (state) => state.cart.searchOrderId;
export const selectAllOrders = (state) => state.cart.orders;
export const selectOrders = selectAllOrders;

export default cartSlice.reducer;
