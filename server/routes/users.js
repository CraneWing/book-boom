var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Trade = require('../models/trade');

router.get('/:id', function(req, res) {
	var userId = req.params.id;
	var hasTrades, trades;

  User.findOne({ _id: userId }, function(err, user) {
  	if (err) res.send(err);
  	
  	Trade.find({trader_id: user.id}, function(err, userTrades) {
  		if (err) res.send(err);
  		
  		if (userTrades.length == 0) {
  			trades = null;
  			
  		}
  		else {
  		  trades = userTrades;
  		}
  		
  		res.json({
  			user: user,
  			trades: trades
  		});
  	});
  });   
});

router.post('/update', function(req, res) {
  console.log(req.body);
	
  User.findOne({ _id: req.body._id}, function(err, updatedUser) {
		updatedUser.name.first = req.body.name.first;
		updatedUser.name.last = req.body.name.last;
		updatedUser.screen_name = req.body.screen_name;
		updatedUser.email = req.body.email;
		updatedUser.location.city = req.body.location.city;
		updatedUser.location.state = req.body.location.state;
		updatedUser.updated_at = Date.now();

    console.log(updatedUser);
		updatedUser.save(function(err) {
			if (err) res.send(err);

			res.status(200).send({
				message: 'Your profile was successfully updated',
				user: updatedUser
			});
		});
	});
});

module.exports = router;