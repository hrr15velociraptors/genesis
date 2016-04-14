angular.module('genesis.video', ['pubnub.angular.service'])

.controller('VideoController', function($scope, Keys, Video) {

  // need access to keys
  Keys.then(function(pub_sub) {

    // PubNub Video Functionality
    $scope.stream = function() {
        Video.stream(pub_sub);
    };

    $scope.watch = function() {
        Video.watch(pub_sub);
    };

    $scope.end = function() {
        Video.end(pub_sub);
    };

  });

});
