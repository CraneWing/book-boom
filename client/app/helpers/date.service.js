angular.module('booksApp')
	.factory('dateFactory', function() {
	  var dateFactory = {};
	  
	  dateFactory.formatDate = function(date) {
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
		
		return dateFactory;
});