import socket from './socketService';

function init() {
  console.log('chatService 초기화');
  socket.on('message', (data) => {

  });
}

export default {
  init,
};
