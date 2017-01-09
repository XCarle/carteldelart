(function(){
	var app = angular.module('parcours', ['ngRoute', 'ui.bootstrap']);
  	
    app.controller('parcoursController', ['$scope', '$filter', '$http', '$window', '$location', function($scope, $filter, $http, $window, $location) {
    
    console.log("route : ", $location);
    
    $scope.parcoursTab = true;
    
    var parcours = this;
    parcours.ids = [];
    $scope.parcours = [];
    $scope.lastOpinion = [];
    
    $scope.latitude = 0;
    $scope.longitude = 0;
    
    $scope.id_visitor = window.idCreator;
    
    // init des constantes d'affichage
    $scope.showLoadingOngoing = true;
    $scope.showLocationConfig = true;
    $scope.showNoCreationFound = false;
    $scope.showCreationSection = false; 
    $scope.showGoogleAddressCollector = true;
    $scope.showInfo = false;
    
    $scope.showInfoContent = function(){
        $scope.showInfo = !$scope.showInfo;
    }
    
    /**
    ** RECUPERATION DES DONNEES
    **/
    $scope.getCreationId = function(){
        console.log("get creation id");
        
        $http({method: 'GET', url:'/creationsFromGeolocation.json?latitude='+$scope.latitude
                                                                +'&longitude='+$scope.longitude+"&id_visitor="+$scope.id_visitor})
        .success(function(data){
            parcours.ids = data;
            console.log("recuperation des id : ", data);
            
            if (data.length >0){
                if (data[0].creationids.exp_priority == 0){
                    $scope.classconditionnalshow='col-xs-4';
                    $scope.classshow='col-xs-4';
                    $scope.showconditionnalshow = true;
                    console.log($scope.classshow);
                } else {
                    $scope.showconditionnalshow = false;
                    $scope.classshow='col-xs-6';
                    console.log($scope.classshow);
                }
            }
            
            //$scope.showLoadingOngoing = false;
            // on charge la première donné
            if (parcours.ids && parcours.ids.length > 0 && parcours.ids[0].creationids){
                // on récupère la distance
                    $scope.distance = parcours.ids[0].creationids.miles * 1.60934;                
                    // on récupère les données de la création
                    $scope.getCreationDetail(parcours.ids[0].creationids.id_creation);
                    $scope.showNoCreationFound = false;
            }else {
                $scope.showNoCreationFound = true;
                $scope.showCreationSection = false;
                $scope.showLoadingOngoing = false;
            }
        })
        .error(function(data, status, header, config){
      			console.log("error");
		})
		.then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
    }
    
    $scope.getCreationDetail = function(id){
        console.log(" creation detail with param ", id);
        $scope.id_creation = id;
        $http({method: 'GET', url:'/creationDetails.json?id_creation='+id})
        .success(function(data){
            $scope.creation = data;
            console.log("parcours.creation : ", $scope.creation);
            
            console.log("a :",$scope.creation[0]);
            console.log("b :",$scope.creation[0].creationdetails);
            console.log("c :",$scope.creation[0].creationdetails.author_details);
            console.log("d :",$scope.creation[0].creationdetails.author_details[0].fname);
            
            $scope.url = $scope.creation[0].creationdetails.author_details[0].fname.replace(/\s/g, '-')+"-"+$scope.creation[0].creationdetails.author_details[0].lname.replace(/\s/g, '-')+"/"+id;
            
            // redirect 
            $window.location.href = "/oeuvre/"+$scope.url;
        })
        .error(function(data, status, header, config){
      			console.log("error");
		})
		.then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
    
    }
    
    $scope.getCreationUrl = function(){
        console.log("get creation url");
        
        $http({method: 'GET', url:'/urlFromGeolocation.json?latitude='+$scope.latitude
                                                                +'&longitude='+$scope.longitude})
        .success(function(data){
            
            // TO CHANGE 
            parcours.ids = data;
            console.log("recuperation des id : ", data);
            
            // Calcul de l'url.
            // on récupère les informations associées à l'id. 
            $scope.getCreationDetail(parcours.ids[0].url.id_creation);
            
            
            // Ou affichage de la listes des oeuvres avec la distance. 
            
            //$scope.showLoadingOngoing = false;
        })
        .error(function(data, status, header, config){
      			console.log("error");
		})
		.then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
        
    }
    
    // GEOLOCALISATION
    $scope.clickGeolocation = function(){
        console.log("click geolocation");

        $http({method:'GET', url:'https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.adresse
                    +'&key=AIzaSyA62f9rWqmGsKRZRBkKS-i733eUBX969pE'})
        .success(function(data, status, header, config){
            console.log("data : ", data);
            console.log("status : ", status);
            console.log("header : ", header);
            if (data.status == "OK"){
                $scope.latitude = data.results[0].geometry.location.lat;
                $scope.longitude = data.results[0].geometry.location.lng;
                console.log($scope.latitude);
                console.log($scope.longitude);
                
                // on récupère l'url
                //$scope.getCreationId();
                $scope.getCreationUrl();
            } else if (data.status == "ZERO_RESULTS"){
                if ($scope.showGeolocErrorMessage){
                    $scope.showGoogleAddressCollector = false;
                    $scope.showGeolocErrorMessage = false;
                } else {
                    $scope.showGeolocErrorMessage = true;
                }
            } else if (data.status == "OVER_QUERY_LIMIT"){
                $scope.showGoogleAddressCollector = false;
            } else if (data.status == "REQUEST_DENIED"){
                $scope.showGoogleAddressCollector = false;
            } else if (data.status == "INVALID_REQUEST"){
                $scope.showGoogleAddressCollector = false;
            } else if (data.status == "UNKNOWN_ERROR"){
                $scope.showGoogleAddressCollector = false;
            }
        }).error(function(data, status, header, config){
            console.log("error : ", data);
            $scope.showGoogleAddressCollector = false;
        }).then(function(httpData){});
    }

/**********************
**          SELECTION DE LA PROCHAINE OEUVRE
**********************/
    $scope.skipAndShowNextCreation = function(){
        console.log("skip and show next creation");
        
        $scope.showLoadingOngoing = true;
        $scope.showCreationSection = false;
        
        // on positionne les variable pour memorisation des opinions
        $scope.collected = false;
        $scope.registered = false;
        
        $scope.nextCreation();
        
    }
    
    $scope.addCreationToCollection = function(){
        console.log("add creation to collection");
        
        $scope.showLoadingOngoing = true;
        $scope.showCreationSection = false;
        
        // on positionne les variable pour memorisation des opinions
        $scope.collected = true;
        $scope.registered = false;
        
        $scope.nextCreation();
    }
    
    $scope.sizeFit = function(){
        if ($window.innerWidth < 768){
            return true;
        } else {
            return false;
        }
    }
    
    $scope.addCreationToLap = function(){
        console.log("add creation to lap");
        $scope.showLoadingOngoing = true;
        $scope.showCreationSection = false;
        // on positionne les variable pour memorisation des opinions
        $scope.collected = true;
        $scope.registered = true;
        
        $http({method: 'POST', url:'/record_directions.json?id_visitor='+$scope.id_visitor
                            +"&id_creation="+$scope.id_creation
                            +"&d_lat="+$scope.latitude
                            +"&d_lon="+$scope.longitude
                            })
        .success(function(data){
            console.log("directions return data : ", data);
            // afficher la page de directions
            //$scope.showLoadingOngoing = false;
            //$scope.showCreationSection = true;
            $scope.collected = true;
            $scope.registered = true;
            // on mémorise l'opinion : 
            $http({method: 'POST', url:'/opinion.json?id_creation='+$scope.id_creation
                                +"&id_visitor="+$scope.id_visitor
                                +"&collected="+$scope.collected
                                +"&registered="+$scope.registered
                                +"&latitude="+$scope.latitude
                                +"&longitude="+$scope.longitude
                                })
            .success(function(data){
                
                // on affiche la page directions
                $window.location.href="/directions";
            })
            .error(function(data, status, header, config){
                    console.log("error");
            })
            .then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            });
        })
        .error(function(data, status, header, config){
                console.log("error");
        })
        .then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
    }
    
    
}]);
       
/**********************
**          DIRECTIVES
**********************/  
    // close modal
    app.directive("closeModal", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        console.log("close modal directive");
		        $scope.$watchGroup(["lastOpinion", "latitude", "longitude"], function(newValue, OldValue, scope){
		            // on a récupéré les localisations des utilisateurs
		            if (newValue[1] > 0 && newValue[2] > 0){
                        $('#myAuthModal').modal('hide');
		            }
		            console.log("new opinion loaded : ", newValue[0]);
		            // on a récupéré la date de la dernière opinion
		            if (newValue[0]){
                        if (newValue[0].length > 0){
                            console.log("last opinion in directive : ", newValue[0]);
                            var d = new Date();
                            if (new Date(newValue[0][0].lastopinion.creation_date) > d.setHours(d.getHours() - 1)){
                                console.log("hide modal");
                                $('#myAuthModal').modal('hide');
                                console.log("modal hiden");
                                $scope.showAuthModal = false;
                            } else { // la position n'est plus valide alors la mettre à jour.
                                console.log("showMOdal");
                                if (!$('#myAuthModal').is(':visible')) {
                                    console.log("show");
                                    $('#myAuthModal').modal('show');
                                    $scope.showAuthModal = true;
                                } else {
                                    console.log("modal already visible");
                                }
                            }
                        } else {
                            console.log("no opinion already");
                            if (!$('#myAuthModal').is(':visible')) {
                                console.log("on est caché");
                                $('#myAuthModal').modal('show');
                                $scope.showAuthModal = true;
                                // if modal is not shown/visible then do something
                            }
                        }
		            }
                });
                
   		    }], 
            link:function(scope,element){
            element.bind("click", function(){
            });
        }
        }
	});

    // click geolocation
	app.directive("clickGeolocation", ['$http', function($http){   
   		
   		var showPosition = function(position){
   		    console.log("show position function");
   			var $element = document.getElementById("parcoursController");
			$scope = angular.element($element).scope();
			
			$scope.latitude = position.coords.latitude;
			$scope.longitude = position.coords.longitude;
			console.log("latitude and longitude ok.");
			$scope.$apply();
    	}
   	    
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
   	    }
   	    
   		return function(scope,element){
   			element.bind("click", function(){
   			    console.log("click geolocation");
				if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(showPosition, handle_error, {maximumAge:60000}); // 3rd argument could be : Position object
						// positionObject can be : enableHighCurracy, timeout, maximumAge.
				} else { 
				    console.log("pas de geoloc");
					//document.getElementById("myadresse").innerHtml = "La geolocation n'est pas supportée par votre navigateur internet. Renseignez votre adresse.";
				}	
   			});
   		};
   	}]);
   
    // load image
    app.directive("loadImage", ['$window', '$timeout', function($window, $timeout) {
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("creation", function(newValue, OldValue, scope){
		            console.log("load image directive");
		            if (newValue){
		                console.log("new value : ", newValue);
		                
		                if (newValue[0].creationdetails.url){
                            var myLocalImage = document.getElementById('fullScreenImage');
                            myLocalImage.crossOrigin = "Anonymous";
                            
                            myLocalImage.onload = function(){
                                myLocalImage.style.height = newValue[0].creationdetails.height;
                                myLocalImage.style.width = newValue[0].creationdetails.width;
                            
                                console.log("test window size for button positionning if > 654");
                                
                                if ($window.innerWidth > 654){
                                    console.log("YES window width enough to center buttons");
                                    document.getElementById('divDetail').style.marginBottom = "30px";
                                    
                                    console.log("on teste si la la largeur de l'image est inférieur à 654px");
                                    if (newValue[0].creationdetails.width < 654){
                                        console.log("oui donc on fixe les tailles des block à la largeur de l'image avec pour largeur : ", newValue[0].creationdetails.width);
                                        document.getElementById('divDetail').style.width = newValue[0].creationdetails.width+"px";
                                        document.getElementById('divDetail2').style.width = newValue[0].creationdetails.width+"px";
                                    } else {
                                        console.log("non donc on fixe à la largeur maximale");
                                        document.getElementById('divDetail').style.width = "654px";
                                        document.getElementById('divDetail2').style.width = "654px";
                                    }
                                } else {
                                    console.log("NO on fixe a la largeur de la page");
                                    document.getElementById('divDetail').style.marginBottom = "0";
                                    document.getElementById('divDetail').style.width = $window.innerWidth;
                                    document.getElementById('divDetail2').style.width = $window.innerWidth;
                                }
                            
                                if (newValue[0].creationdetails.author_details) {
                                    $scope.author = newValue[0].creationdetails.author_details[0].fname+" "+newValue[0].creationdetails.author_details[0].lname;
                                    $scope.bio = newValue[0].creationdetails.author_details[0].bio;
                                }
                                if (newValue[0].creationdetails.properties){
                                    if (newValue[0].creationdetails.properties[0].title) $scope.title = newValue[0].creationdetails.properties[0].title;
                                    if (newValue[0].creationdetails.properties[0].cartel) $scope.cartel = newValue[0].creationdetails.properties[0].cartel;
                        
                                    if (newValue[0].creationdetails.properties[0].creation_date) $scope.creationDate = newValue[0].creationdetails.properties[0].creation_date;
                                    if (newValue[0].creationdetails.properties[0].medium) $scope.medium = newValue[0].creationdetails.properties[0].medium;
                                    if (newValue[0].creationdetails.properties[0].s_h) $scope.h = newValue[0].creationdetails.properties[0].s_h;
                                    if (newValue[0].creationdetails.properties[0].s_l) $scope.l = newValue[0].creationdetails.properties[0].s_l;
                                    if (newValue[0].creationdetails.properties[0].s_w)  $scope.p = newValue[0].creationdetails.properties[0].s_w;
                                }
                                
                                if (newValue[0].creationdetails.gallery_details){
                                    if (newValue[0].creationdetails.gallery_details[0].url){
                                        
                                        $scope.gName = newValue[0].creationdetails.gallery_details[0].gname;
                                        $scope.gAdresse = newValue[0].creationdetails.gallery_details[0].g_adresse;
                                        
                                        var myAvatarImage = new Image();
                                        myAvatarImage.crossOrigin = "Anonymous";
                                        var thumbnail_avatar_canvas = document.createElement('canvas');
                                        
                                        thumbnail_avatar_canvas.width = 200;
                                        thumbnail_avatar_canvas.height = 200;

                                        myAvatarImage.onload = function(){
                                            console.log("myAvatarImage.onload");
                                            // on dessine la thumbnail
                                            thumbnail_avatar_canvas.getContext('2d').drawImage(myAvatarImage, newValue[0].creationdetails.gallery_details[0].a_x, newValue[0].creationdetails.gallery_details[0].a_y, newValue[0].creationdetails.gallery_details[0].a_d_x, newValue[0].creationdetails.gallery_details[0].a_d_x, 0, 0, 200, 200);
                                            
                                            document.getElementById('logoGallery').src = thumbnail_avatar_canvas.toDataURL();
                                            
                                            $scope.showLoadingOngoing = false;
                                            $scope.showCreationSection = true;
                                            
                                            $timeout(function() {
                                                // anything you want can go here and will safely be run on the next digest.
                                                $scope.$apply();
                                            });
                                        }
                                        myAvatarImage.src = "https://s3.eu-central-1.amazonaws.com/cartelgallery/"+newValue[0].creationdetails.gallery_details[0].url;
                                    }
                                }
                                
                                console.log("$scope.", $scope.showCreationSection);
                                $scope.$apply();
                            
                            }
                            
                            myLocalImage.src = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+newValue[0].creationdetails.url;   
		                }
		            }
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	}]);	
	
	// scroll top
	app.directive("scrollTop", function(){
		
		$.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
            return this; // for chaining...
    	}	
    	return function (scope, element, attr){	
   			element.bind("click", function(){
   			    $('#parcoursController').goTo();
   			});
   		}
   	});
	
	// cartel nav
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
    
    
    // cartel footer
    app.directive("cartelFooter", ['$window', function ($window){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/footer.html'
        }    
    }]);   
})();