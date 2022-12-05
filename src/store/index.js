import { configureStore } from '@reduxjs/toolkit';
import userReducer from './module/userSlice';
import roomSlice from './module/roomSlice';
import chatSlice from './module/chatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomSlice,
    chat: chatSlice,
  },
});
