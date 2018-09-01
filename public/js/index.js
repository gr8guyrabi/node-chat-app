const socket = io();

socket.on('connect', function () {
  console.log('Connected to the server.');
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const messageTemplate = jQuery('#message-template').html();
  let html = Mustache.render(messageTemplate, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery('ol#messages').append(html);
  // const li = $('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // $('ol#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const locationMessageTemplate = jQuery('#location-message-template').html();
  let html = Mustache.render(locationMessageTemplate, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('ol#messages').append(html);
  
  // const li = $('<li></li>');
  // const a = $('<a target="_blank">My current location</a>');

  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // $('ol#messages').append(li);


});


socket.on('disconnect', function () {
  console.log('Disconnected to the server.');
});


$('#message-form').on('submit', function (e) {
  e.preventDefault();
  let messageTextBox = jQuery('input[name="message"]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

const sendLocation = jQuery('#send-location');
sendLocation.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Your browser does not support geolocation');
  }
  sendLocation.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    sendLocation.removeAttr('disabled').text('Sending location');
    socket.emit('createCurrentLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    sendLocation.removeAttr('disabled').text('Sending location');
    return alert('Unable to fetch user location');
  });
});