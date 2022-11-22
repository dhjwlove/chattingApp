const { Server } = require('socket.io');

const io = new Server({});

io.on('connection', (socket) => {
  console.log('client conneted!!!', socket.id);

  socket.emit('connection');

  socket.on('disconnect', () => {
    console.log('연결 끊어짐', socket.id);
  });

  socket.on('message', (d) => {
    console.log('d', d);
    socket.emit('message', d);
  });
});

console.log('start');
io.listen(3000);
