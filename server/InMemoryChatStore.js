class InMemoryChatStore {
  constructor() {
    this.chats = new Map();
  }

  getAllChatByRoomID(roomID) {
    return this.chats.get(roomID);
  }

  saveChat(roomID, data) {
    this.chats.set(roomID, data);
  }
}

module.exports = {
  InMemoryChatStore,
};
