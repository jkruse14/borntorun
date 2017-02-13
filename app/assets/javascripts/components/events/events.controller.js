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
            $scope.newEvent.host_id = 1;
            
            var apiEvent = {
                host_id: $scope.newEvent.host_id,
                distance: $scope.newEvent.distance,
                city: $scope.newEvent.city,
                state: $scope.newEvent.state,
                country: $scope.newEvent.country,
                description: $scope.newEvent.description,
                entry_fee: $scope.newEvent.entryFee,
                title: $scope.newEvent.title,
                eventType: $scope.newEvent.eventType
            }
            odrEventsApi.create(apiEvent, $scope.newEvent.gps_file).then(function(eventData){
                
            });
        }

        $scope.callback = function (map) {
            map.setView([51.433333, 5.483333], 12);
        };
}]);