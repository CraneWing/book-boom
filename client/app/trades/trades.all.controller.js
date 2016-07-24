angular.module('booksApp')
	.controller('TradeAllCtrl', [
		'$scope', 'tradeFactory', '$http',
			function($scope, tradeFactory, $http) {
			 $scope.fade = false;
		
  		 // get all trades
  		 var getAllTrades = function() {
  		   tradeFactory.getAllTrades()
  		    .success(function(results) {
  		      $scope.fade = true;
  		      $scope.trades = results;
  		    });
  		 };
  		 
  		 // get all trades again when All Trades
  		 // button clicked
  		 $scope.allTrades = function() {
  		   $scope.fade = false;
  		   getAllTrades();
  		 };
  		 
  		 // get only user trades
  		 $scope.getUserTrades = function(userId) {
  		   $scope.fade = false;
  			 tradeFactory.getUserTrades(userId)
  		    .success(function(results) {
  		      $scope.trades = results;
  		      $scope.fade = true;
  		    });
  			};
  		
  			
  		getAllTrades();
			
	}]);