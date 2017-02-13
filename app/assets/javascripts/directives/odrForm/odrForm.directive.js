angular
    .module('onDemandRaces')
    .directive('odrForm',[ 'fileLoader',function(fileLoader){
        
        return {
            templateUrl:'directives/odrForm/odrForm.template.html',
            restrict: 'E',
            scope: {
                formObject: '=',
                ngModel: '=',
                'submitAction': '&',
                'changeAction': '&',
            },
            controller: ['$scope', 'fileLoader', function($scope, fileLoader){
                $scope.$watch('onChange',function(){"changed2"})
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