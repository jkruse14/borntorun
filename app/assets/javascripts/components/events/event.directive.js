angular
    .module('onDemandRaces')
    .directive('odrEvent', function(){
        return {
            templateUrl:'components/events/partials/eventData.template.html',
            restrict: 'E',
            scope: {
                event: "="
            }
        }
    })