const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected.');

  socket.on('createMessage', (message) => {
    console.log('New message', message);
  });

  socket.emit('newMessage', {
    from: "example@example.com",
    text: "Hey! What's up???",
    createdAt: 1235483
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up and running at port ${port}`);
});