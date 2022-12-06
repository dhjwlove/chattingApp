import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rooms: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addRoomReducer: (state, actions) => {
      state.rooms.push(actions.payload);
    },
    setRoomReducer: (state, actions) => {
      state.rooms = actions.payload;
    },
  },
});

export const { addRoomReducer, setRoomReducer } = roomSlice.actions;

export default roomSlice.reducer;
