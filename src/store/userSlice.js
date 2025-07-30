import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
setUser: (state, action) => {
      // CRITICAL: Always use deep cloning to avoid reference issues
      // This prevents potential issues with object mutations
      // Handle lookup fields properly to prevent rendering objects as React children
      const userData = JSON.parse(JSON.stringify(action.payload));
      
      // Ensure role is properly extracted if it's a lookup object
      if (userData?.role && typeof userData.role === 'object' && userData.role.Name) {
        userData.role = userData.role.Name;
      }
      
      state.user = userData;
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;