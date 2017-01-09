(function() {
    var app = angular.module('signup', ['ngRoute']);
    
    // data controller
    app.controller('signupController', ['$scope', '$http',  '$window', function($scope, $http, $window) {
    }]);
   
    app.directive('setUpSignup', ['$window', function($window) {
    	return {
    		restrict : 'A',
            link : function(scope, window, element){
	            angular.element(document).ready(function(){
	                if ($window.innerWidth > 768){
	                // on récupère l'objet creation selectionné
                        console.log("coucou : ");
                        document.getElementById("signupRightImage").style.backgroundImage = 'url(https://s3.eu-central-1.amazonaws.com/cartelarticles/cartel-cover.png)';
                        document.getElementById("signupRightImage").style.backgroundSize = "400px 713px";
                        document.getElementById("signupRightImage").style.backgroundRepeat = "no-repeat";
                        document.getElementById("signupRightImage").style.height = "713px";
                        document.getElementById("signupRightImage").style.backgroundPosition = "right";
                    
                        console.log("ici : ", $window.innerHeight);
                        if (($window.innerHeight - 712) > 0){
                            document.getElementById("footer").style.height = ($window.innerHeight - 712)+"px";
                            document.getElementById("footer").style.position = "relative";
                        }
                    }
	            });
	        }
	    }
    }]);
   
})();