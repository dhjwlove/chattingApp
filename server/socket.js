const { Server } = require('socket.io');
const crypto = require('crypto');
const { InMemorySessionStore } = require('./InMemorySessionStore');
const { InMemoryRoomStore } = require('./InMemoryRoomStore');
const { InMemoryChatStore } = require('./InMemoryChatStore');

const randomUUID = () => crypto.randomUUID;

const sessionStore = new InMemorySessionStore();
const roomStore = new InMemoryRoomStore();
const chatStore = new InMemoryChatStore();

const socket = (server, app, session) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // app.set('io', io);

  // namespace: chat
  const chat = io.of('/');

  // socket middleware 등록
  // io.use((socket, next) => {
  //   const { userID } = socket.handshake.auth;
  //   // 기 등록된 유저인 경우
  //   if (userID) {
  //     const user = InMemorySessionStore.findSession(userID);
  //     if (user) {
  //       socket.userID = user.userID;
  //       socket.userName = user.userName;
  //       socket.rooms = user.rooms;
  //       next();
  //     }
  //   }
  //   // 등록되지 않은 유저의 경우
  //   const { userName } = socket.handshake.auth;
  //   console.log('username', userName);
  //   // username 없이 접속할 경우 에러 처리
  //   if (!userName) {
  //     return next(new Error('invalid username'));
  //   }
  //   socket.userName = userName;
  //   socket.userID = randomUUID();
  //   socket.rooms = [];
  //   next();
  // });

  chat.on('connection', (socket) => {
    console.log(`${socket.id}님이 접속하셨습니다.`, socket.id);

    socket.on('login', (data) => {
      // const { userID } = socket.handshake.auth;
      const { userID } = data;
      // 기 등록된 유저인 경우
      if (userID) {
        const user = sessionStore.findSession(userID);
        if (user) {
          socket.userID = user.userID;
          socket.userName = user.userName;
          socket.rooms = user.rooms;
          // next();
        }
      }
      // 등록되지 않은 유저의 경우
      const { userName } = data;
      console.log('username', userName);
      // username 없이 접속할 경우 에러 처리
      if (!userName) {
        // return next(new Error('invalid username'));
      }
      socket.userName = userName;
      socket.userID = randomUUID();
      socket.rooms = [];

      // 유저 세션 정보 저장
      sessionStore.saveSession(socket.userID, {
        userID: socket.userID,
        userName: socket.userName,
        rooms: socket.rooms,
        connected: true,
      });

      // client에 session 정보 전달
      socket.emit('session', {
        userID: socket.userID,
      });

      // 접속자에게 유저리스트를 보내어 동기화 한다.
      const users = [];
      sessionStore.findAllSessions().forEach((session) => {
        users.push({
          userID: session.userID,
          userName: session.userName,
          connected: session.connected,
        });
      });
      socket.emit('users', users);

      // 다른 접속자에게 현재 접속한 사용자의 데이터를 전송한다.
      socket.broadcast.emit('user_connected', {
        userID: socket.userID,
        userName: socket.userName,
        connected: true,
      });

    // 접속자가 포함되어 있는 채팅방에 접속한다.
    // const rooms = JSON.parse(socket.rooms);
    // if (rooms.length > 0) {
    //   rooms.forEach((room) => {
    //     socket.join(room);
    //   });
    // }
    });
  });
};

module.exports = socket;
