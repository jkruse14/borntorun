angular
    .module('onDemandRaces')
    .controller("MainController",['eventSchema','odrEventsApi','odrHostsApi','$scope', function(eventSchema, odrEventsApi, odrHostsApi, $scope){
        $scope.test = "Hello, World!";
        $scope.eventSchema = eventSchema;
        $scope.events = odrEventsApi.events;
        console.log($scope.eventSchema);

        $scope.getAllEvents = function() {
            return odrEventsApi.getAll();
        }
        
        
    }]);