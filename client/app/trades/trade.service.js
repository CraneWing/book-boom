angular.module('booksApp')
	.factory('tradeFactory', ['$http', '$rootScope', function($http, $rootScope) {
		var tradeFactory = {};
		var data = {};
		var currentUser = $rootScope.currentUser;

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
		tradeFactory.addTradeFromList = function(bookId) {
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

		// if adding trade from individual trade form
		tradeFactory.addTradeFromForm = function(data) {
			return $http.post('/api/trades/add', data)
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