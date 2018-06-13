'use strict';

var roomUrl;

$('document').ready(function() {
    generateRoomUrl();

});

function shortUrl() {
    return ("000000" + (Math.random()*Math.pow(36,6) << 0).toString(36)).slice(-6)
}

function generateRoomUrl() {
    var room = shortUrl();
	var link = document.getElementById("room-url");
	roomUrl =  'http://'+window.location.host+'/'+room;
	link.href = roomUrl;
	link.innerHTML = roomUrl;
}