angular.module('genesis.video', ['pubnub.angular.service'])

.controller('VideoController', function($scope, $window, $location, Keys, Video, Auction) {

  //use ID as channel
  var id = $location.path().split("/")[2]; //domain.com/auctions/15
  $scope.on = false;

  $scope.username = JSON.parse($window.localStorage.getItem('com.genesis')).username;

  $scope.toggle = function() {
    $scope.on = Video.toggle($scope.on);
  };

  // set owner property on $scope
  $scope.getAuction = function() {
    Auction.getAuction(id)
      .then(function (data) {
        console.log(data);
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
