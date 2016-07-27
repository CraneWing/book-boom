angular.module('booksApp')
	.controller('LoginCtrl', ['$scope', '$auth', '$window',
	 '$rootScope', '$location',
		function($scope, $auth, $window, $rootScope, $location) {
			
		$scope.emailLogin = function() {
	 		$auth.login({
	 			email: $scope.email, 
	 			password: $scope.password 
	 		})
	 		.then(function(response) {

	 			$window.localStorage.currentUser = JSON.stringify({
	 			  id: response.data.user.id,
	 			  email: response.data.user.email,
	 			  screen_name: response.data.user.screen_name
	 			});

	 			$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
	 			
	 			$scope.loginForm.$setPristine();
	 			$location.url('/dashboard');
	 		})
	 		.catch(function(response) {
	 			$scope.errorMessage = {};

		 		 angular.forEach(response.data.message, function(message, field) {
		 				$scope.loginForm[field].$setValidity('server', false);
		 				$scope.errorMessage[field] = response.data.message[field];
	 			 });
	 		 });
		};
}]);


	