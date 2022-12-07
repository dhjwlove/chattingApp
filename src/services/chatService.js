import socketAPI from '../lib/socketAPI';

async function init() {
  console.log('chatService 초기화');
  await socketAPI.on('message', (data) => {
  });
}

export default {
  init,
};
