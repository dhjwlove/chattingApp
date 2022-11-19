const { Server } = require('socket.io');

const io = new Server({});

io.on('connection', (socket) => {
  console.log('client conneted!!!', socket.connected);
  socket.on('ping', () => {
    console.log('Received ping');
    socket.emit('pong');
    console.log('Emit pong  ');
  });
});

console.log('start');
io.listen(3000);
