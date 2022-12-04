class InMemoryRoomStore {
  constructor() {
    this.rooms = new Map();
  }

  findRoom(id) {
    return this.rooms.get(id);
  }

  saveRoom(id, data) {
    this.rooms.set(id, data);
  }
}

module.exports = {
  InMemoryRoomStore,
};
