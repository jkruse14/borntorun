angular
    .module('odrEvents')
    .factory('odrEventsApi', ['$http',function($http){
        var self = {
            events : []
        }

        self.getAll = function() {
            return $http.get('/events.json').then(function(data){
                angular.copy(data.data, self.events);
            })
        }

        self.create = function(event){
            return $http.post('/events.json', event).then(function(data){
                self.events.push(data);
            });
        }

        return self;
    }]);