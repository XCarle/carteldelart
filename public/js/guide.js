(function() {
    var app = angular.module('guide', ['ngCookies', 'ngRoute', 'ui.bootstrap']);

	var sessionid;
	var expireDate = new Date();	
    
    app.controller('GuideController', ['$http', '$cookies', '$window', '$scope', function($http, $cookies, $window, $scope, uuid) {
    	$scope.guideTab = true;
    	
    	$scope.sizeFit = function(){
            if ($window.innerWidth < 768){
                return true;
            } else {
                return false;
            }
        };
    	
    }]);	
		
	app.directive("cartelNav", function(){
        return{
            restrict:'EAC',
            replace:true,
            templateUrl:'../www/elem/navbar.html'
        }
    });
    
    app.directive("cartelFooter", function (){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/footer.html'
        }    
    });
    
	app.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true; 
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
})();
