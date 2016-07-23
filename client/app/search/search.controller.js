angular.module('booksApp')
	.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.formData = {};
		$scope.pageSize = 12;
		$scope.areResults = false;

		$scope.searchBooks = function() {
			$http.post('/api/search', $scope.formData)
				.success(function(results) {
					// clear all form fields
					$scope.formData = {};

					$scope.areResults = true;
					$scope.bookData = results;
				})
				.error(function(err) {
					console.log(err);
				});
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