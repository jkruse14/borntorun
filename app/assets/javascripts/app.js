angular.module("onDemandRaces", [
    'ui.router',
    'templates',
    'odrHosts',
    'odrEvents',
    'odrCourses',
])
.config([ '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl:"components/home/_home.html",
        controller: 'MainController',
        
      })
      .state('hosts', {
        url:'/hosts',
        templateUrl:'components/hosts/partials/_hostsIndex.html',
        controller:'HostController',
        resolve:{
          hostPromise: ['odrHostsApi', function(odrHostsApi){
            return odrHostsApi.getAll();
          }]
        }
      })
      .state('createHost',{
        url:'/createHost',
        templateUrl:"components/hosts/partials/_hostsNew.html",
        controller: "HostController"
      })
      .state('events', {
        url:'/events',
        templateUrl:'components/events/partials/_index.html',
        controller: 'EventController',
        resolve:{
          eventPromise: ['odrEventsApi', function(odrEventsApi){
            return odrEventsApi.getAll();
          }]
        }
      })
      .state('createEvent', {
        url: '/createEvent',
        templateUrl:"components/events/partials/_eventsNew.html",
        controller: 'EventController',
      })
      .state('courses', {
        url:'/courses',
        templateUrl:"components/courses/partials/_coursesIndex.html",
        controller: "CourseController"
      })
      .state('createCourse', {
        url:'/createCourse',
        templateUrl:"components/courses/partials/_coursesNew.html",
        controller: "CourseController"
      })
      .state('viewEvent',{
        url:'/viewEvent/{eventId}',
        templateUrl:"components/events/partials/_viewEvent.html",
        controller:"EventController",
        resolve: {
          eventPromise : ['odrEventsApi', '$stateParams', function(odrEventsApi, $stateParams){
            return odrEventsApi.getEvent($stateParams.eventId);
          }]
        }
      })

      //$urlRouterProvider.otherwise('home');
  }]);