/**
 * Created by graham on 8/21/16.
 */

var socketio = require('socket.io');


module.exports.listen = function(server, tlsAsana){

    let io = socketio.listen(server);

    io.on('connection', function(socket){
        tlsAsana.getUnassigned().then(function(list){
            socket.emit('unassigned', list);
        });
    });
};