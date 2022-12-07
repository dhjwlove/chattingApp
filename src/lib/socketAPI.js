// import io from 'socket.io-client';

// const URL = 'http://localhost:3000';
// const socket = io(URL, { autoConnect: false });

// console.log('socket 초기화');

// socket.onAny((event, ...args) => {
//   console.log(event, args);
// });

// export default socket;

import io from 'socket.io-client';

const URL = 'http://localhost:3000';

let instance = null;

class SocketAPI {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  connect() {
    this.socket = io.connect(URL);
    return new Promise((resolve, reject) => {
      this.socket.on('connect', () => resolve());
      this.socket.on('connect_error', (error) => reject(error));
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.socket.disconnect(() => {
        this.socket = null;
        resolve();
      });
    });
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.emit(event, data, (response) => {
        if (response.error) {
          console.error(response.error);
          return reject(response.error);
        }

        return resolve();
      });
    });
  }

  on(event, fun) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.on(event, fun);
      resolve();
    });
  }
}

export default new SocketAPI();
