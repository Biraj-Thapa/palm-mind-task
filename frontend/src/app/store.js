import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import messageReducer from "../features/messageSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
  },
});

export default store;
