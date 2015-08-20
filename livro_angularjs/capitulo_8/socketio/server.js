var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000, function(){
  console.log("Servidor no ar");
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/app.js', function(req, res) {
  res.sendfile(__dirname + '/app.js');
});

app.get('/services.js', function(req, res) {
  res.sendfile(__dirname + '/services.js');
});

io.sockets.on('connection', function (socket) {
  socket.emit('new:msg', {date: Date.now(), message: 'Welcome to AnonBoard'});

  socket.on('broadcast:msg', function(data) {
    // Tell all the other clients (except self) about the new message
    socket.broadcast.emit('new:msg', {date: data.date, message: data.message });
  });
});

app.use('/static', express.static('../../../bower_components'));