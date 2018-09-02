const socket = io();

socket.on('connect', function () {
  socket.emit('getActiveRooms', function (rooms) {
    displayActiveRooms(rooms);
  });

  socket.on('updateActiveRooms', function (rooms) {
    displayActiveRooms(rooms);
  });
});

function displayActiveRooms(rooms) {
  let options = '';
  if(rooms.length === 0) {
    options = '<option disabled>No active rooms</option>';
  } else {
    let roomOptionTemplate = jQuery('#room-list').html();
    rooms.forEach((room) => {
      options += Mustache.render(roomOptionTemplate, {
        room_value: room,
        room_name: room.charAt(0).toUpperCase() + room.slice(1),
      });
    });
  }
  
  jQuery('#select-room').html(options);
}


jQuery('#enter-chat').on('submit', function (e) {
  e.preventDefault();
  let userName = $(this).find('input[name="name"]').val();
  let enteredRoom = $(this).find('input[name="room"]').val();
  let selectedRoom = $(this).find('select[name="active-room"]').val();
  let actionPage = $(this).attr('action');
  if(actionPage.charAt(0) === '/') {
    actionPage = actionPage.split('/')[1];
  }
  let url = window.location.href + actionPage + `?name=${userName}&room=`; 
  if(enteredRoom !== '') {
    url += enteredRoom;
  } else if(selectedRoom !== null && selectedRoom !== '') {
    url += selectedRoom;
  }
  window.location.href = url;
});