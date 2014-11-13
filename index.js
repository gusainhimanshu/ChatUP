var express = require("express");
var app = express();
var port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("page");
});

//app.listen(port);
var io = require('socket.io').listen(app.listen(port));


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat', username: 'Server : ' });
	socket.on('send', function (data) {
		console.log(data); //logs the data coming from the client
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port "+ port);