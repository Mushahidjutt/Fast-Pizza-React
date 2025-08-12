// src/Redux/enterValueSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  enterValue: false, // default value
};

const enterValueSlice = createSlice({
  name: 'enterValue',
  initialState,
  reducers: {
    setEnterValue(state, action) {
      state.enterValue = action.payload; // true / false set karne ka control
    },
  },
});

export const { setEnterValue } = enterValueSlice.actions;
export const selectEnterValue = (state) => state.enterValue.enterValue;
export default enterValueSlice.reducer;
