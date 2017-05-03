angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.contacts', {
    url: '/contacts',
    views: {
      'menuContent': {
        templateUrl: 'templates/Contact.html',
        controller: 'ContactsCtrl'
      }
    }
  })

  .state('app.images', {
      url: '/images',
      views: {
        'menuContent': {
          templateUrl: 'templates/images.html',
          controller: 'imgCtrl'
        }
      }
    })

    .state('app.player', {
      url: '/player',
      views: {
        'menuContent': {
          templateUrl: 'templates/player.html',
          controller: 'playerCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: '/start',
      views: {
        'menuContent': {
          templateUrl: 'templates/start.html',
          controller: 'StartCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/app/start');

});
