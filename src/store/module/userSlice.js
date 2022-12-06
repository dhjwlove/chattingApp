import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  userList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserReducer: (state, action) => {
      state.user = action.payload;
    },
    setUserListReducer: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { setUserReducer, setUserListReducer } = userSlice.actions;

export default userSlice.reducer;
