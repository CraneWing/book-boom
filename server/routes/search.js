// trades API.
// all trades , user trades, add trade, delete trade
var express = require('express');
var router = express.Router();
var key = require('../config/keys.js');
var request= require('request');

var paramsObj = {
	key: key.apiKey,
	printType: 'books'
};

// get all book trades
router.post('/', function(req, res) {
	var books = {};
	// get main search keyword; title is mandatory
	var title = formatStringAndAddToParams(req.body.title, 'title');
	
	if (req.body.hasOwnProperty('publisher')) {
		formatStringAndAddToParams(req.body.publisher, 'publisher');
	}

	if (req.body.hasOwnProperty('author')) {
		formatStringAndAddToParams(req.body.author, 'author');
	}

	if (req.body.hasOwnProperty('isbn')) {
		formatStringAndAddToParams(req.body.isbn, 'isbn');
	}

 var url = 'https://www.googleapis.com/books/v1/volumes';
 var params = paramsObj;

 var options = {
 	url: url,
 	qs: params
 }; 

 function callback(error, response, data) {
 	if (!error && response.statusCode == 200) {
		books = JSON.parse(data);
		res.send(books);
	}
	else if (response.statusCode == 404) {
		console.log('API search error: ' + error);
	}
 }

 request(options, callback);

});

function formatStringAndAddToParams(item, type) {
	if (item !== null) {
		item = item.replace(/ /g, '_');
		
		switch(type) {
			case('title'):
				paramsObj.q = item;
				paramsObj.intitle = item;
				break;
			case('publisher'):
				paramsObj.inpublisher = item;
				break;
			case('author'):
				paramsObj.inauthor = item;
				break;
			case('isbn'):
				paramsObj.isbn = item;
				break;
		}
	}
}

module.exports = router;
