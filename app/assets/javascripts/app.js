angular.module("onDemandRaces", [
    'ui.router',
    'templates',
    'odrHosts',
    'odrEvents',
])
.config([ '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl:"home/_home.html",
        controller: 'MainController',
        
      })
      .state('hosts', {
        url:'/hosts',
        templateUrl:'hosts/partials/_hostsIndex.html',
        controller:'HostController',
        resolve:{
          hostPromise: ['odrHostsApi', function(odrHostsApi){
            return odrHostsApi.getAll();
          }]
        }
      })
      .state('createHost',{
        url:'/createHost',
        templateUrl: "hosts/partials/_hostsNew.html",
        controller: "HostController"
      })
      .state('events', {
        url:'/events',
        templateUrl: 'events/partials/_index.html',
        controller: 'EventController',
        resolve:{
          eventPromise: ['odrEventsApi', function(odrEventsApi){
            return odrEventsApi.getAll();
          }]
        }
      })
      .state('createEvent', {
        url: '/createEvent',
        templateUrl:"events/partials/_eventsNew.html",
        controller: 'EventController',
      })

      //$urlRouterProvider.otherwise('home');
  }]);