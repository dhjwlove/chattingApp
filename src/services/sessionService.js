// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { setUserID, setUserList } from '../store/module/userSlice';

async function init(store, socketAPI) {
  // console.log('sessionService 초기화');
  //   const navigate = useNavigate();
  // await socketAPI.on('session', ({ userID }) => {
  //   socket.auth = { userID };
  //   store.dispatch(setUserID(userID));
  // });

  // await socketAPI.on('connect_error', (err) => {
  //   if (err.message === 'invalid username') {
  //     store.dispatch(setUserID(''));
  //   }
  // });

  // 채팅방에서 사용하기
  // await socketAPI.on('users', (users) => {
  //   const { userList } = store.getState().userList;
  //   users.forEach((user) => {
  //     for (let i = 0; i < userList.length; i += 1) {
  //       const existUser = userList[i];
  //       // 이미 등록된 사용인 경우
  //       if (existUser.userID === user.userID) {
  //         existUser.connected = user.connected;
  //         return;
  //       }
  //     }
  //     // 새롭게 등록되는 사용자인 경우
  //     user.self = user.userID === socket.userID;
  //     userList.push(user);
  //   });
  //   store.dispatch(setUserList(userList));
  // });

  // 채팅방에서 사용하기
  // await socketAPI.on('user_connected', (user) => {
  //   const { userList } = store.getState().userList;
  //   for (let i = 0; userList.length; i += 1) {
  //     const existUser = userList[i];
  //     // 이미 등록된 사용자인데 다시 접속한 경우
  //     if (existUser.userID === user.userID) {
  //       existUser.connected = user.connected;
  //       return;
  //     }
  //   }
  //   // 새롭게 등록되는 사용자인 경우
  //   userList.push(user);
  //   store.dispatch(setUserList(userList));
  // });

  socketAPI.on('disconnect', () => {
    console.log('socket disconnect');
  });
}

export default {
  init,
};
