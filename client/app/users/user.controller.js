angular.module('booksApp')
	.controller('UserCtrl', [
		'$scope', '$auth', '$rootScope', '$http', '$location', 'userFactory',
		function($scope, $auth, $rootScope, $http, $location, userFactory) {
			var userId = $rootScope.currentUser.id;
			
			$http.get('/api/users/' + userId)
				.then(function(results) {
					$scope.user = results.data.user;
					
					if (results.data.trades !== null) {
						$scope.offers = 0;
						$scope.areTrades = true;
						$scope.trades = results.data.trades;
						
						for (var i = 0; i < $scope.trades.length; i++) {
							if ($scope.trades[i].offer_made) {
								$scope.offers++;
							}
						} 
						
						$scope.noOffers = $scope.offers > 0 ? $scope.trades.length - $scope.offers : $scope.trades.length;
					}
					else {
						$scope.areTrades = false;
					}
				})
				.catch(function(err) {
					console.log(err);
				});

			$scope.updateProfile = function() {
				console.log($scope.user);

				userFactory.updateUserProfile($scope.user)
				.success(function(results) {
					$location.url('/dashboard');
				});
			};


}]);