angular.module('genesis.video', ['pubnub.angular.service'])

.controller('VideoController', function($scope, $location, Keys, Video) {

  //use ID as channel
  var id = $location.path().split("/")[2]; //domain.com/auctions/155125125215

  // need access to keys
  Keys.then(function(pub_sub) {

    // PubNub Video Functionality
    $scope.stream = function() {
        Video.stream(pub_sub, id);
    };

    $scope.watch = function() {
        Video.watch(pub_sub, id);
    };

    $scope.end = function() {
        Video.end(pub_sub, id);
    };

  });

});
