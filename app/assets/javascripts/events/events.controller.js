angular
    .module('odrEvents')
    .controller("EventController", ['eventSchema', 'odrEventsApi', '$http', '$scope', function(eventSchema, odrEventsApi, $http, $scope){
        $scope.eventSchema = eventSchema;
        $scope.events = odrEventsApi.events;
        $scope.newEvent = {};

        $scope.getAllEvents = function() {
            return odrEventsApi.getAll();
        }
        
        $scope.addEvent = function() {
            odrEventsApi.create({
                host_id: 0, 
                course_id: 0, 
                title: $scope.newEvent.title,
                distance: $scope.newEvent.distance, 
                eventType: $scope.newEvent.type, 
                city: $scope.newEvent.city, 
                state: $scope.newEvent.state, 
                country: $scope.newEvent.country, 
                entryFee: $scope.newEvent.entryFee, 
                description: $scope.newEvent.description
            });
        }
}]);