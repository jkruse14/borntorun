angular
    .module('odrCourses')
    .factory('odrCoursesApi', ['$http', function($http){
        var self = {
            courses : [],
            CHUNK_SIZE: 1000,
        };

        self.getAll = function() {
            return $http.get('/courses.json').then(function(data){
                angular.copy(data.data, self.courses);
            })
        };

        self.create = function(course,coords){
            //create the course
            //create the segments, using new course id
            //create the event using new course id
            var segments = createCourseSegments(coords);
            return $http.post('/courses.json', {course:course}).then(function(data){
                self.courses.push(course);
                for(var i = 0; i < segments.length; i++){
                    var segment = {gps_data: JSON.stringify(segments[i]), order_num: i, course_id:data.data.id}
                    $http.post('/course_segments.json', {course_segment:segment});
                }
            });
        };    
        
        var createCourseSegments = function(coords) {
            var coordsArrays = []
            var index = 0;
            if(coords.length > self.CHUNK_SIZE){
                for(var i = 0; i < coords.length; i+=self.CHUNK_SIZE) {
                    if(i+self.CHUNK_SIZE <= coords.length) {
                        coordsArrays[index] = coords.slice(i,i+self.CHUNK_SIZE);
                    } else {
                        coordsArrays[index] = coords.slice(i, coords.length);
                    }
                    index += 1;
                }
            } else {
                coordsArrays[0] = coords;
            }

            /*$.ajax({
                url:config.expressUrl + 'routes',
                method:"POST",
                data:{
                    name: formData.name + "-route",
                    created: Date.now(),
                    createdBy: '',
                    coords: coordsArrays[0],
                    distance: formData.distance,
                    elapsedTime: 0,
                    userResult: false,
                    count:0,
                    maxLen:coords.length,
                }
            }).done((data) => {
                var routeId = data.id;
                for(var j = 1; j < coordsArrays.length; j++) {
                    $.ajax({
                        url:config.expressUrl+'routes',
                        method:"PUT",
                        data:{
                            routeId:routeId,
                            coords:coordsArrays[j],
                            count:j,
                            expected:(coordsArrays.length-1),
                        },
                    });
                }
            });*/
            return coordsArrays;
        }

        return self;
    }]);