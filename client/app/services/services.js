angular.module('genesis.services', ['pubnub.angular.service'])
.factory('User', function ($http, $window) {

  var username = $window.localStorage.getItem('com.genesis').username;
  var getUserData = function () {
    return $http({
      method: 'GET',
      url: '/api/users',
      data: {
        username: username
      }
    }).then(function (res) {
      console.log('username is '+username);
      return res.data;
    })
  };

  return {
    getUserData: getUserData
  };

})
.factory('Keys', function($http, Pubnub) {

  // Wrap videochat controller in promise, ensure access to keys
  return $http.get('/keys').then(function(keys) {
      console.log('here are the keys on client:');
      console.log(keys);
      var pub_sub = keys.data;
      return pub_sub;
  });

})
.factory('Video', function(Pubnub) {

  // PubNub Video Functionality
  var video_out  = document.getElementById("vid-box");
  var embed_code = document.getElementById("embed-code");
  var here_now   = document.getElementById('here-now');
  var streamName;

  // public broadcasting CHANGE HARDCODE streamname to param
  var stream = function(keys) {
    streamName = 'auction-name' || Math.floor(Math.random()*100)+''; // Random stream if not provided
    var phone = window.phone = PHONE({
        number        : streamName, // listen on username else random
        publish_key: keys[0], // Your Pub Key
        subscribe_key: keys[1], // Your Sub Key
        oneway        : true, // One-Way streaming enabled
        broadcast     : true,  // True since you are the broadcaster
        ssl : (('https:' == document.location.protocol) ? true : false)

    });
    var ctrl = window.ctrl = CONTROLLER(phone);
    ctrl.ready(function(){
      // form.streamname.style.background="#55ff5b";
      // ctrl.stream_submit.hidden="true";
      console.log(streamName);
      ctrl.addLocalStream(video_out);
      ctrl.stream();  // Begin streaming video
    ctrl.receive(function(session){
        session.ended(function(session) {ctrl.getVideoElement(session.number).remove(); });
    });
    });
    ctrl.streamPresence(function(m){ here_now.innerHTML=m.occupancy; });
    return false;  // So form does not submit
  };

  // watching CHANGE HARDCODE num to param
  var watch = function(keys){
    var num = 'auction-name';  // Stream to join
    var phone = window.phone = PHONE({
        number        : "Viewer" + Math.floor(Math.random()*100), // Random name
        publish_key: keys[0],
        subscribe_key: keys[1], // Your Sub Key
        oneway        : true,  // One way streaming enabled
        ssl : (('https:' == document.location.protocol) ? true : false)

    });
    var ctrl = window.ctrl = CONTROLLER(phone, true);
    ctrl.ready(function(){
      console.log(num);
      ctrl.isStreaming(num, function(isOn){
        if (isOn) ctrl.joinStream(num);
        else alert("User is not streaming!");
      });
    });
    ctrl.receive(function(session){
        session.connected(function(session){ video_out.appendChild(session.video); });
        session.ended(function(session) {ctrl.getVideoElement(session.number).remove(); });
    });
    ctrl.streamPresence(function(m){ here_now.innerHTML=m.occupancy; });
    return false;  // Prevent form from submitting
  };

  var end = function (keys) {
    ctrl.toggleVideo('auction-name');
    ctrl.toggleAudio('auction-name');
    ctrl.hangup();
  };

  return {
    stream: stream,
    watch: watch,
    end: end
  };

});
