const expect = require('expect');

const {Users} = require('./users');

describe('User', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.userList = [{
        id: '1',
        name: 'Rad',
        room: 'React Course'
      }, {
        id: '2',
        name: 'Mad',
        room: 'Node Course'
      }, {
        id: '3',
        name: 'Bad',
        room: 'React Course'
    }];
  });
  it('should add a new user.', () => {
    const data = {
      id: '123245',
      name: 'rabi',
      room: 'my room'
    };
    const users = new Users();
    let resUser = users.addUser(data.id, data.name, data.room);
    expect(users.userList).toEqual([data]);
  });

  it('should get the user', () => {
    let userId = '1';
    let user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not get the user', () => {
    let userId = '25';
    let user = users.getUser(userId);
    expect(user).toBeFalsy();
  });

  it('should remove the user', () => {
    let userId = '3';
    let user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.userList).toEqual(expect.not.arrayContaining([{
        id: '3',
        name: 'Bad',
        room: 'React Course'
    }]));
    expect(users.userList.length).toBe(2);
  });

  it('should not remove the user', () => {
    let userId = '25';
    let user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.userList).toEqual(expect.arrayContaining([{
      id: '3',
      name: 'Bad',
      room: 'React Course'
  }]));
    expect(users.userList.length).toBe(3);
  });

  it('should get all the name of the users for React Course.', () => {
    let usersName = users.getUserList('React Course');
    expect(usersName).toEqual(['Rad', 'Bad']);
  });

  it('should get all the name of the users for Node Course.', () => {
    let usersName = users.getUserList('Node Course');
    expect(usersName).toEqual(['Mad']);
  })
});