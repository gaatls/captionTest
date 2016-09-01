/**
 * Created by graham on 8/21/16.
 */

var serverURL = 'http://localhost:1337'
var socket = io().connect(serverURL);

socket.on('connection', function(socket){
   console.log(socket);
});

socket.on('unassigned', function(data){
    layoutHelpers.addToPage(data);
});

socket.on('taskInfo', function(data){
    console.log(data);
    layoutHelpers.placeContent(data);
    layoutHelpers.placeVideo(data);
});

function sendMessage(eventName, data){
    socket.emit(eventName, data);
}
