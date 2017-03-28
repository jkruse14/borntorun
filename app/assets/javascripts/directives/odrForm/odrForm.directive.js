angular
    .module('onDemandRaces')
    .directive('odrForm',[ 'fileUtils',function(fileUtils){
        
        return {
            templateUrl:'directives/odrForm/odrForm.template.html',
            restrict: 'E',
            scope: {
                formObject: '=',
                ngModel: '=',
                'submitAction': '&',
                'changeAction': '&',
            },
            controller: ['$scope', 'fileUtils', function($scope, fileUtils){
                $scope.loadFile = function(e) {
                    if(e != undefined) {
                        var file = e.target.files[0];
                    
                        if(file != null && file.size > 0) {
                            return file;
                        }
                        return null;
                    }
                }
            }]
        }
    }]);