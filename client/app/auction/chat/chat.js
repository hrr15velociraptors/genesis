angular.module('genesis.chat', ['pubnub.angular.service'])

.controller('ChatController', function ($window, $scope, $location, Auth, Pubnub, Keys, Auction) {
  $scope.username = JSON.parse($window.localStorage.getItem('com.genesis')).username;

  //set URL ID as channel
  var id = $location.path().split("/")[2]; //domain.com/auctions/155125125215

  //disconnect when leaving page
  $scope.$on('$locationChangeStart', function(event) {
    // SOCKET.IO => we need to remove user from users array on backend
    // disconnect from Pubnub message/video channels
  });

  // pull user from browser local storage
  var user = JSON.parse($window.localStorage.getItem('com.genesis')).username;

  var pub_sub;

  // on controller load, grab keys from index.js
  Keys.then(function(pub_sub) {
      // Please signup to PubNub to use your own keys: https://admin.pubnub.com/
      Pubnub.init({
          publish_key: pub_sub[0],
          subscribe_key: pub_sub[1],
          ssl: true,
          uuid: user
      });

      $scope.messages = [];

      // define 'Auction Name' for channel param? Pubnub needs messages-channel
      $scope.channel = id;

      $scope.messageContent = '';
      // Generating a random uuid between 1 and 100 using utility function from lodash library.
      $scope.uuid = 10000;

      // Send the messages over PubNub Network
      $scope.sendMessage = function() {
         // Don't send an empty message
         if (!$scope.messageContent || $scope.messageContent === '') {
              return;
          }
          Pubnub.publish({
              channel: $scope.channel,
              message: {
                  content: $scope.messageContent,
                  sender_uuid: user,
                  date: moment().format("hh:mm:ss")
              },
              callback: function(m) {
                  console.log(m);
              }
          });
          // Reset the messageContent input
          $scope.messageContent = '';

      }

      // Subscribe to messages channel
      Pubnub.subscribe({
          channel: $scope.channel,
          triggerEvents: ['callback']
      });

      // Listening to messages sent.
      $scope.$on(Pubnub.getMessageEventNameFor($scope.channel), function(ngEvent, m) {
          $scope.$apply(function() {
              $scope.messages.push(m)
          });
      });

      $scope.avatarUrl = function(uuid){
          return 'http://robohash.org/'+uuid+'?set=set2&bgset=bg2&size=70x70';
      };
  });
});
