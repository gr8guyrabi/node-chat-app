class Users {
  constructor () {
    this.userList = [];
  }

  addUser (id, name, room) {
    const user = { id, name, room };
    this.userList.push(user);
    return user;
  }

  removeUser (id) {
    let user = this.getUser(id);
    if(user) {
      this.userList = this.userList.filter((user) => user.id !== id);
    }
    return user;
  }
  
  getUser (id) {
    return this.userList.filter((user) => user.id === id)[0];
  }

  getUserList (room) {
    let roomUserList = this.userList.filter((user) => user.room === room);
    let roomUserNameList = roomUserList.map((user) => user.name);
    return roomUserNameList;
  }

  getRoomList () {
    return (this.userList.map(user => user.room)).filter((value, index, self) => self.indexOf(value) === index);
  }

}

module.exports = {Users};