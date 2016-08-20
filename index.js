/**
 * Created by graham on 8/19/16.
 */

var tlsAsana = require('tls-asana');
tlsAsana.connect();
var express = require('express');
var http = require('http');
const path = require('path');
var hbs = require('express-handlebars');
var app = express();
require('./routes/routes')(app, tlsAsana);
let options = {
    dotfiles:'ignore',
    extensions: 'html',
    index:false
}

let port = 1337;

app.engine('hbs', hbs({extname:'hbs', defaultLayout:'layout', layoutsDir: path.join(__dirname, 'views')}));
app.set('port', port);
app.set('view engine', 'hbs');
app.use( express.static(path.join(__dirname, 'public'), options) );

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


function onListening() {
    console.log('App listening on port: ' + app.get('port'));
}

function onError(){
    console.log('Error!');
}