var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// We define a route handler / that gets called when 
// we hit our website home.
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.broadcast.emit('chat message','new user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
   socket.broadcast.emit('chat message','guest disconnected');
  });
  
});

http.listen(process.env.PORT || 5500, function(){
  // We make the http server listen on port 5500.
  console.log('listening on *:5500');
});
    