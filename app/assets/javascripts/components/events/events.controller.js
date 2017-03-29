angular
    .module('odrEvents')
    .controller("EventController", ['compareCourses','eventSchema', 'odrEventsApi', '$http', '$scope', function(compareCourses, eventSchema, odrEventsApi, $http, $scope){
        //let self = this;
        $scope.eventSchema = eventSchema;
        $scope.events = odrEventsApi.events;
        $scope.event = odrEventsApi.event;
        $scope.newEvent = {};
        $scope.resultsFileData;
        $scope.hiddenKeys = ['title', 'created_at', 'updated_at'];

        $scope.$on('result-loaded', function(event, data){
            $scope.resultsFileData = createGeoJSONObject(data.coords);
            var results = compareCourses.doComparison($scope.event.geoJSONCourse.geometry.coordinates, data.coords, 60);
        })

        $scope.getAllEvents = function() {
            return odrEventsApi.getAll();
        }

        $scope.getEvent = function(eventId) {
            $scope.events = [];
            odrEventsApi.getEvent(eventId).then(function(data){
                self.geoJSONCourse = createGeoJSONObject(JSON.parse(data.segments.gps_data));
                $scope.callback($("#map"),JSON.parse(data.segments.gps_data))
            });
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
                entry_fee: $scope.newEvent.entryFee || 0,
                title: $scope.newEvent.title,
                eventType: $scope.newEvent.eventType
            }
            odrEventsApi.create(apiEvent, $scope.newEvent.gps_file).then(function(eventData){
                
            });
        }

        var createGeoJSONObject = function(coords) {
            return {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": coords
                },
                "properties": {
                    "name": "Course"
                }
            }
        }

        $scope.callback = function (map) {
            console.log("coords",coords);
            if(self.event.geoJSONCourse){
                var coords = self.event.geoJSONCourse.geometry.coordinates;
                console.log(coords[0][0], coords[0][1])
                map.setView(coords[0][0], coords[0][1], 4);
            } else {
                map.setView([51.433333, 5.483333], 12);
            }
        };

}]);