const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');

var app = express();
var server = http.Server(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('getActiveRooms', (callback) => {
    callback(users.getRoomList());
  });

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('provide a valid name and room.');
    }
    let name = params.name;
    let room = (params.room).toLowerCase();

    let userListForRoom = users.getUserList(room).map(user => user.toLowerCase());

    if(userListForRoom.includes(name.toLowerCase())) {
      return callback('user already exist.');
    }

    callback();
    
    socket.join((room).toLowerCase());

    users.removeUser(socket.id);
    users.addUser(socket.id, name, room);

    io.to(room).emit('updateUserList', users.getUserList(room));

    io.emit('updateActiveRooms', users.getRoomList());
    
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));
    socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined.`));

  });


  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

  });

  socket.on('createCurrentLocation', (coords) => {
    let user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });


  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);
    if(user) {
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
      io.to(users.room).emit('updateUserList', users.getUserList(users.room));
    }
  });
});


server.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});