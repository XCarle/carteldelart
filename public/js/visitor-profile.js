(function(){
    var app = angular.module('visitor-profile', ['ui-rangeSlider'] );
    
    app.controller('visitorProfileController', [ '$scope', '$http', '$window', function($scope, $http, $window) {
        
        $scope.visitorProfileTab = true;
        $scope.collectionTab = false;
        $scope.expositionsTab = false;
        $scope.parcoursTab = false;
        
        // get data from server.
        
        $scope.d_it_max = 2500;
        
        $scope.$watch("d_it_max", function(newValue){
            if (!$scope.isDistanceMaxChanged) $scope.isDistanceMaxChanged = true;
        });
        
        $scope.changeDistancemax = function(){
            $scope.isDistanceMaxChanged = false;
        }
        
        
        
    }]);
    
    app.directive("cartelNav", function(){
        return{
            restrict:'EAC',
            replace:true,
            templateUrl:'../www/elem/navbar.html'
        }
    });
    
    app.directive("cartelPublicNav", function(){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/navbar-public.html'
        }
    });
    
    
    app.directive("cartelFooter", ['$window', function ($window){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/footer.html'
        }    
    }]);
    
    app.filter('distancefilter', function () {
        return function (input) {
            if (input >= 1000) {
                return (input/1000).toFixed(2) + ' km';
            } else {
                return input + ' m';
            }
        }
    });
})();