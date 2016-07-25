angular.module('booksApp')
  .filter('startFrom', function() { // Bootstrap UI pagination filter
   return function(data, start) {
   	if (!data || !data.length) return;

   	start = +start;
    return data.slice(start);
   };
 });