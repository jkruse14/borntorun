angular
    .module('onDemandRaces')
    .directive('mapbox', [
        function () {
            return {
            restrict: 'EA',
            replace: true,
            scope: {
                callback: "="
            },
            template: "<div id='map' class='map'></div>",
            link: function (scope, element, attributes) {
                L.mapbox.accessToken = 'pk.eyJ1IjoiamtydXNlMTQiLCJhIjoiY2l3amdmOTB6MDAxODJ0bnd2cTg5eHlxciJ9.e-Gufi-b2_pWF4nRdRWYOA';
                
                var mapOptions = {
                    style: 'mapbox://styles/mapbox/outdoors-v9',
                    center: [48.1667, -100.1667],
                    zoom: 5,
                    logoPostition: 'bottom-right',
                    //scrollZoom: false,
                    //bearing: 0,
                    //pitch: 0,
                    //altitude: 1.5,
                    //clickRadius: 15
                }

                var map = L.mapbox.map('map','mapbox.outdoors', mapOptions)
               //scope.callback(map);
            }
            };
        }
    ]);