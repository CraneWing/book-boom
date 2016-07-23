// trades API.
// all trades , user trades, add trade, delete trade
var express = require('express');
var router = express.Router();
var request = require('request');
var Trade = require('../models/trade');
var User = require('../models/user');

// get all book trades
router.get('/', function(req, res) {
	Trade.find(function(err, trades) {
		if (err) res.send(err);

		if (trades.length == 0) {
			res.json({
				trades: null,
				message: 'no trades yet'
			});
		}
		else {
			res.json(trades);
		}
	});
});

// get single trade
router.get('/:id', function(req, res) {
	console.log(req.params.id);
	
	Trade.findOne({ _id: req.params.id }, function(err, trade) {
		if (err) res.send(err);
		
		if (!trade) {
			res.status(404).json({
				message: 'Sorry, that trade does not exist'
			});
		}
		
		res.json(trade);
	});
});

// add trade from book search menu
router.post('/add/:id', function(req, res) {
 	var bookId = req.params.id;
 	var userId = req.body.user_id;
 	var screenName = req.body.screen_name;
	
	var options = {
		url: 'https://www.googleapis.com/books/v1/volumes/' + bookId
	}; 

	function callback(err, response, data) {
		if (!err && response.statusCode === 200) {
			var book = JSON.parse(data);
			var authors = [];

			if (book.volumeInfo.authors.length > 0) {
				authors = book.volumeInfo.authors.map(function(author) {
					return author;
				});
			}
			else {
				authors.push('Not given');
			}
			
			var coverURL = book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : '/assets/img/book-cover.jpg';

			var publisher = book.volumeInfo.publisher ? book.volumeInfo.publisher : 'Not given';
			var publishDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'Not given';
			
			User.findById({_id: userId}, function(err, user) {
				var city = user.location.city;
				var state = user.location.state;
				
				var trade = new Trade({
					title: book.volumeInfo.title,
					authors: authors,
					publisher: publisher,
					publish_date: publishDate,
					isbn: book.volumeInfo.industryIdentifiers[1].identifier,
					cover_url: coverURL,
					trader: screenName,
					trader_id: userId,
					trader_location: {
						city: city,
						state: state
					}
				});
				
				trade.save(function(err) {
					if (err) res.send(err);
	
					res.json({
						message: 'Your trade was successfully added'
					});
				});
			});
		}
		else if (response.statusCode == 404) {
		 	console.log('API search error: ' + err);
	  }
			
	}

  request(options, callback);	
});

module.exports = router;