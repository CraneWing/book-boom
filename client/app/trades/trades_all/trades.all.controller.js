angular.module('booksApp')
	.controller('TradeAllCtrl', [
		'$scope', 'tradeFactory', '$http', '$auth',
			function($scope, tradeFactory, $http, $auth) {
			 	
			 	$scope.isAuthenticated = function() {
			  	return $auth.isAuthenticated();
			  };

  		 // get all trades
  		 var getAllTrades = function() {
  		   tradeFactory.getAllTrades()
  		    .success(function(results) {
  		      $scope.trades = results;
  		    });
  		 };
  		 
  		 // get all trades again when All Trades
  		 // button clicked
  		 $scope.allTrades = function() {
  		   getAllTrades();
  		 };
  		 
  		 // get only user trades when Your Trades 
  		 // button clicked
  		 $scope.getUserTrades = function(userId) {
  			 tradeFactory.getUserTrades(userId)
  		    .success(function(results) {
  		      $scope.trades = results;
  		    });
  			};
  		  
  		 // initial page load - show all trades
  		 getAllTrades();
			
	}]);