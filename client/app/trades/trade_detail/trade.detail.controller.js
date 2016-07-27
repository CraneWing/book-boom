angular.module('booksApp')
	.controller('TradeDetailCtrl', [
		'$scope', '$rootScope', '$http', 
		'$state', 'tradeFactory', '$auth',
		'$location', 'dateFactory',
		function($scope, $rootScope, $http, $state,
		tradeFactory, $auth, $location, dateFactory) {
		  
		  var tradeId = $state.params.id;
		  var currentUser = $rootScope.currentUser;
      
      $http.get('/api/trades/' + tradeId) 
				.success(function(result) {
					$scope.trade = result;
				});
			
			$scope.isAuthenticated = function() {
			  return $auth.isAuthenticated();
			};
				
			$scope.contactTrader = function(tradeId) {
			  tradeFactory.updateTrade({
			    trade_id: tradeId,
			    user_id: currentUser.id,
			    screen_name: currentUser.screen_name
			  })
			  .success(function(result) {
			    console.log('trade updated!');
			   $location.url('/trades');
			  });
			};
			
			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			};
			
			$scope.formattedDate = function(date) {
				return dateFactory.formatDate(date);
			};
}]);