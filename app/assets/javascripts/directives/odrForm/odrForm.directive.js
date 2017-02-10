angular
    .module('onDemandRaces')
    .directive('odrForm', function(){
        return {
            templateUrl:'directives/odrForm/odrForm.template.html',
            restrict: 'E',
            scope: {
                formObject: '=',
                ngModel: '=',
                'submitAction': '&',
            },
            replace: true
            // controller: function($scope) {
            //     $scope.clickFunction = function() {
            //         $scope.submitAction();
            //     }
            // }
            // replace: true,
            // link: function(scope, elm, attrs) {       
            //     scope.callUpdate = function() {
            //         scope.submitAction();
            //     }
            // }
        }
    });