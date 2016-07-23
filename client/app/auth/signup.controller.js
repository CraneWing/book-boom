angular.module('booksApp')
	.controller('SignupCtrl', ['$scope', '$auth', '$location',
		function($scope, $auth, $location) {
		
		$scope.signup = function() {
	 		var user = {
	 			email: $scope.email,
	 			password: $scope.password,
	 			screen_name: $scope.screen_name,
	 			city: $scope.city,
	 			state: $scope.state,
	 			first_name: $scope.first_name === undefined ? null : $scope.first_name,
	 			last_name: $scope.last_name === undefined ? null : $scope.last_name
	 		};

	 		console.log(user);

	 		$auth.signup(user)
	 			.then(function(response) {
	 				$location.url('/login');
	 			})
	 			.catch(function(response) {
  	 			console.log(response);
	 		 });
	
   };
}]);


	