var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var shortid = require('shortid');
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate()
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		select: false
	},
	name: {
		first: {
			type: String,
			default: null
		},
		last:  {
			type: String,
			default: null
		}
	},
	screen_name: {
		type: String,
		unique: true
	},
	location: {
		city: {
			type: String,
			default: null
		},
		state: {
			type: String,
			default: null
		}
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date
	}
});

userSchema.pre('save', function(next) {
	var user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User', userSchema);