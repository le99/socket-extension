// Dependencias

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Usuario actual a asignar
var current = 1;

// Servicio GET (usando express)

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Al momento de existir conexión se ejecuta la función de callback
io.on('connection', function(socket){

    // Emite (publica) en el tópico 'new user' para indicar a los sucriptores
    // que hay un nuevo usuario en la conversación
    // var user_id = current;
    var user_id = socket.id;
    io.emit('new user', user_id);
    current ++;

    // Al momento de recibir un mensaje en el tópico 'chat message' ejecuta la función de callback
    socket.on('chat message', function(msg){

        // Emite (publica) en el tópico 'chat message' para los múltiples suscriptores
        io.emit('chat message', msg);
    });

    //Disconnect
    socket.on('disconnect', function () {
      io.emit('user disconnected', {user: user_id});
  });
});


http.listen(3000, function(){
  console.log('Servidor en el puerto 3000');
});
