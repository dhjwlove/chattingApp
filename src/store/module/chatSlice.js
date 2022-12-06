import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessageReducer: (state, action) => {
      state.message.push(action.payload);
    },
  },
});
export const { addMessageReducer } = chatSlice.actions;

export default chatSlice.reducer;
