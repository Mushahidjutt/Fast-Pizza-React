// src/redux/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import cartReducer from '../cartSlice';
import userSlicer from '../userSlice';





const store = configureStore({
  reducer: {
    cart: cartReducer, // you can add more slices later
    user : userSlicer,
  },
});

export default store;
