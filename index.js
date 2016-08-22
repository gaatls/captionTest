/**
 * Created by graham on 8/19/16.
 */

let tlsAsana = require('tls-asana');
tlsAsana.connect();
let express = require('express');
let http = require('http');
const path = require('path');
let hbs = require('express-handlebars');
let app = express();
require('./routes/routes')(app, tlsAsana);
let debugHelpers = require('./debug/debugHelpers');
let options = {
    dotfiles:'ignore',
    extensions: ['html', 'css', 'js'],
    index:false
};

app.use( express.static(path.join(__dirname, 'public'), options) );

let port = 1337;

app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout', layoutsDir: path.join(__dirname, 'views'), helpers:debugHelpers.HBSDebugHelpers}) );
app.set('port', port);
app.set('view engine', 'hbs');

let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

//Deal with the socket.io dependencies that exist
require('./lib/sockets').listen(server, tlsAsana);

function onListening() {
    console.log('App listening on port: ' + app.get('port'));
}

function onError(){
    console.log('Error!');
}