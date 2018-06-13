var consign = require('consign');
var bodyParser = require('body-parser');
var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var nodestatic = require('node-static');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './mvc/views');

app.use(expressValidator());

app.use(express.static('./mvc/public'));

app.use(bodyParser.urlencoded({extended: true}));

var server = app.listen(3000, function () {
    console.log('Server Started');
})

var io = require('socket.io').listen(server);

io.set('log level',0);

consign()
	.include('mvc/routes')
	.then('mvc/controllers')
	.into(app);

module.exports = app;
module.exports = io;