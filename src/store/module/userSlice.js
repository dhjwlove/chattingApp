import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  userList: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserID: (state, action) => {
      state.user.userID = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
  },
});

export const { setUser, setUserList, setUserID } = userSlice.actions;

export default userSlice.reducer;
