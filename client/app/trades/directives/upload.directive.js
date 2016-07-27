angular.module('booksApp')
	.directive('fileModel', ['$parse', function($parse) {
		return {
			restrict: 'A', // attribute
			link: function(scope, element, attrs) {
				// $parse used to look at attributes in fileModel
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;
				// event watcher looking for any changes in file input.
				// binds attribute in context.
				element.bind('change', function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
				});
			} 
		};
	}]);