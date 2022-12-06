import { combineReducers } from 'redux';
import chatReducer from './chatSlice';
import userReducer from './userSlice';
import roomReducer from './roomSlice';

export default combineReducers({
  chat: chatReducer,
  user: userReducer,
  room: roomReducer,
});
