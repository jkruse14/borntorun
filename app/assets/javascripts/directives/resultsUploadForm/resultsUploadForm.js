angular
    .module('onDemandRaces')
    .directive('resultsUploadForm',['fileUtils',function(fileUtils){
        return {
            templateUrl: "directives/resultsUploadForm/resultsUploadForm.template.html",
            restrict: "E",
            scope: {
                event : "=",
                ngModel : "="
            },
            controller: ['$scope','$rootScope', 'fileUtils', function($scope, $rootScope, fileUtils){
                var self = this;

                $scope.loadFile = function(e) {
                    if(e != undefined) {
                        var file = e.target.files[0];
                    
                        if(file != null && file.size > 0) {
                            return file;
                        }
                        return null;
                    }
                }

                $scope.handleSubmit = function() {
                    if($scope.resultsFile) {
                        fileUtils.processGPXFile($scope.resultsFile).then(function(fileData){
                            $rootScope.$broadcast("result-loaded",fileData);
                        });
                    }
                }
            }],
        }
    }]);