(function() {
    var app = angular.module('oeuvre', []);
    
    app.controller('oeuvreController', ['$scope', '$http', function($scope, $http) {
        
        $scope.creation = window.creation;
        console.log("$scope.creation", $scope.creation);
        $scope.expositions = $scope.creation.creation_expositions;
        console.log("$scope.expositions", $scope.expositions);
        
        $http({method: 'PUT', url:'/incrcreationview.json?id_creation='+$scope.creation.id_creation})
        .success(function(data){
                
                $http({method: 'GET', url:'/incrcreationview.json?id_creation='+$scope.creation.id_creation})
                .success(function(data2){
                    if (data2){
                        $scope.nb_view = data2[0].nb_view_creation.nb_view;
                    } else {
                        $scope.nb_view = 0;
                    }
                }).error(function(data, status, header, config){
                    console.log("error");
                }).then(function(httpData){
                    if(httpData.statusText == "OK"){
                    }
                });
        }).error(function(data, status, header, config){
            console.log("error");
        }).then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
    
    }]);
    
    app.directive("setExposition", ['$timeout', function($window, $timeout){
        return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("expositions", function(newValue, OldValue, scope){
		            console.log("set exposition");
		            
		        });
		    }]
		}
    }]);
    
    app.directive("setSize", ['$window', '$timeout', function($window, $timeout){
        return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("creation", function(newValue, OldValue, scope){

                        console.log("new value : ", newValue);

                        var myImage = document.getElementById("fullScreenImage");
                        
                        console.log("myImage : ", myImage);
                        
                        myImage.onload=function(){
                            console.log("image load : ", $window.innerWidth);
                        
                            if (newValue.gallery_details){
                                console.log("into g_details");
                                if (newValue.gallery_details[0].url){
                                
                                    console.log("into g_url");
                                
                                    $scope.gName = newValue.gallery_details[0].gname;
                                    $scope.gAdresse = newValue.gallery_details[0].g_adresse;
                                
                                    var myAvatarImage = new Image();
                                    myAvatarImage.crossOrigin = "Anonymous";
                                    var thumbnail_avatar_canvas = document.createElement('canvas');
                                
                                    thumbnail_avatar_canvas.width = 200;
                                    thumbnail_avatar_canvas.height = 200;

                                    myAvatarImage.onload = function(){
                                        console.log("myAvatarImage.onload");
                                        // on dessine la thumbnail
                                        thumbnail_avatar_canvas.getContext('2d').drawImage(myAvatarImage, newValue.gallery_details[0].a_x, newValue.gallery_details[0].a_y, newValue.gallery_details[0].a_d_x, newValue.gallery_details[0].a_d_x, 0, 0, 200, 200);
                                    
                                        document.getElementById('logoGallery').src = thumbnail_avatar_canvas.toDataURL();
                                    
                                        $scope.showLoadingOngoing = false;
                                        $scope.showCreationSection = true;
                                    
                                        $timeout(function() {
                                            // anything you want can go here and will safely be run on the next digest.
                                            $scope.$apply();
                                        });
                                    }
                                    myAvatarImage.src = "https://s3.eu-central-1.amazonaws.com/cartelgallery/"+newValue.gallery_details[0].url;
                                }
                            }
                        }
                        
                        
		        });
		    }],
		    link:function(scope,element){
		        $('document').ready(function(){
		            console.log("document ready : ");
                    if ($window.innerWidth > 654){
                        console.log("> 654");
                        document.getElementById('divDetail2').style.width = "654px";
                        if (document.getElementById('divDetail3'))document.getElementById('divDetail3').style.width = "654px";
                    } else {
                        console.log("< 654");
                        document.getElementById('divDetail2').style.width = window.innerWidth;
                        if (document.getElementById('divDetail3'))document.getElementById('divDetail3').style.width = window.innerWidth;
                    }
                });
            }            
		}
    }]);
    
    app.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true; 
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
    
    app.directive("setCreationExpositionImage",['$window', '$timeout', function($window, $timeout){
        return {
            restrict : 'A', 
            scope: {
                withsrc: "@",
                withtpx:"@",
                withtpy:"@",
                withtdx:"@",
                id:"@"
            },
            controller:['$scope', function($scope){
                $scope.$watch("exposition", function(newValue, OldValue, scope){
                    console.log("coucou from setCreationExpositionImage ", scope);
                    var myElem = document.getElementById("expositionimg_"+scope.id);
                    
                    console.log("coucou", myElem);
                    
                        myElem.style.height = "100%";
                        myElem.style.width = "100%";
                    
                    
                    var thumbnail_canvas = document.createElement('canvas');
                    thumbnail_canvas.width = 500;
                    thumbnail_canvas.height = 500;
                
                    var imageTmp = new Image();
                        imageTmp.crossOrigin = "Anonymous";
                    
                        imageTmp.onload = function(){
                            thumbnail_canvas.getContext('2d').drawImage(imageTmp, scope.withtpx, scope.withtpy, scope.withtdx, scope.withtdx, 0, 0, 500, 500);
                            myElem.src = thumbnail_canvas.toDataURL();
                            
                           
                        }
                    
                        imageTmp.src = "https://s3.eu-central-1.amazonaws.com/cartelexposition/"+scope.withsrc;
                });  
            }], 
            link:function(scope,element){
                element.bind("click", function(){
                    console.log("element clicked, ", scope);
                    $window.location.href="/exposition/"
                                            +scope.$parent.creation.gallery_details[0].gname.replace(/\s/g, '-')
                                            +"/"+scope.$parent.expositions[scope.id].id_exposition;
                });
            }
        }
    }]);
    
    app.directive("cartelNav", function(){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'/nav'
        }
    });
    
    app.directive("cartelFooter", function (){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'/footer'
        }
    });
    
})();