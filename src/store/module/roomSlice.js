import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addRoom: (state, actions) => {
      state.rooms = [...state.rooms, actions.payload];
    },
    setRoom: (state, actions) => {
      state.rooms = [...actions.payload];
    },
  },
});

export const { addRoom, setRoom } = roomSlice.actions;

export default roomSlice.reducer;
