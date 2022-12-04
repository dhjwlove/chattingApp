import io from 'socket.io-client';

const URL = 'http://localhost:3000';
const socket = io(URL, { autoConnect: false });

console.log('socket 초기화');

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
