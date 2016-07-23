angular.module('booksApp')
	.controller('TradeDetailCtrl', [
		'$scope', '$rootScope', '$http', '$state', 
		function($scope, $rootScope, $http, $state) {
		  var tradeId = $state.params.id;
		  var currentUser = $rootScope.currentUser;
      
      $http.get('/api/trades/' + tradeId) 
				.success(function(result) {
					$scope.trade = result;
				});
				
			$scope.contactTrader = function(id) {
			  console.log('button clicked');
			  console.log(id);
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