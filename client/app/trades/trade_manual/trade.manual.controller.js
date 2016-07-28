angular.module('booksApp')
  .controller('TradeManualCtrl',[
    '$scope', 
    'Upload',
    '$timeout',
    '$rootScope',
    '$location',
    'tradeFactory',
  function ($scope, Upload, $timeout,
    $rootScope, $location, tradeFactory) {
    var currentUser = $rootScope.currentUser;
  
    $scope.uploadPic = function(file) {
      if (file) {
        file.upload = Upload.upload({
          url: '/api/trades/upload',
          data: {
            title: $scope.book.title,
            authors: $scope.book.authors,
            publisher: $scope.book.publisher,
            publish_date: $scope.book.publish_date,
            isbn: $scope.book.isbn,
            trader_id: currentUser.id,
            file: file
          }
        });

        file.upload
          .then(function(response) {
            $timeout(function() {
              file.result = response.data;
              $location.url('/trades');
            });
          }, function (response) {
            if (response.status > 0) {
              $scope.errorMsg = response.status + ': ' + response.data;
            }
          });
      }
      else { // no cover image, post to factory
        tradeFactory.manualTradeNoImage({
           title: $scope.book.title,
            authors: $scope.book.authors,
            publisher: $scope.book.publisher,
            publish_date: $scope.book.publish_date,
            isbn: $scope.book.isbn,
            trader_id: currentUser.id,
            cover_img: '/assets/img/book-cover.jpg'
        })
        .success(function(response) {
          console.log(response);
        });
      }
    };
}]);