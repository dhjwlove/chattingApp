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
  const { sessionID } = socket.handshake.auth;
  if (sessionID) {
    // find existing session
    const session = sessionStore.findSession(sessionID);
    console.log('All', sessionStore.findAllSessions());
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }
  const { username } = socket.handshake.auth;
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

  // join the "userID" room
  socket.join(socket.userID);

  const users = [];
  sessionStore.findAllSessions().forEach((session) => {
    users.push({
      userID: session.userID,
      username: session.username,
      connected: session.connected,
    });
  });
  socket.emit('users', users);

  socket.broadcast.emit('user connected', {
    userID: socket.userID,
    username: socket.username,
    connected: true,
  });

  socket.on('private message', ({ content, to }) => {
    socket.to(to).to(socket.userID).emit('private message', {
      content,
      from: socket.userID,
      to,
    });
  });

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
});

console.log('start');
io.listen(3000);
