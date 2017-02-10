angular
    .module('odrCourses')
    .factory('odrCoursesApi', ['$http', function($http){
        var self = {
            courses : []
        }

        self.getAll = function() {
            return $http.get('/courses.json').then(function(data){
                angular.copy(data.data, self.courses);
            })
        }

        self.create = function(course){
            return $http.post('/courses.json', course).then(function(data){
                self.courses.push(course)
            });
        }

        return self;
    }]);