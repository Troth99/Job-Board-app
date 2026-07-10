import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;

}

const initialState: AuthState = {
  isAuthenticated: false,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean}>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
 
    },
    logout: (state) => {
      state.isAuthenticated = false;

    },
  },
});

export const { setAuthenticated, logout } = authSlice.actions;

export default authSlice.reducer;
