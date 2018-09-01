const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => {
    console.log('New message', message);

    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

  });

  socket.on('createCurrentLocation', (position) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', position.latitude, position.longitude));
  });


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});