var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser  = require('body-parser');
var colors = require('colors');
var outSocket;
var PORT = 3003;

server.listen(PORT);

console.log("SERVER UP LISTENING ON: ".yellow + PORT);
app.use( bodyParser.json() ); 

app.use('/CLIENT', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('connected someone');
	
	outSocket = socket;

	socket.on('newnews', function (data) {
		socket.broadcast.emit('news', { picture: 'http://1.bp.blogspot.com/_xoP2ezvpU7I/TOpwOt_abqI/AAAAAAAAAoI/gJZ8nRSZkoU/s1600/zoidberg.png',
		text: 'Zoidberg is da best' });
		console.log(data);
	});
});

app.post('/listening', function (req, res) {
	var change = req.body.contextResponses[0].contextElement;
	console.log(req.body.contextResponses[0].contextElement);

	outSocket.broadcast.emit('news', { picture: change.attributes[0].value,
		text: change.attributes[1].value });
		console.log('DATA CHANGED IN GE, PUSHING THROUGH'.green);
});
