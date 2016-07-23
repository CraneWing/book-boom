var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');

// Google AP terms by each item
var tradeSchema = new Schema({
	_id: {
		type: String,
		default: shortid.generate()
	},
	title: String, 
	authors: [String], 
	publisher: String,
	cover_url: String, 
	publish_date: String, 
	isbn: String, 
	trader: String,
	trader_location: {
	 city: String,
	 state: String
	},
	trader_id: String,
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
	created_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Trade', tradeSchema);