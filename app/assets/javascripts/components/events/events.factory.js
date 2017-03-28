angular
    .module('odrEvents')
    .factory('odrEventsApi', ['compareCourses','fileUtils','gpsFileReader','$http', 'odrCoursesApi',function(compareCourses,fileUtils,gpsFileReader,$http,odrCoursesApi){
        var self = {
            events : [],
            event: null,
        }

        self.getAll = function() {
            return $http.get('/events.json').then(function(data){
                angular.copy(data.data, self.events);
            })
        }

        self.getEvent = function(eventId) {
            return $http.get('/events/'+eventId+'.json').then(function(data){
                self.events = [];
                self.event = data.data;
                self.event.geoJSONCourse = {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "LineString",
                                        "coordinates": JSON.parse(data.data.segments.gps_data)
                                    },
                                    "properties": {
                                        "name": "Course"
                                    }
                                }
            });
        }

        self.create = function(event, gps_file){
            return $http.post('/events.json', event).then(function(eventData){
                self.events.push(eventData);
                var course = {
                    host_id: eventData.data.host_id,
                    event_id: eventData.data.id,
                }
                fileUtils.processGPXFile(gps_file,course).then((fileData)=>{
                    odrCoursesApi.create(fileData.course, fileData.coords).then(function(data){
                    });
                })
            });
        }

        

        return self;
    }]);