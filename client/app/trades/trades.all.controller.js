angular.module('booksApp')
	.controller('TradeAllCtrl', [
		'$scope', 'tradeFactory', '$http',
			function($scope, tradeFactory, $http) {      
      // get all trades for trades page
		
			$http.get('/api/trades')
				.success(function(results) {
					// console.log(results);

					if (results.trades === null) {
						$scope.isMessage = true;
					}
					else {
						$scope.isMessage = false;
						$scope.trades = results;
					}
				})
				.error(function(err) {
					console.log('An error occurred: ' + err);
				});
			
	}]);