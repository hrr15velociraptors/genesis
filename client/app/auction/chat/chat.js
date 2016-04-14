angular.module('genesis.chat', ['pubnub.angular.service'])

.controller('ChatController', function ($window, $scope, $rootScope, Auth, Pubnub, Keys) {

  // for logging out and deleting local client user token/session
  $scope.signout = function() {
    //Give message to user for succesfull sign out
    console.log('You have succesfully signed out');
    Auth.signout();
  };

  //disconnect when leaving page
  $scope.$on('$locationChangeStart', function(event) {
    // we need to remove user from users array on backend
  });

  // pull user from browser local storage
  var user = JSON.parse($window.localStorage.getItem('com.genesis')).username;
  console.log(user);

  var pub_sub;

  // on controller load, grab keys from index.js
  Keys.then(function(pub_sub) {
      // Please signup to PubNub to use your own keys: https://admin.pubnub.com/
      Pubnub.init({
          publish_key: pub_sub[0],
          subscribe_key: pub_sub[1],
          ssl: true,
          uuid: $scope.uuid
      });

      $scope.messages = [];

      // define 'Auction Name' for channel param? Pubnub needs messages-channel
      $scope.channel = 'messages-channel';

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
                  sender_uuid: $scope.uuid,
                  date: new Date()
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
  });
});
