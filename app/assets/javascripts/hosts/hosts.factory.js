angular
    .module('odrHosts')
    .factory('odrHostsApi', ['$http',function($http){
        var self = {
            hosts : []
        }

        self.getAll = function() {
            return $http.get('/hosts.json').then(function(data){
                angular.copy(data.data, self.hosts);
            })
        }

        self.create = function(host){
            return $http.post('/hosts.json', host).then(function(data){
                self.hosts.push(data);
            });
        }

        return self;
    }]);