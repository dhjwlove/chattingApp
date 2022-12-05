import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.message = [...state.message, action.payload];
    },
  },
});
export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
