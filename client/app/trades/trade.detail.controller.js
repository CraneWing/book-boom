angular.module('booksApp')
	.controller('TradeDetailCtrl', [
		'$scope', '$rootScope', '$http', '$state', 'tradeFactory', '$auth',
		function($scope, $rootScope, $http, $state, tradeFactory, $auth) {
		  var tradeId = $state.params.id;
		  var currentUser = $rootScope.currentUser;
      
      $http.get('/api/trades/' + tradeId) 
				.success(function(result) {
					$scope.trade = result;
				});
				
			$scope.contactTrader = function(tradeId) {
			  tradeFactory.updateTrade({
			    trade_id: tradeId,
			    user_id: currentUser.id,
			    screen_name: currentUser.screen_name
			  })
			  .success(function(result) {
			    console.log('trade updated!');
			  });
			};
			
			$scope.isAuthenticated = function() {
				return $auth.isAuthenticated();
			};

  		$scope.formatDate = function(date) {
  			if (/\d{4}-\d{2}-\d{2}/.test(date)) {
  				date = moment(date, 'YYYY-MM-DD').format('D MMM YYYY');
  				return date;
  			}
  			else if (/\d{4}-\d{2}/.test(date)) {
  				date = moment(date, 'YYYY-MM').format('MMM YYYY');
  				return date;
  			}
  			else {
  				return date;
  			}
  		};
		
}]);