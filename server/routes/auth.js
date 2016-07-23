var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var async = require('async');

var keys = require('../config/keys');
var authMiddleware = require('../middleware/auth-middleware');

var User = require('../models/user');

router.post('/signup', function(req, res) {
	var signupUser = req.body;
	console.log(signupUser);

  async.waterfall([
    function(callback) { 
      // check for unique email
      User.findOne({ email: signupUser.email }, function(error, user) {
      
        if (user) {
          return res.status(409).send({
            message: {
              email: 'Sorry, that email is already taken'
            }
          });
        }
      });

      callback(null, signupUser);
    },
    function(userData, callback) { 
      // check for unique screen name
      User.findOne({ screen_name: userData.screen_name }, function(error, user) {
        if (user) {
          return res.status(409).send({
            message: {
              email: 'Sorry, that screen name is already taken'
            }
          });
        }
      });

      callback(null, userData);
    }
  ], function(err, user) {
    // set new user and save to database
    var newUser = new User({
      email: user.email,
      password: user.password,
      screen_name: user.screen_name,
      name: {
        first: user.first_name,
        last: user.last_name
      },
      location: {
        city: user.city,
        state: user.state
      }
    });

    newUser.save(function(err) {
      if (err) res.send(err);

      // create web token
      var token = authMiddleware.createToken(newUser);

      res.send({
        token: token,
        user: newUser
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  User.findOne({ email: req.body.email}, '+password', function(error, user) {
    if (!user) {
      return res.status(401).send({
        message: {
          email: 'Sorry, user not found!'
        }
      });
    }

    bcrypt.compare(req.body.password, user.password, function(error, isMatch) {
      if (!isMatch) {
        return res.status(401).send({
          message: {
            password: 'Incorrect password'
          }
        });
      }

      user = user.toObject();
      
      delete user.password;

      var token = authMiddleware.createToken(user);

      res.send({
        token: token,
        user: {
          email: user.email,
          screen_name: user.screen_name,
          id: user._id
        }
      });
    });
  });
});

module.exports = router;