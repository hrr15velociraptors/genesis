angular.module('genesis.video', ['pubnub.angular.service'])

.controller('VideoController', function($scope, $window, $location, Keys, Video, Auction) {
  $scope.audience = 0;
  // use ID on URL as channel
  var id = $location.path().split("/")[2]; //domain.com/auctions/15

  // state of video buttons
  $scope.on = false;

  $scope.username = JSON.parse($window.localStorage.getItem('com.genesis')).username;

  $scope.toggle = function() {
    console.log('TOGGLE BEING CALLED');
    $scope.on = Video.toggle($scope.on);
    $scope.apply();
  };

  // set owner property on $scope
  $scope.getAuction = function() {
    Auction.getAuction(id)
      .then(function (data) {
        $scope.owner = data.owner === $scope.username ? true: false;
        //show auction DNE error
        if (!data)  {
          $scope.DNE();
        }
      })
  };

  // set ownership on $scope
  $scope.getAuction();

  // need access to keys
  Keys.then(function(pub_sub) {

    // PubNub Video Functionality
    $scope.stream = function() {
        Video.stream(pub_sub, id, function(occupancy) {
          console.log('OCCUPANCY BEING ADDED');
          $scope.audience = occupancy;
        });
        $scope.apply();
    };

    $scope.watch = function() {
        Video.watch(pub_sub, id, function(occupancy) {
          $scope.audience = occupancy;
        });
        $scope.apply();
    };

    $scope.end = function() {
        Video.end(pub_sub, id);
        $scope.apply();
    };

  });

});
