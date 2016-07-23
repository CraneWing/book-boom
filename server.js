var express = require('express');
var app = express();

var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongoose = require('mongoose');
mongoose.connect('mongodb://cranewing-book-boom-3549719:27017/bookboom');

var trades = require('./server/routes/trades');
var search = require('./server/routes/search');
var users = require('./server/routes/users');
var auth = require('./server/routes/auth');

app.use(favicon(__dirname + '/client/favicon.ico'));

var port = process.env.PORT || 8080;
app.use(logger('dev'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/client'));

app.use('/api/search', search);
app.use('/api/trades', trades);
app.use('/api/auth', auth);
app.use('/api/users', users);

app.use(function(error, req, res, next) {
	console.error(error.stack);
	res.send(500, { message: error.message });
});

app.listen(port, function() {
  console.log('Wingardium leviosa! Magic at port ' + port);
});
