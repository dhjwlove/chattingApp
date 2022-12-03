const { Server } = require('socket.io');

const socket = (server, app, session) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  app.set('io', io);

  const chat = io.of('/chat');

  io.use((socket, next) => {
    next();
  });

  chat.on('connection', (socket) => {

  });
};

export default socket;
