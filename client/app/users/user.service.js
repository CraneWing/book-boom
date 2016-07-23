angular.module('booksApp')
	.factory('userFactory', ['$http', function($http) {
		var userFactory = {};

		userFactory.updateUserProfile = function(userData) {
			return $http.post('/api/users/update', userData)
			.success(function(results) {
					data = results;
					return data;
				});
		};
		
		// userFactory.deleteUser = function(userId) {
		// 	return $http.post('/api/stocks/delete', tradeId)
		// 		.success(function(results) {
		// 			data = results;
		// 			return data;
		// 		});
		//};

		return userFactory;
}]);