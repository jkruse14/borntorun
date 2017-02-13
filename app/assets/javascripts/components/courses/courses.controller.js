angular
    .module('odrCourses',[])
    .controller('CourseController', ['coursesSchema', 'odrCoursesApi', '$http', '$scope', function(coursesSchema, odrCoursesApi, $http, $scope){
        var self = this;
        self.newCourse = {};
        self.coursesSchema = coursesSchema;

        $scope.getAll = function() {
            return odrCoursesApi.getAll();
        }
        
        $scope.addCourse = function() {
            odrCoursesApi.create({course: $self.newCourse});
        }

    }])