angular.module('booksApp', [
		'ui.router', 
		'ngAnimate',
		'ui.router.title',
		'angular.vertilize',
		'720kb.tooltips',
		'ngMessages',
	  'satellizer'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$authProvider',
		function($stateProvider, $urlRouterProvider, $authProvider) {

			$stateProvider
				.state('/home', {
					url: '/',
					templateUrl: 'app/static/home.html',
					resolve: {
						$title: function() { return 'Welcome'; }
					}
				 })
				.state('/using', {
					url: '/using',
					templateUrl: 'app/static/using.html',
					resolve: {
						$title: function() { return 'About'; }
					}
				 }) 
				.state('/search', {
					url: '/search',
					templateUrl: 'app/search/search.html',
					controller: 'SearchCtrl',
					resolve: {
						$title: function() { return 'Search'; }
					}
				})
				.state('/trades', {
					url: '/trades',
					templateUrl: 'app/trades/trades.html',
					controller: 'TradeAllCtrl',
					resolve: {
						$title: function() { return 'Current Trades'; }
					}
				})
				.state('/trades/:id', {
					url: '/trades/:id',
					templateUrl: 'app/trades/trade_detail.html',
					controller: 'TradeDetailCtrl',
					resolve: {
						$title: function() { return 'Trade Info'; }
					}
				})
				.state('/login', { 
					url: '/login',
				 	templateUrl: 'app/auth/login.html',
				 	controller: 'LoginCtrl',
				 	resolve: {
						$title: function() { return 'Login'; }
					}
				 })
				.state('/signup', { 
					url: '/signup',
				 	templateUrl: 'app/auth/signup.html',
				 	controller: 'SignupCtrl',
				 	resolve: {
						$title: function() { return 'Sign Up'; }
					}
				})
				.state('/dashboard', { 
					url: '/dashboard',
					controller: 'UserCtrl',
				 	templateUrl: 'app/users/dashboard_user.html',
				 	resolve: {
						$title: function() { return 'Dashboard'; }
					}
				})
				.state('/users/:id/edit', { 
					url: '/users/:id/edit',
				 	templateUrl: 'app/users/user_edit.html',
				 	controller: 'UserCtrl',
				 	resolve: {
						$title: function() { return 'Edit Profile'; }
					}
				});
				
				$urlRouterProvider.otherwise('/');

				$authProvider.loginUrl = 'https://book-boom-cranewing.c9users.io/api/auth/login';
				$authProvider.signupUrl = 'https://book-boom-cranewing.c9users.io/api/auth/signup';
}])
// will keep the user info in the app so data persists
.run(['$rootScope', '$window', '$auth', function($rootScope, $window, $auth) {
	if ($auth.isAuthenticated()) {
		$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
	}
}])
.filter('startFrom', function() { // Bootstrap UI pagination filter
   return function(data, start) {
   	if (!data || !data.length) return;

   	start = +start;
    return data.slice(start);
   };
 });