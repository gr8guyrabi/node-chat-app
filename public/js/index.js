const socket = io();

socket.on('connect', function () {
  console.log('Connected to the server.');

  socket.on('newMessage', (message) => {
    console.log('New message', message);
  })

});

socket.emit('createMessage', {
  to: 'firstUser',
  text: 'Hey! need some cash'
});

socket.on('disconnect', function () {
  console.log('Disconnected to the server.');
});
