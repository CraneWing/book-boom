// trades API.
// all trades , user trades, add trade, delete trade
var express = require('express');
var router = express.Router();
var request = require('request');
// used for uploading images
var multer = require('multer');

var Trade = require('../models/trade');
var User = require('../models/user');

var upload = multer({
  dest: '../client/assets/img/uploads/'
});

// get all book trades
router.get('/', function(req, res) {
	Trade.find(function(err, trades) {
		if (err) return res.send(err);

		if (trades.length == 0) {
			res.json({
				trades: []
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
		if (err) return res.send(err);
		
		if (!trade) {
			res.status(404).json({
				message: 'Sorry, that trade does not exist'
			});
		}
		
		res.json(trade);
	});
});

// add trade from user "add trade" form
router.post('/add', upload.single('cover_img'), function(req, res, next) {
	console.log(req.body);
	console.log(req.file);
	res.json('form and image data received!');
});

// add trade from book search menu
router.post('/add/:id', function(req, res) {
	// ID from params here is the book ID
 	var bookId = req.params.id;
 	// also pass in user ID and screen name
 	var userId = req.body.user_id;
 	var screenName = req.body.screen_name;
	
	// Google Books API query URL
	var options = {
		url: 'https://www.googleapis.com/books/v1/volumes/' + bookId
	}; 
	
	// callback in format for Node "request" module
	function callback(err, response, data) {
		if (!err && response.statusCode === 200) {
			var book = JSON.parse(data);
			var authors = [];
			
			// authors from Google Books are always in array, even
			// if a single author. So get the authors and place in 
			// new array. if no authors, generic "not given" string.
			if (book.volumeInfo.authors.length > 0) {
				authors = book.volumeInfo.authors.map(function(author) {
					return author;
				});
			}
			else {
				authors.push('Not given');
			}
			
			// covers any missing data, such as no author,
			// title, publisher, ISBN
			var coverURL = book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:') : '/assets/img/book-cover.jpg';

			var publisher = book.volumeInfo.publisher ? book.volumeInfo.publisher : 'Not given';
			
			var publishDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : 'Not given';
			
			var isbn = book.volumeInfo.industryIdentifiers[1].identifier ? book.volumeInfo.industryIdentifiers[1].identifier : 'Not given';
			
			User.findById({_id: userId}, function(err, user) {
				if (err) return res.send(err);
				
				var city = user.location.city;
				var state = user.location.state;
				
				var trade = new Trade({
					title: book.volumeInfo.title,
					authors: authors,
					publisher: publisher,
					publish_date: publishDate,
					isbn: isbn,
					cover_url: coverURL,
					trader: screenName,
					trader_id: userId,
					trader_location: {
						city: city,
						state: state
					}
				});
				
				trade.save(function(err) {
					if (err) return res.send(err);
	
					res.json({
						message: 'Your trade was successfully added'
					});
				});
			});
		}
	}

  request(options, callback);	
});

// get all of user's trades
router.get('/all/:user_id', function(req, res) {
	Trade.find({ trader_id: req.params.user_id }, function(err, trades) {
		if (err) res.send(err);
		
		if (trades.length > 0) {
			res.json(trades);
		}
		else {
			res.json({
				message: 'User has no trades'
			});
		}
	});
});

// updates trade after another user makes offer
router.post('/update', function(req, res) {
	var tradeId = req.body.trade_id;
	var userWants = req.body.screen_name;
	var userWantsId = req.body.user_id;
	
	Trade.findById({ _id: tradeId }, function(err, trade) {
		if (err) res.send(err);
		
		trade.user_wants = userWants;
		trade.user_wants_id = userWantsId;
		trade.offer_made_at = Date.now();
		trade.offer_made = true;
		
		trade.save(function(err) {
			if (err) res.send(err);
			
			res.json({
				message: 'Your trade notification has been sent!'
			});
		});
	});
});

module.exports = router;