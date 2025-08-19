import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser : null,
  islogged : true,
    
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload;
      state.islogged = true;
    },
    
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;



