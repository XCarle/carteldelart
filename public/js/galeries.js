(function() {
    var app = angular.module('galeries', [ 'leaflet-directive' ]);
    
    var accessToken = 'pk.eyJ1IjoiY2FydGVsZGVsYXJ0IiwiYSI6ImNpaTh2NnhmZTAwMWp2emtvYXgzbWJqaDAifQ.b7PWfs663VOaL_JcmRJ65A';
    
    app.controller('GalerieMapController', [ '$scope', "leafletData", "leafletMapEvents", '$http', '$window', function($scope, leafletData, leafletMapEvents, $http, $window) {
        
        $scope.galeriesTab = true;
        
        $scope.clickMap = function(){
            console.log("map clicked");
        }
        
        $scope.sizeFit = function(){
            if ($window.innerWidth < 768){
                return true;
            } else {
                return false;
            }
        };
        
        angular.extend($scope, {
            defaults:{
                minZoom:13,
                scrollWheelZoom:false
            },
            tiles:{ 
                url: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + accessToken
            },
            maxbounds:{
                northEast: {
                        lat: 48.9,
                        lng: 2.4
                    },
                    southWest: {
                        lat: 48.82699921173368,
                        lng: 2.323224063349831
                    }
            },
            controls:{},
            paths:{},
            markers: {
                
                m2: {
                    lat:48.8678544,
                    lng: 2.3735535,
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;margin:0;padding:5px 0 15px 0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelgallery/logo-melanie-rio.jpeg" style="width:100px;height:100px;"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:14px;">galerie melanie Rio</div><div class="author" style="font-size:10px;">56 Rue de la Fontaine au Roi</div>'+
                                '</div>'+
                            '</div>',
                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    }
                },
                m4: {
                    lat: 48.8632791,
                    lng: 2.3627518,
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelgallery/logo_gc.png" style="width:120px;height:40px;"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:14px;">galerie Charlot</div><div class="author" style="font-size:10px;">47 rue Charlot</div>'+
                                '</div>'+
                            '</div>',
                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    }
                },
                m6: {
                    lat: 48.8606044,
                    lng: 2.3593464,
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelgallery/logo-gb-agency.png" style="width:120px;height:35px;"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:14px;">GB Agency Charlot</div><div class="author" style="font-size:10px;">18 rue des 4 Fils</div>'+
                                '</div>'+
                            '</div>',
                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    }
                }, 
                m7: {
                    lat: 48.8629227, 
                    lng: 2.3572046,
                    getMessageScope: function(){ return $scope;},
                    focus: false,
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelgallery/logo_christophegaillard.png" style="width:75px;height:80px;"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">galerie Christophe Gaillard</div><div class="author" style="font-size:10px;">5 rue Chapon</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    }
                }
            }
        });
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
            templateUrl:'../www/elem/special-footer.html'
        }    
    });

})();