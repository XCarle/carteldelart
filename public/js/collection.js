(function(){
    var app = angular.module('collection', ['ngRoute'] );
    
    app.controller('collectionController', [ '$scope', '$http', '$window', function($scope, $http, $window) {
        
        $scope.collectionTab = true;
        $scope.showThumbnailList = true;
       
        $scope.collection = [];
        $scope.collectionNoExhibition = [];
        
        $scope.showCollectionNoExhibition = false;
        $scope.showCollection = true;
        
        $scope.showCollectionNoExhibitionButton = function(){
            $scope.showCollectionNoExhibition = !$scope.showCollectionNoExhibition;
        }
        
        $scope.showCollectionButton = function(){
            $scope.showCollection = !$scope.showCollection;
        }
        
      	var creationUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/";
      	
      	$scope.idCreator = window.idCreator;
      	
    	// récupération des données créations
      	$http({method: 'GET', url:'/collection.json?id='+idCreator}).success(function(data){
            if (data){
                console.log("data", data);
                for (var i =0; i < data[0].collection.creations.length; i++){
                    if (data[0].collection.creations[i].expositions && (new Date(data[0].collection.creations[i].expositions[0].date_debut) < new Date()) && (new Date(data[0].collection.creations[i].expositions[0].date_fin) > new Date())) {
                        $scope.collection.push(data[0].collection.creations[i]);
                    } else {
                        $scope.collectionNoExhibition.push(data[0].collection.creations[i]);
                    }
                }
                
                if ($scope.collection.length > 0){
                    $scope.showCollection = true;
                    $scope.showCollectionNoExhibition = false;
                } else {
                    $scope.showCollection = false;
                    $scope.showCollectionNoExhibition = true;
                }
                // on set up l'id de creation suivant
                
            }else{
                console.log("no data");
            }
        }).error(function(data, status, header, config){
            console.log("error");
        }).then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
       
       
       $scope.sizeFit = function(){
            if ($window.innerWidth < 768){
                return true;
            } else {
                return false;
            }
        }
        
        $scope.dislike = function(lcreation){
            $http({method: 'PUT', url:'/unlikeFromCollection.json?id_visitor='+$scope.idCreator+"&id_creation="+lcreation.id_creation})
            .success(function(data){
                lcreation.collected="false";
                console.log("lcreation : ", lcreation);
                console.log("collection : ", $scope.collection);
            }).error(function(data, status, header, config){
                console.log("error");
            }).then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            });
        };
        
        $scope.toDirectionPage = function(lcreation){
            
            console.log("toDirectionPage : ", lcreation);
            console.log("scope : ", $scope);
            
            // enregistrer le parcours
            $http({method: 'POST', url:'/record_directions_from_collection.json?id_visitor='+$scope.idCreator
                            +"&id_creation="+lcreation.id_creation
                            })
            .success(function(data){
                // set up the redirection
                $window.location.href="/directions";
            })
            .error(function(data, status, header, config){
                    console.log("error");
            })
            .then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            });
            
            
        
        }
        
        $scope.toCreationPage = function(lcreation){
            $window.location.href="/oeuvre/"+lcreation.author[0].fname.replace(" ", "-")+"-"+lcreation.author[0].lname.replace(" ", "-")+"/"+lcreation.id_creation;
        }
        
    }]);
    
    // click geolocation
	app.directive("clickGeolocation", ['$http', '$window', function($http, $window){
   		return {
		    retrict : 'A', 
		    link:function(scope,element){
		        var showPosition = function(position){
                    console.log("show position function, ", scope);
                    
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                    
                    if (scope.$parent.idCreator && scope.creation.id_creation && position.coords.latitude && position.coords.longitude){
                        console.log("ok");
                        $http({method: 'POST', url:'/record_directions.json?id_visitor='+scope.$parent.idCreator
                                            +"&id_creation="+scope.creation.id_creation
                                            +"&d_lat="+position.coords.latitude
                                            +"&d_lon="+position.coords.longitude
                                        })
                        .success(function(data){
                            console.log("directions return data : ", data);
                            // afficher la page de directions
                            $window.location.href="/directions";
                        })
                        .error(function(data, status, header, config){
                                console.log("error");
                        })
                        .then(function(httpData){
                            if(httpData.statusText == "OK"){
                            }
                        });
                    }
                };
        
                var handle_error = function(err){
                    // user said no PERMISSION_DENIED (1)
                    console.log("l'utilisateur ne souhaite pas partager sa position", err.code);
                    $http({method:'POST', url:'/error.json?type=ERROR_GEOLOC&code='+err.code
                        +'&'})
                    .success(function(data, status, header, config){
                        if (err.code == 1){
                
                        } else if(err.code == 2){
                            // POSITION_UNAVAILABLE .... impossible de récupérer votre position dans la ou vous trouvez, veuillez renseigner votre adresse.
                            console.log("position non disponible");
                    
                        } else if (err.code == 3){
                            // TIMEOUT
                            console.log("timeout");
                            // on propose les deux mode de localisation
                    
                        }
                    }).error(function(data, status, header, config){
            
                    }).then(function(httpData){
            
                    });
                };
                
		        element.bind("click", function(){
                    element.bind("click", function(){
                        console.log("click geolocation", scope);
                        if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(showPosition, handle_error, {maximumAge:60000}); // 3rd argument could be : Position object
                                // positionObject can be : enableHighCurracy, timeout, maximumAge.
                        } else { 
                            console.log("pas de geoloc");
                            //document.getElementById("myadresse").innerHtml = "La geolocation n'est pas supportée par votre navigateur internet. Renseignez votre adresse.";
                        }	
                    });
   		        });
   		   }
		}
   	}]);
    
    // DIRECTIVE
	// DIRECTIVE pour le chargement des images de la liste.
	// setupPreview
	app.directive("setCollectionCreations", function(){
	    return {
            restrict : 'A',
            scope:{
                withsrc:"@",
                withtpx:"@",
                withtpy:"@",
                withtdx:"@"
            },
            controller:['$scope', function($scope){
                $scope.$watch("withsrc", function(newValue, OldValue, scope){
                    if (scope.withsrc){
                        var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+scope.withsrc;
                        // charger les images
                        var thumbnail_canvas = document.createElement('canvas');
                        var myImage = document.getElementById('listThumb_'+scope.$parent.$index);
                        
                        //myImage.style.width = 200;
                        //myImage.style.height = 200;
                        
                        thumbnail_canvas.width = 500;
                        thumbnail_canvas.height = 500;
            
                        var imageTmp = new Image();
                        imageTmp.crossOrigin = "Anonymous";
                    
                        imageTmp.onload = function(){
                            thumbnail_canvas.getContext('2d').drawImage(imageTmp,scope.withtpx, scope.withtpy, scope.withtdx, scope.withtdx, 0, 0, thumbnail_canvas.width, thumbnail_canvas.height);
                            myImage.src = thumbnail_canvas.toDataURL();
                        }
                        imageTmp.src = myUrl;
                    }
                });   
            }],
            link:function(scope,element){
                angular.element(document).ready(function (){
                    // on récupère les données de selection
                    console.log("scope : : ", scope);
                    
                    
                });
            }
        }
	});	
	
	 // DIRECTIVE
	// DIRECTIVE pour le chargement des images de la liste.
	// setupPreview
	app.directive("setCollectionCreationsNoExhibition", function(){
	    return {
            restrict : 'A',
            scope:{
                withsrc:"@",
                withtpx:"@",
                withtpy:"@",
                withtdx:"@"
            },
            controller:['$scope', function($scope){
                $scope.$watch("withsrc", function(newValue, OldValue, scope){
                    if (scope.withsrc){
                        var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+scope.withsrc;
                        // charger les images
                        var thumbnail_canvas = document.createElement('canvas');
                        var myImage = document.getElementById('listThumbNoExhbition_'+scope.$parent.$index);
                        
                        //myImage.style.width = 200;
                        //myImage.style.height = 200;
                        
                        thumbnail_canvas.width = 500;
                        thumbnail_canvas.height = 500;
            
                        var imageTmp = new Image();
                        imageTmp.crossOrigin = "Anonymous";
                    
                        imageTmp.onload = function(){
                            thumbnail_canvas.getContext('2d').drawImage(imageTmp,scope.withtpx, scope.withtpy, scope.withtdx, scope.withtdx, 0, 0, thumbnail_canvas.width, thumbnail_canvas.height);
                            myImage.src = thumbnail_canvas.toDataURL();
                        }
                        imageTmp.src = myUrl;
                    }
                });   
            }],
            link:function(scope,element){
                angular.element(document).ready(function (){
                    // on récupère les données de selection
                    console.log("scope : : ", scope);
                    
                    
                });
            }
        }
	});	
    
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