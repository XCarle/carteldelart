(function(){
    var accessToken = 'pk.eyJ1IjoiY2FydGVsZGVsYXJ0IiwiYSI6ImNpaTh2NnhmZTAwMWp2emtvYXgzbWJqaDAifQ.b7PWfs663VOaL_JcmRJ65A';
    var app = angular.module('directions', [ 'leaflet-directive' ]);
    
    app.controller('BasicCenterController', [ '$scope', "leafletData", "leafletMapEvents", '$http', '$window', function($scope, leafletData, leafletMapEvents, $http, $window) {
       
        $scope.directions = [];
        
        $scope.id_visitor = window.idCreator;
        
        $scope.distance = function(lat1, lon1, lat2, lon2, unit) {
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var radlon1 = Math.PI * lon1/180
            var radlon2 = Math.PI * lon2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        };
        
        // to use with brng = 45° for NE / 225° for SW
        $scope.borderPoint = function(d_lat, d_lon, brng, dist) {
           dist = dist / 6371;  
           brng = brng * Math.PI / 180;  

           var lat1 = d_lat * Math.PI / 180, lon1 = d_lon * Math.PI / 180;

           var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) + 
                                Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

           var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
                                        Math.cos(lat1), 
                                        Math.cos(dist) - Math.sin(lat1) *
                                        Math.sin(lat2));

           if (isNaN(lat2) || isNaN(lon2)) return null;

           return {"lat":(lat2 *180 / Math.PI), "lng":(lon2*180 / Math.PI)};
        };
       
        // init HERE
        // on récupère les données à afficher depuis directions
        $http({method: 'GET', url:'/directions.json?id_visitor='+$scope.id_visitor})
        .success(function(data){
            
            if (data.length > 0){
                $scope.directions = data;
                
                $scope.d_lat = $scope.directions[0].directions.d_lat;
                $scope.d_lng = $scope.directions[0].directions.d_lon;
                $scope.a_lat = $scope.directions[0].directions.a_lat;
                $scope.a_lng = $scope.directions[0].directions.a_lon;
                
                var distance = 0;
                
                // on calcule les bounds
                if ($scope.d_lat == 0 && $scope.d_lng == 0){
                    $scope.boundSW = $scope.borderPoint($scope.a_lat, $scope.a_lng, 45, 2.5);
                    $scope.boundNE = $scope.borderPoint($scope.a_lat, $scope.a_lng, 225, 2.5);
                    $scope.getCreationDetails($scope.a_lat, $scope.a_lng);
                } else {
                    distance =  $scope.distance($scope.d_lat,$scope.d_lng,$scope.a_lat,$scope.a_lng,'K');
                    $scope.boundSW = $scope.borderPoint(($scope.d_lat+$scope.a_lat)/2 , ($scope.d_lng+$scope.a_lng)/2, 45, distance);
                    $scope.boundNE = $scope.borderPoint(($scope.d_lat+$scope.a_lat)/2 , ($scope.d_lng+$scope.a_lng)/2, 225, distance);
                }
                //console.log("SW",$scope.boundSW);
                //console.log("NE",$scope.boundNE);
                
                angular.extend($scope, {
                    maxbounds:{
                        southWest: $scope.boundSW,
                        northEast:$scope.boundNE
                    }
                });
                
                if ($scope.d_lat == 0 && $scope.d_lng == 0){
                    return;
                }else {
                    $scope.loadPaths( $scope.d_lng, $scope.d_lat, $scope.a_lng, $scope.a_lat);
                    $scope.getCreationDetails($scope.a_lat, $scope.a_lng);
                }
                
            } else {
                $window.location.href= "/parcours";
            }
        })
        .error(function(data, status, header, config){
                console.log("error");
        })
        .then(function(httpData){
            if(httpData.statusText == "OK"){
            }
        });
       
       angular.extend($scope, {
            defaults:{
                scrollWheelZoom:true
            },
            europeanPaths: {  },
            markers: {},
            tiles:{                
                url: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + accessToken
            },
            controls:{
                scale:true,
                custom:[
                    L.control.locate({ position:'topright', 
                                keepCurrentZoomLevel:true, 
                                showPopup:false,
                                follow: false })
                ]
            }
        });
        
            
        $scope.sizeFitMax = function(){
            if ($window.innerWidth > 768){
                return true;
            } else {
                return false;
            }
        }
        
        // récupération des données de position 
        var mapEvents = leafletMapEvents.getAvailableMapEvents();
        for (var k in mapEvents){
            var eventName = 'leafletDirectiveMap.' + mapEvents[k];
            $scope.$on(eventName, function(event, data){
                $scope.eventDetected = event.name;
                
                if ($scope.eventDetected === 'leafletDirectiveMap.locationfound'){
                    
                    if ($scope.distance($scope.d_lat,$scope.d_lng,data.leafletEvent.latitude,data.leafletEvent.longitude,'K') < 0.1){
                        return;
                    }
                    
                    $scope.d_lat = data.leafletEvent.latitude;
                    $scope.d_lng = data.leafletEvent.longitude;
                    
                    // gestion des coordonnées à leur mise à jour.
                    $http({method: 'POST', url:'/record_directions.json?id_visitor='+$scope.id_visitor
                            +"&id_creation="+$scope.creation[0].creationdetails.id_creation
                            +"&d_lat="+$scope.d_lat
                            +"&d_lon="+$scope.d_lng
                            })
                    .success(function(data){
                        var distance =  $scope.distance($scope.d_lat,$scope.d_lng,$scope.a_lat,$scope.a_lng,'K');
                        $scope.boundSW = $scope.borderPoint(($scope.d_lat+$scope.a_lat)/2 , ($scope.d_lng+$scope.a_lng)/2, 45, distance);
                        $scope.boundNE = $scope.borderPoint(($scope.d_lat+$scope.a_lat)/2 , ($scope.d_lng+$scope.a_lng)/2, 225, distance);
                        
                        $scope.loadPaths( $scope.d_lng, $scope.d_lat, $scope.a_lng, $scope.a_lat);
                        
                        angular.extend($scope, {
                            maxbounds:{
                                southWest: $scope.boundSW,
                                northEast:$scope.boundNE
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
                    
                    //console.log("+++++++", data.leafletEvent.latitude);
                    //console.log("+++++++", data.leafletEvent.longitude);
                    
                }
            });
        }
        
        // charger l'itinéraire
        $scope.loadPaths = function loadPaths(d_lon, d_lat, a_lon, a_lat) {
            console.log("load path d_lon", d_lon);
            console.log("load path d_lat", d_lat);
            console.log("load path a_lon", a_lon);
            console.log("load path a_lat", a_lat);
            
            $http({method:'GET', url:'https://api.mapbox.com/v4/directions/mapbox.walking/'+d_lon+','+d_lat+';'+a_lon+','+a_lat+'.json?access_token='+accessToken})
            .success(function(data) {                
                $scope.pathdistance = data.routes[0].distance;
                
                $scope.europeanPaths = {
                    p1:{
                        stroke:'true',
                        color:'#29374C',
                        lineCap:"square",
                        weight:2,
                        latlngs:[],
                        message:"<p>Distance: "+$scope.pathdistance+" km</p>"
                    }
                };

                for (var i = 0 ; i < data.routes[0].geometry.coordinates.length; i++){  
                    $scope.europeanPaths.p1.latlngs.push({
                        "lat":data.routes[0].geometry.coordinates[i][1],
                        "lng":data.routes[0].geometry.coordinates[i][0]
                    });
                }
            });
        };
                
        $scope.sizeFit = function(){
            if ($window.innerWidth < 768){
                return true;
            } else {
                return false;
            }
        }
    
        
        $scope.addMarkerDest = function(a_lat, a_lon, creation){
            angular.extend($scope, {
                markers: {
                    
                    m1: {
                        lat: a_lat,
                        lng: a_lon,
                        getMessageScope: function(){ return $scope;},
                        focus: false,
                        icon: {
                            iconUrl: '/img/icone-70.png',
                            shadowUrl: '',
                            iconSize:     [25, 25], // size of the icon
                            shadowSize:   [0, 0], // size of the shadow
                            iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
                            shadowAnchor: [0, 0],  // the same for the shadow
                            popupAnchor:  [-25, -25] // point from which the popup should open relative to the iconAnchor        
                        }
                    }
                }
            });
        };
        
        $scope.getCreationDetails = function(a_lat, a_lon){
            console.log("getCreationDetails");
             // on récupère les données à afficher depuis directions
            $http({method: 'GET', url:'/creationsWithId.json?id_creation='+$scope.directions[0].directions.id_creation})
            .success(function(data){
                if (data.length > 0){
                    $scope.creation = data;
                    console.log("creation info : ", $scope.creation);
                    
                    $scope.addMarkerDest(a_lat, a_lon, $scope.creation);
                }
            })
            .error(function(data, status, header, config){
                console.log("error");
            })
            .then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            });
        
        };
        
        $scope.recommand = function(){
            // on recupere la position pour tester la présence dans la galerie        
            
        }
    
        $scope.showDifferentLap = function(){
            // on recupere la position pour tester la présence dans la galerie        
            $window.location.href="/parcours";
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
    
    app.filter('descriptionfilter', ['$window',function ($window) {
        return function (input) {
            console.log("input : ", input);
            if ($window.innerWidth < 654){
                if (input.length >= 63){    
                    return input.substr(0,63);
                } else {
                    return input.substr(0,input.length);
                }
            } else {
                return input;
            }
        }
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