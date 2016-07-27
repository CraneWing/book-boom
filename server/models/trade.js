var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var shortid = require('shortid');

// Google AP terms by each item
var tradeSchema = new Schema({
	_id: {
		type: String,
		'default': shortid.generate
	},
	title: {
		type: String,
		default: null
	},  
	authors: [String], 
	publisher: {
		type: String,
		default: null
	},
	cover_url: {
		type: String,
		default: '/assets/img/book-cover.jpg'
	}, 
	publish_date: {
		type: String,
		default: null
	}, 
	isbn: {
		type: String,
		default: null
	}, 
	trader: {
		type: String,
		default: null
	},
	trader_location: {
	 city: {
	 	type: String,
		default: null
	 },
	 state: {
	 	type: String,
		default: null
	 }
	},
	trader_id: {
		type: String,
		default: null
	},
	user_wants: {
		type: String,
		default: null
	},
	user_wants_id: {
		type: String,
		default: null
	},
	offer_made: {
		type: Boolean,
		default: false
	},
	offer_made_at: {
		type: Date,
		default: null
	},
	created_at: {
		type: Date,
		default: Date.now
	}
});

tradeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Trade', tradeSchema);