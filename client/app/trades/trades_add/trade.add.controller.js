angular.module('booksApp')
	.controller('TradeAddCtrl', [
		'$scope', '$rootScope', '$location', 
		'$window', 'tradeFactory', '$http',
			function($scope, $rootScope, $location,
			$window, tradeFactory, $http) {
			
			var currentUser = $rootScope.currentUser;

			$scope.addTradeFromForm = function() {
				console.log(currentUser);
				var tradeData = $scope.trade;
				
				tradeFactory.addTrade(tradeData)
				  .success(function(results) {
						$scope.message = results.message;
			  	});
			};
	}]);