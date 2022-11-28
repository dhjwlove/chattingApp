const { Server } = require('socket.io');
const crypto = require('crypto');

const io = new Server({
  cors: {
    origin: 'http://localhost:8080',
  },
});

const randomId = () => crypto.randomUUID();

const { InMemorySessionStore } = require('./InMemorySessionStore');

const sessionStore = new InMemorySessionStore();

io.use((socket, next) => {
  // console.log('socket handshake', socket.handshake);
  const { sessionID } = socket.handshake.auth;
  console.log('sessionID', sessionID);
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    console.log('All', sessionStore.findAllSessions());
    console.log('session', session);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const { username } = socket.handshake.auth;
  console.log('username', username);
  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.sessionID = randomId();
  socket.userID = randomId();
  socket.username = username;
  next();
});

io.on('connection', (socket) => {
  console.log('client conneted!!!', socket.sessionID);

  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  socket.emit('session', {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  socket.on('private message', ({ content, to }) => {
    socket.to(to).to(socket.userID).emit('private message', {
      content,
      from: socket.userID,
      to,
    });
  });

  // socket.emit('connection');

  socket.on('disconnect', async () => {
    const matchingSockets = await io.in(socket.userID).fetchSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit('user disconnected', socket.userID);

      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      });
    }
  });

  // socket.on('request_message', (d) => {
  //   console.log('d', d);
  //   io.emit('response_message', d);
  // });
});

console.log('start');
io.listen(3000);
