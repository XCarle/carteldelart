(function() {
    var app = angular.module('exposition', []);
    
    app.controller('expositionController', ['$scope', '$http', function($scope, $http) {
        
        $scope.showExposition = false;
        
        $scope.exposition = window.exposition;
        
        console.log("$scope.exposition : ", $scope.exposition);
        $scope.show= new Array($scope.exposition.exposition_creations.length);
        
        
        $scope.generateTrueShow = function(i){
            console.log("generateTrueShow ", i);
            $scope.show[i] = true;
        }
        
        $scope.generateFalseShow = function(i){
            console.log("generateTrueShow ", i);
            $scope.show[i] = false;
        }
        
        
        $http({method: 'PUT', url:'/increxpositionview.json?id_exposition='+$scope.exposition.id_exposition})
        .success(function(data){
                
                $http({method: 'GET', url:'/increxpositionview.json?id_exposition='+$scope.exposition.id_exposition})
                .success(function(data2){
                    if (data2){
                        console.log("data 2 : ", data2);
                        $scope.nb_view = data2[0].nb_view_exposition.nb_view;
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
    
    app.directive("setSize", ['$window', '$timeout', function($window, $timeout){
        return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("creation", function(newValue, OldValue, scope){
		            console.log("new value : ", newValue);
		            var myImage = document.getElementById("fullScreenImage");
                    myImage.onload=function(){
                        console.log("imaghe load : ", $window.innerWidth);
                        
                        if ($window.innerWidth > 654){
                            document.getElementById('divDetail2').style.width = "654px";
                        } else {
                            document.getElementById('divDetail2').style.width = window.innerWidth;
                        }
                        
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
		    }]
		}
    }]);
    
    app.directive("setExhibitionCover", ['$window', '$timeout', function($window, $timeout){
        return {
            restrict : 'A', 
            scope: {
                withsrc: "@",
                withtpx:"@",
                withtpy:"@",
                withtdx:"@"
            },
            controller:['$scope', function($scope){
                $scope.$watch("exposition", function(newValue, OldValue, scope){
                    var myElem = document.getElementById("exhibitionImage");
                    
                    var thumbnail_canvas = document.createElement('canvas');
                    thumbnail_canvas.width = 1308;
                    thumbnail_canvas.height = 1308;
                    
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                    
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, scope.withtpx, scope.withtpy, scope.withtdx, scope.withtdx, 0, 0, 1308, 1308);
                        myElem.src = thumbnail_canvas.toDataURL();
                        
                        $scope.$parent.showExposition = true;
                        console.log("$scope.showExposition : ", $scope);
                        $timeout(function() {
                            // anything you want can go here and will safely be run on the next digest.
                            
                            $scope.$apply();
                        });
                    }
                    imageTmp.src = "https://s3.eu-central-1.amazonaws.com/cartelexposition/"+scope.withsrc;
                });
            }], 
            link:function(scope,element){
                element.bind("click", function(){
                    console.log("coucou clicked");
                
                });
            }
        }
    }]);
    
    
    app.directive("setCreation", ['$window', '$timeout', function($window, $timeout){
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
                $scope.$watch("$scope.exposition", function(newValue, OldValue, scope){
                    console.log("scope : ", scope);
                    
                    var myElem = document.getElementById("creation_"+scope.id);
                    myElem.style.height = "100%";
                    myElem.style.width = "100%";
                    
                    var thumbnail_canvas = document.createElement('canvas');
                    thumbnail_canvas.width = 300;
                    thumbnail_canvas.height = 300;
                    
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                    
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, scope.withtpx, scope.withtpy, scope.withtdx, scope.withtdx, 0, 0, 300, 300);
                        myElem.src = thumbnail_canvas.toDataURL();
                    }
                    imageTmp.src = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+scope.withsrc;
                    
                });
            }], 
            link:function(scope,element){
                element.bind("click", function(){
                    console.log("element clicked, ", scope);
                    $window.location.href="/oeuvre/"+scope.$parent.exposition.exposition_creations[scope.id].gallery_artists[0].fname.replace(" ", "-")+"-"
                                                    +scope.$parent.exposition.exposition_creations[scope.id].gallery_artists[0].lname.replace(" ", "-")
                                                    +"/"+scope.$parent.exposition.exposition_creations[scope.id].id_creation;
                    
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
    
    app.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true; 
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });
    
    
})();