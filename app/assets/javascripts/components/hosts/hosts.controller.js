angular
    .module("odrHosts",[])
    .controller('HostController',['hostsSchema', 'odrHostsApi', '$http', '$scope', function(hostsSchema, odrHostsApi, $http, $scope){
        $scope.hostsSchema = hostsSchema;
        $scope.hosts = odrHostsApi.hosts;
        $scope.newHost = {};

        $scope.getAllHosts = function() {
            return odrHostsApi.getAll();
        }
        
        $scope.addHost = function() {
            odrHostsApi.create({host:$scope.newHost});
        }
    }]);