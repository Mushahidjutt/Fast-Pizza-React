import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../cartSlice';
import userSlicer from '../userSlice';




const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userSlicer,
    
  },
});

export default store;
