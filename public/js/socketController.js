/**
 * Created by graham on 8/21/16.
 */

var socket = io();

socket.on('connection', function(socket){
   console.log('connected!');
});

socket.on('unassigned', function(data){
    layoutHelpers.addToPage(data);
});

