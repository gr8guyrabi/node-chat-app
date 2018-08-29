const socket = io();

socket.on('connect', function () {
  console.log('Connected to the server.');
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('ol#messages').append(li);
});


socket.on('disconnect', function () {
  console.log('Disconnected to the server.');
});


$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('input[name="message"]').val()
  }, function () {

  });
});