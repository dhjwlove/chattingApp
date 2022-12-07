// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import socketAPI from '../lib/socketAPI';

async function init() {
  console.log('sessionService 초기화');
  //   const navigate = useNavigate();
  localStorage.setItem('userList', []);
  await socketAPI.on('session', ({ userID }) => {
    socket.auth = { userID };
    localStorage.setItem('userID', userID);
  });

  await socket.on('connect_error', (err) => {
    if (err.message === 'invalid username') {
      localStorage.setItem('userID', '');
    }
  });

  await socketAPI.on('users', (users) => {
    const userList = localStorage.getItem('userList');
    users.forEach((user) => {
      for (let i = 0; i < userList.length; i += 1) {
        const existUser = userList[i];
        // 이미 등록된 사용인 경우
        if (existUser.userID === user.userID) {
          existUser.connected = user.connected;
          return;
        }
      }
      // 새롭게 등록되는 사용자인 경우
      user.self = user.userID === socket.userID;
      userList.push(user);
    });
    localStorage.setItem('userList', [...userList]);
  });

  await socketAPI.on('user_connected', (user) => {
    const userList = localStorage.getItem('userList');
    for (let i = 0; userList.length; i += 1) {
      const existUser = userList[i];
      // 이미 등록된 사용자인데 다시 접속한 경우
      if (existUser.userID === user.userID) {
        existUser.connected = user.connected;
        return;
      }
    }
    // 새롭게 등록되는 사용자인 경우
    userList.push(user);
    localStorage.setItem('userList', [...userList]);
  });

  socketAPI.on('disconnect', () => {
    console.log('socket disconnect');
  });
}

export default {
  init,
};
