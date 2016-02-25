var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var current = 1;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    io.emit('new user', current);
    current ++;

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
