/**
 * Created by graham on 8/21/16.
 */

'use strict';

var socketio = require('socket.io');

module.exports.listen = function(server, tlsAsana){

    let io = socketio.listen(server);

    io.sockets.on('connection', function(socket){
        tlsAsana.getUnassignedTasks().then(function(list){
            socket.emit('unassigned', list);
        });

        socket.on('taskInfoQueryEvent', function(data){
            console.log(data);
            tlsAsana.getTaskInfoByID(data.id).then(function(taskInfo){
                socket.emit('taskInfo', taskInfo);
            });
        });
    });


};