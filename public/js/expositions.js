(function(){
    var app = angular.module('expositions', [] );
    
    app.controller('expositionsController', [ '$scope', '$http', '$window', function($scope, $http, $window) {
        
        $scope.parcoursTab = false;
        $scope.expositionsTab = true;
       
    }]);
    
    // load image
    app.directive("loadImage", ['$window', function($window) {
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("creation", function(newValue, OldValue, scope){
		            console.log("load image directive");
		            if (newValue){
		                if (newValue[0].creationdetails.url){
                            
                            if (newValue[0].creationdetails.properties){
                                // propriétés à afficher.
                                if (newValue[0].creationdetails.properties[0].title) $scope.title = newValue[0].creationdetails.properties[0].title;
                                if (newValue[0].creationdetails.author_details) $scope.author = newValue[0].creationdetails.author_details[0].fname+" "+newValue[0].creationdetails.author_details[0].lname;
                                if (newValue[0].creationdetails.properties[0].creation_date) $scope.creationDate = newValue[0].creationdetails.properties[0].creation_date;                                
                            }
                            
                            // canvas de thumbnail                                
                            var thumbnail_canvas = document.createElement('canvas');
                            thumbnail_canvas.width = 200;
                            thumbnail_canvas.height = 200;
                            
                            
                            var image = new Image();
                            image.crossOrigin = "Anonymous";
            
                            image.onload = function(){
                                thumbnail_canvas.getContext('2d').drawImage(image, newValue[0].creationdetails.t_p_x, newValue[0].creationdetails.t_p_y, newValue[0].creationdetails.t_d_x, newValue[0].creationdetails.t_d_x, 0, 0, 200, 200);
                                
                                var tmpImg = document.getElementById('directionImg');
                                tmpImg.src = thumbnail_canvas.toDataURL();
                            }
                            image.onerror = function(err){
                                console.log("error on image load : ", err);
                            }
                            image.src = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+newValue[0].creationdetails.url;
		                } else {return;}		                 
		            }
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
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
    
})();