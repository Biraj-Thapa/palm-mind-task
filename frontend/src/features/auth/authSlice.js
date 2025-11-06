import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
let user = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) user = JSON.parse(storedUser);
} catch (err) {
  user = null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { user, token },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
