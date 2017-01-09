(function() {
    var app = angular.module('welcome', ['ngRoute']);
    
    // data controller
    app.controller('welcomeController', ['$scope', '$http',  '$window', function($scope, $http, $window) {
    
    var welcome = this;
        	
    $scope.idCreator = window.idCreator;
    
    $scope.artisteLoaded = false;
    $scope.galerieLoaded = false;
    
    $scope.clickArtiste = function(){
        console.log("clickArtiste");
        $http({method: "PUT", url:'creators/?id='+$scope.idCreator
							+"&type=artiste"
							})
        .success(function(data){
            $scope.artisteLoaded = true;
        })
        .error(function(data, status, header, config){
        })
        .then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
    }
    
    $scope.clickGalerie = function(){
        console.log("clickGalerie");
        $http({method: "PUT", url:'creators/?id='+$scope.idCreator
							+"&type=galerie"
							})
        .success(function(data){
            $scope.galerieLoaded = true;
        })
        .error(function(data, status, header, config){
        })
        .then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
    }
    
    }]);
    
    app.directive('redirectionArtiste', function(){
    	return {
    		restrict : 'A',
    		controller:['$scope', function($scope){
    			$scope.$watch("artisteLoaded", 
    			function(newValue, OldValue, scope){
    			    console.log(newValue);
    			    if(newValue){
    			        window.location.assign("/profile");
    			    }
                })
                }]
        }
    });
    
    app.directive('redirectionGalerie', function(){
    	return {
    		restrict : 'A',
    		controller:['$scope', function($scope){
    			$scope.$watch("galerieLoaded", 
    			function(newValue, OldValue, scope){
    			    console.log(newValue);
    			    if(newValue){
    			        window.location.assign("/profile");
    			    }
                })
                }]
        }
    });
    
    app.directive("cartelFooter", function (){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/footer.html'
        }    
    });
    
})();