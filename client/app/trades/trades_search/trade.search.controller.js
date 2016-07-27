angular.module('booksApp')
	.controller('TradeSearchCtrl', [
	'$scope',
	'$http', 
	'$rootScope',
	'$location',
	'tradeFactory',
	'dateFactory',
	function($scope, $http, $rootScope, $location,
	tradeFactory, dateFactory) {
		
		var currentUser = $rootScope.currentUser;
		
		$scope.formData = {};
		$scope.areResults = false;

		$scope.searchBooks = function() {
			$http.post('/api/search', $scope.formData)
				.success(function(results) {
					// clear all form fields
					$scope.formData = {};

					$scope.areResults = true;
					$scope.bookData = results;
				})
				.error(function(err) {
					console.log(err);
				});
		};
		
		$scope.addTradeFromList = function(bookId) {
			tradeFactory.addTradeFromList(bookId, currentUser)
				.success(function(results) {
					$scope.message = results.message;
					$location.url('/trades');
			 });
		};
		
		$scope.formattedDate = function(date) {
			return dateFactory.formatDate(date);
		};
	}]);