angular.module('genesis.auction', [])

.controller('AuctionController', function($scope, Auction, $location) {

  //Grabbing ID from URL
  var id = $location.path().split("/")[2]; //domain.com/auctions/155125125215

  $scope.bid = function () {
    console.log('bid increased');
    $scope.auctionData.sprice++;
    $scope.auctionData.bids++;
  };

  //grab auction from API using URL
  $scope.getAuction = function() {
    console.log('Calling getAuction!!!!');
    console.log(id);
    Auction.getAuction(id)
      .then(function (data) {
        console.log(data);
        $scope.auctionData = data;
        //show auction DNE error
        if (!data)  {
          $scope.DNE();
        }
      })
  };

  //Auction Not Found
  $scope.DNE = function() {
    console.log('dne');
    console.log($(".auctionBody"));
    $( ".auctionBody" ).empty();
    $( ".auctionBody" ).append("<h1>Error: This Auction Does Not Exist!</h1>");
    $( ".auctionBody" ).append("Return to Auctions: ");
    $( ".auctionBody" ).append("Link Here");
  };

  $scope.getAuction();
});
