var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var randomNumber = Math.floor(Math.random() * 255);
  var userName = 'User' + randomNumber

  console.log(userName + ': Connected');
  socket.on('disconnect', function(){
    console.log(userName + ': Disconnected');
  });
  socket.on('chat message', function(msg){
    console.log(userName + ': ' + msg);
    io.emit('chat message', userName + ': ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});