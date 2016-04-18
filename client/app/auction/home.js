angular.module('genesis.home', ['ngAnimate', 'ui.bootstrap'])

.controller('HomeController', function($scope, $window, Auth, Auction) {

  //grab all auctions from database
  $scope.getAuctions = function () {
    Auction.getAuctions()
      .then(function (data) {
        $scope.allAuctions = data;
      });
  }

  //navigate to auction page using ID
  $scope.navToAuction = function (id) {
    $window.location.href= '#/auctions/' + id;
  };

  //initial load
  $scope.getAuctions();
  
  // carousel params
  $scope.myInterval = 2000;
  $scope.noWrapSlides = false;
  $scope.active = 0;

})
.filter('byLive', function($scope) {
  return function(auctions, searchText) {
    var out = [];
    var pattern = new Regexp(searchText, 'i');
  
    if (auction.status === 'Live' && (searchText === undefined) || (auction.toString().search(pattern) !== -1)) {
      return auctions;
    }
    
    auctions.forEach(function(auction) {
      if (auction.status === 'Live' && auction.toString().search(pattern)) {
        out.push(auction);
      }
    });
    
    return out;
  };
})
.filter('byEnded', function() {
  return function(auctions) {
    var out = [];
    console.log(auctions);
    auctions.forEach(function(auction) {
      if (auction.status !== 'Live') {
        out.push(auction);
      }
    });
    
    return out;
  };
});