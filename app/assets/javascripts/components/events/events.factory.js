angular
    .module('odrEvents')
    .factory('odrEventsApi', ['compareCourses','gpsFileReader','$http', 'odrCoursesApi',function(compareCourses,gpsFileReader,$http,odrCoursesApi){
        var self = {
            events : []
        }

        self.getAll = function() {
            return $http.get('/events.json').then(function(data){
                angular.copy(data.data, self.events);
            })
        }

        self.create = function(event, gps_file){
            return $http.post('/events.json', event).then(function(eventData){
                self.events.push(eventData);
                var course = {
                    host_id: eventData.data.host_id,
                    event_id: eventData.data.id,
                }
                processFile(gps_file,course).then((fileData)=>{
                    odrCoursesApi.create(fileData.course, fileData.coords).then(function(data){
                    });
                })
            });
        }

        var processFile = function(file,course) {
            return new Promise(function(resolve,reject){
            var data = {};
                var freader = new FileReader();
                
                freader.onload = function(revent) {
                    var parser = new DOMParser();
                    var xmlObj =  parser.parseFromString(freader.result, "text/xml");

                    data = gpsFileReader.processGPXData(xmlObj, false);
                    var interpolated = compareCourses.interpolateDistance(data.coords);
                    data.coords = interpolated.points;
                    data.userRoute = false;
                    data.course = course;
                    
                    //post to DB? or just the GeoJSON?
                    if(data.hasOwnProperty("name")) {
                        resolve(data);
                    } else {
                        reject(Error("No data found"));
                    }
                }

                freader.onerror = function() {
                //console.log("onerror");
                }

                freader.readAsText(file);
            });
        }

        return self;
    }]);