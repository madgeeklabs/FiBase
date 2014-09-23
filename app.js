var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser  = require('body-parser');

server.listen(3003);

app.use( bodyParser.json() ); 
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('connected someone');
	
	socket.on('newnews', function (data) {
		socket.broadcast.emit('news', { picture: 'http://1.bp.blogspot.com/_xoP2ezvpU7I/TOpwOt_abqI/AAAAAAAAAoI/gJZ8nRSZkoU/s1600/zoidberg.png',
		text: 'Zoidberg is da best' });
		console.log(data);
	});
});

app.post('/listening', function (req, res) {
	console.log(req.body);
});
