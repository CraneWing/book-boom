angular.module('booksApp')
	.controller('UserCtrl', [
		'$scope', '$auth', '$rootScope', '$http', '$location', 'userFactory',
		function($scope, $auth, $rootScope, $http, $location, userFactory) {
			var userId = $rootScope.currentUser.id;
			
			$http.get('/api/users/' + userId)
				.then(function(results) {
					$scope.user = results.data.user;
					
					if (results.data.trades !== null) {
						$scope.areTrades = true;
						$scope.trades = results.data.trades;
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