angular.module('starter.controllers', ['ionic'])

.directive("cross", function($compile) {
  return {
    terminal:true,
    priority:1001,
    compile: function(cross) {
      cross.removeAttr('my-dir');
      cross.attr('ng-click', 'fxn()');
      var fn = $compile(cross);
      return function(scope){
        fn(scope);
      };
    }
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('StartCtrl', function($scope, $stateParams) {

})

.controller('ContactsCtrl', function ($scope, $ionicModal){
  var options = new ContactFindOptions();
  options.filter = "";
  options.multiple = true;
  fields = ["displayName"];
  navigator.contacts.find(fields, onSuccess, onError, options);

  $scope.myContacts = [];

  function onError(message) {
    console.log("errorHandler: " + message);
  }

  function onSuccess(contacts) {

    for(var i=0; i<contacts.length; i++) {
      var name,number,photo;

      if(contacts[i].photos != null){
        photo = contacts[i].photos[0].value
      }else{
        photo = 'img/anonim.png';
      }
      if(contacts[i].displayName == null){
        name = "Empty";
      }else{
        name = contacts[i].displayName;
      }
      if(contacts[i].phoneNumbers == null){
        number = "no number"
      }else{
        number = contacts[i].phoneNumbers[0].value;

      }

      $scope.myContacts.push({'name': name, 'number': number, 'photo': photo});

    }
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createContact = function(user) {
    var myContact = navigator.contacts.create({"displayName": user.firstName});
    var phoneNumbers = [];
    phoneNumbers[0] = new ContactField('mobile', user.lastName, false);
    myContact.phoneNumbers = phoneNumbers;
    myContact.save();
    $scope.myContacts.push({'name': user.name, 'number': user.number, 'photo': 'img/anonim.png'});
    alert(myContact.phoneNumbers[0].value);
    user.name = '';
    user.number = '';
    $scope.modal.hide();
  };

})

.controller('imgCtrl',function ($scope) {

    $scope.newPhoto = function () {
      navigator.camera.getPicture (onSuccess, onFail,
        { quality: 50, destinationType: Camera.DestinationType.DATA_URL});
    };

    $scope.getPhoto = function(){
      navigator.camera.getPicture(onSuccess, onFail,
        { quality: 50,destinationType: Camera.DestinationType.DATA_URL,
           sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });
      };

    $scope.visible = true;

    $scope.deletePhoto = function(){
      $scope.image = '';
      $scope.visible = true;
    };

    function onFail (message) {
      alert ('Error occured: ' + message);
    }

    function onSuccess (imageData) {
      $scope.image = "data:image/jpeg;base64," + imageData;
      $scope.visible = false;
    }
})

.controller('playerCtrl', function ($scope) {
    var my_media = new Media("file:///android_asset/www/media/audio.mp3");
    var mediaTimer = null;

    var counter = 0;
    var timerDur = setInterval(function() {
      counter = counter + 100;
      if (counter > 2000) {
        clearInterval(timerDur);
      }
      var dur = my_media.getDuration();
      if (dur > 0) {
        clearInterval(timerDur);
        $scope.duration = Math.floor(dur / 60) + ":" + (dur % 60 ? dur % 60 : '00').toFixed(0);
        alert($scope.duration);
      }
    }, 100);

    $scope.playState = false;
    $scope.stopState = true;

    $scope.play = function(){
      my_media.play();
      $scope.stopState = !$scope.stopState;
      $scope.playState = true;
    };

    $scope.pause = function () {
      my_media.stop();
      $scope.playState = !$scope.playState;
      $scope.stopState = true;
    };

    if (mediaTimer == null) {
      setInterval(function() {
        my_media.getCurrentPosition(
          function(position) {
            if (position > -1) {
              setAudioPosition((Math.floor(position / 60) + ":" + (position % 60 ? position % 60 : '00').toFixed(0)));
            } else {
              setAudioPosition("00:00");
            }
          },
          function(error) {
            console.log("Error getting pos=" + error);
            setAudioPosition("Error: " + error);
          }
        );
      }, 1000);
    }

    function setAudioPosition(position) {
      document.getElementById('audio_position').innerHTML = position;
    }
});
