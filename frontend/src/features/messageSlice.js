import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "messages",
  initialState: { list: [] },
  reducers: {
    setMessages: (state, action) => {
      state.list = action.payload;
    },
    addMessage: (state, action) => {
      state.list.push(action.payload);
    },
    clearMessages: (state) => {
      state.list = [];
    },
  },
});

export const { setMessages, addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
