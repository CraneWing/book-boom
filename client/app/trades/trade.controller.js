angular.module('booksApp')
	.controller('TradeCtrl', [
		'$scope', '$rootScope', '$location', 
		'$window', 'tradeFactory', '$http',
			function($scope, $rootScope, $location, $window, tradeFactory, $http) {
			
			var currentUser = $rootScope.currentUser;

			// add a trade from the book search list
			$scope.addTradeFromList = function(bookId) {
				tradeFactory.addTradeFromList(bookId)
					.success(function(results) {
						$scope.message = results.message;
						$location.url('/trades');
			  	});
			};

			$scope.addTradeFromForm = function() {
				var tradeData = $scope.trade;
				
				tradeFactory.addTrade(tradeData)
				  .success(function(results) {
						$scope.message = results.message;
			  	});
			};
			
			$scope.personalizeTooltip = function(trader, wanting) {
				var text = '';
				
				if (trader == currentUser.screen_name) {
					text = 'Your trade';
				}
				else if (wanting == null) {
					text = 'Make Offer';
				}
				else {
					text = '<strong>Offer by</strong>: ' + wanting;
				}
				
				return text;
			};

			// $scope.deleteTrade = function(index) {
			
			// };
	}]);