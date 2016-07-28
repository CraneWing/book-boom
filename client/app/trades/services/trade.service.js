// image uploads - see
// http://angularcode.com/simple-file-upload-example-using-angularjs/
// http://code.ciphertrick.com/2015/12/07/file-upload-with-angularjs-and-nodejs/
// protect routes with satellizer
// https://medium.com/@petehouston/protect-authentication-routes-in-angular-ui-router-and-satellizer-7745257a7e6#.akfjofmp6
angular.module('booksApp')
	.factory('tradeFactory', ['$http', '$auth', function($http, $auth) {
		var tradeFactory = {};
	  var data = {};

		// trades that load on very first page load
		tradeFactory.getAllTrades = function(){
			return $http.get('/api/trades')
				.success(function(results) {
					// console.log(results);
					data = results;
					return data;
				})
				.error(function(err) {
					if (err) console.log(err);
				});
		};
		
		tradeFactory.getTrade = function(id){
			return $http.post('/api/trades/' + id)
				.success(function(result) {
					data = result;
					return result;
				})
				.error(function(err) {
					if (err) console.log(err);
				});
		};
		
		tradeFactory.getUserTrades = function(userId){
			return $http.get('/api/trades/all/' + userId)
				.success(function(result) {
					data = result;
					return result;
				})
				.error(function(err) {
					if (err) console.log(err);
				});
		};

		// if adding a trade from a Google Books search item
		tradeFactory.addTradeFromList = function(bookId, currentUser) {
			console.log(currentUser);
			
			return $http.post('/api/trades/add/' + bookId, {
					user_id: currentUser.id,
					screen_name: currentUser.screen_name
				})
				.success(function(results) {
					data = results;
					return data;
				})
				.error(function(err) {
					if (err) console.log(err);
				});
		};
		
		tradeFactory.manualTradeNoImage = function(tradeData) {
			return $http.post('/api/trades/add', tradeData)
				.success(function(results) {
					data = results;
					return data;
				})
				.error(function(err) {
					if (err) console.log(err);
				});
		};
		
		tradeFactory.updateTrade = function(tradeData) {
			return $http.post('/api/trades/update', tradeData)
			.success(function(results) {
				data = results;
				return data;
			})
			.error(function(err) {
				if (err) console.log(err);
			});
		};

		tradeFactory.deleteTrade = function(tradeID) {
			return $http.post('/api/trades/delete', tradeId)
				.success(function(results) {
					data = results;
					return data;
				});
		};

		return tradeFactory;

}]);