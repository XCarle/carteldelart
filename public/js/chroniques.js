(function() {
    var app = angular.module('chroniques', ['ngCookies', 'ngRoute', 'uuid', 'ui.bootstrap']);

	var sessionid;
	var expireDate = new Date();	
    
    app.controller('UserController', ['$http', '$cookies', '$window', '$scope', 'uuid', function($http, $cookies, $window, $scope, uuid) {
    	$scope.chroniquesTab = true;
    	
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
		$httpProvider.defaults.useXDomain = true; delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
})();
