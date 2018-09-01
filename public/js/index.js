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

socket.on('newLocationMessage', function (message) {
  const li = $('<li></li>');
  const a = $('<a target="_blank">My current location</a>');

  li.text(`${message.from} `);
  a.attr('href', message.url);
  li.append(a);
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

const sendLocation = jQuery('#send-location');
sendLocation.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Your browser does not support geolocation');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createCurrentLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    return alert('Unable to fetch user location');
  });
});