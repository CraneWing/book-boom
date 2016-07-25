// (satellizer helper)
// will keep user info in app so data persists
angular.module('booksApp')
.run(['$rootScope', '$window', '$auth', function($rootScope, $window, $auth) {
	if ($auth.isAuthenticated()) {
		$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
	}
}]);