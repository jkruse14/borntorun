angular
    .module('onDemandRaces')
    .directive('mapbox', [
        function () {
            return {
            restrict: 'E',
            replace: true,
            scope: {
                callback: "=",
                course: "=",
                resultsFileData: "=",
            },
            template: "<div id='map' class='map'></div>",
            link: function ($scope, element, attributes) {
                $scope.$watch('resultsFileData',function(){
                    console.log('update found');
                    renderResultData();
                },true)

                L.mapbox.accessToken = 'pk.eyJ1IjoiamtydXNlMTQiLCJhIjoiY2l3amdmOTB6MDAxODJ0bnd2cTg5eHlxciJ9.e-Gufi-b2_pWF4nRdRWYOA';
                
                var mapOptions = {
                    style: 'mapbox://styles/mapbox/outdoors-v9',
                    center: [48.1667, -100.1667],
                    zoom: 5,
                    logoPosition: 'bottom-right',
                    //scrollZoom: false,
                    //bearing: 0,
                    //pitch: 0,
                    //altitude: 1.5,
                    //clickRadius: 15
                }

                $scope.map = L.mapbox.map(element[0],'mapbox.outdoors', mapOptions);
                
                console.log("course",$scope.ngModel);
                // let course = $scope.ngModel.course;
                // let result = $scope.ngModel.result;
                   // if($scope.course) {
                var featureLayer = L.mapbox.featureLayer().addTo($scope.map);
                featureLayer.setGeoJSON({
                    type: "LineString",
                    coordinates: $scope.course.geometry.coordinates,
                    properties: $scope.course.properties,
                })
                var lat = $scope.course.geometry.coordinates[0][1]
                var lng = $scope.course.geometry.coordinates[0][0]
                $scope.map.setView([lat, lng],14)
                featureLayer.on('ready', function() {
                    
                    //$$scope.map.fitBounds($$scope.map.getBounds());
                    
                });

                var renderResultData = function() {
                    if($scope.resultsFileData && $scope.resultsFileData.geometry.coordinates) {
                        console.log("rf", $scope.resultsFileData);
                            var resultsLayer = L.mapbox.featureLayer().addTo($scope.map);
                            resultsLayer.setGeoJSON({
                                type:"LineString",
                                coordinates: $scope.resultsFileData.geometry.coordinates,
                            });
                            resultsLayer.setStyle({ color: 'red' })
                        }
                }
            }
        };
        }
    ]);