(function() {
    var app = angular.module('guidearchitecture', [ 'leaflet-directive' ]);
    
    var accessToken = 'pk.eyJ1IjoiY2FydGVsZGVsYXJ0IiwiYSI6ImNpaTh2NnhmZTAwMWp2emtvYXgzbWJqaDAifQ.b7PWfs663VOaL_JcmRJ65A';
    
    app.controller('GuideArchitectureMapController', [ '$scope', "leafletData", '$http', '$window', function($scope, leafletData, $http, $window) {
        
        $scope.guideTab = true;
        
        $scope.sizeFit = function(){
            if ($window.innerWidth < 768){
                return true;
            } else {
                return false;
            }
        };
        
        $scope.setFocus= function(i){
            console.log("$scope.setFocus", $scope);
            switch (i){
                case 1:
                    $scope.markers.m1.focus=true;
                    $scope.center.lat = $scope.markers.m1.lat;
                    $scope.center.lng = $scope.markers.m1.lng;
                    $scope.center.zoom = 13;
                    break;
                case 2:
                    $scope.markers.m2.focus=true;
                    $scope.center.lat = $scope.markers.m2.lat;
                    $scope.center.lng = $scope.markers.m2.lng;
                    $scope.center.zoom = 13;
                    break;
                case 3:
                    $scope.markers.m3.focus=true;
                    $scope.center.lat = $scope.markers.m3.lat;
                    $scope.center.lng = $scope.markers.m3.lng;
                    $scope.center.zoom = 13;
                    break;
                case 4:
                    $scope.markers.m4.focus=true;
                    $scope.center.lat = $scope.markers.m4.lat;
                    $scope.center.lng = $scope.markers.m4.lng;
                    $scope.center.zoom = 13;
                    break;
                case 5:
                    $scope.markers.m5.focus=true;
                    $scope.center.lat = $scope.markers.m5.lat;
                    $scope.center.lng = $scope.markers.m5.lng;
                    $scope.center.zoom = 13;
                    break;
                case 6:
                    $scope.markers.m6.focus=true;
                    $scope.center.lat = $scope.markers.m6.lat;
                    $scope.center.lng = $scope.markers.m6.lng;
                    $scope.center.zoom = 13;
                    break;
                case 7:
                    $scope.markers.m7.focus=true;
                    $scope.center.lat = $scope.markers.m7.lat;
                    $scope.center.lng = $scope.markers.m7.lng;
                    $scope.center.zoom = 13;
                    break;
                case 8:
                    $scope.markers.m8.focus=true;
                    $scope.center.lat = $scope.markers.m8.lat;
                    $scope.center.lng = $scope.markers.m8.lng;
                    $scope.center.zoom = 13;
                    break;
                case 9:
                    $scope.markers.m9.focus=true;
                    $scope.center.lat = $scope.markers.m9.lat;
                    $scope.center.lng = $scope.markers.m9.lng;
                    $scope.center.zoom = 13;
                    break;
                case 10:
                    $scope.markers.m10.focus=true;
                    $scope.center.lat = $scope.markers.m10.lat;
                    $scope.center.lng = $scope.markers.m10.lng;
                    $scope.center.zoom = 13;
                    break;
                case 11:
                    $scope.markers.m11.focus=true;
                    $scope.center.lat = $scope.markers.m11.lat;
                    $scope.center.lng = $scope.markers.m11.lng;
                    $scope.center.zoom = 13;
                    break;
                case 12:
                    $scope.markers.m12.focus=true;
                    $scope.center.lat = $scope.markers.m12.lat;
                    $scope.center.lng = $scope.markers.m12.lng;
                    $scope.center.zoom = 13;
                    break;
                case 13:
                    $scope.markers.m13.focus=true;
                    $scope.center.lat = $scope.markers.m13.lat;
                    $scope.center.lng = $scope.markers.m13.lng;
                    $scope.center.zoom = 13;
                    break;
            }         
        };
        
        angular.extend($scope, {
            defaults:{
                minZoom:10,
                scrollWheelZoom:false
            },
            tiles:{ 
                url: 'https://api.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=' + accessToken
            },
            center: {
                    lat:48.8678544,
                    lng: 2.3735535,
                    zoom:11
                },
            controls:{
                scale:true,
                custom:[
                    L.control.locate({ position:'topright', 
                                keepCurrentZoomLevel:false, 
                                remainActive:false,
                                showPopup:false,
                                follow: false })
                ]
            },
            paths:{},
            markers: {
                
                m1: {
                    lat:48.8678544,
                    lng: 2.3735535,
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;margin:0;padding:5px 0 15px 0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/1_etquelquesespacements.png" style="width:100%"><img>'+
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
                    },
                    label: {
                        message: "1",
                        options: {
                            noHide: true
                        }
                    }
                },
                m12: {
                    lat: 48.8702381,
                    lng: 2.3114667,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/12_richard_serra_ramble_drawing.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">galerie Gagosian</div><div class="author" style="font-size:10px;">4 rue de Ponthieu, 75008 Paris</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "8",
                        options: {
                            noHide: true
                        }
                    }
                },
                m2: {
                    lat: 48.8585362,
                    lng: 2.3575578,
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/2_espacel-libre_lagaleriedarchitecture.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:14px;">La Galerie d'+"'Architecture"+'</div><div class="author" style="font-size:10px;">11 rue des blancs manteaux - 75004 Paris</div>'+
                                '</div>'+
                            '</div>',
                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "6",
                        options: {
                            noHide: true
                        }
                    }
                },
                m4: {
                    lat: 48.8594994,
                    lng: 2.3666315,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/4_solo-galerie-bijoy_jain_01.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">Solo galerie</div><div class="author" style="font-size:10px;">11 rue des Arquebusiers, 75003 Paris</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "4",
                        options: {
                            noHide: true
                        }
                    }
                },
                m5: {
                    lat: 48.8729957,
                    lng: 2.2987621,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/5_maison-danemark-petit-expo.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">Maison du Danemark</div><div class="author" style="font-size:10px;">142 Avenue des Champs-Élysées, 75008 Paris</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "9",
                        options: {
                            noHide: true
                        }
                    }
                },
                m6: {
                    lat: 48.8777099,
                    lng:  2.3857575,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/6_frac-leplateau-idf.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">Le Plateau - FRAC Ile-de-France</div><div class="author" style="font-size:10px;">22 rue des Alouettes - 75019 Paris</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "10",
                        options: {
                            noHide: true
                        }
                    }
                },
                m7: {
                    lat: 48.860372,
                    lng: 2.3531723,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/7_larissa-fassler_jerome-poggi.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">Galerie Jérôme Poggi</div><div class="author" style="font-size:10px;">2 rue Beaubourg, 75004 Paris</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "7",
                        options: {
                            noHide: true
                        }
                    }
                },
                m10: {
                    lat: 48.860271,
                    lng: 2.3666769,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/10_jousse_entreprise_rometti_costales_worn.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">Jousse Entreprise</div><div class="author" style="font-size:10px;">6 rue Saint-Claude, 75003 Paris</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "3",
                        options: {
                            noHide: true
                        }
                    }
                },
                m3: {
                    lat: 48.8602861,
                    lng: 2.3665058,
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/3_Alexander-Apostol_Think-Blue_mor-charpentier.png" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:14px;">mor charpentier</div><div class="author" style="font-size:10px;">8 Rue Saint-Claude, 75003 Paris</div>'+
                                '</div>'+
                            '</div>',
                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "2",
                        options: {
                            noHide: true
                        }
                    }
                },
                m11: {
                    lat: 48.8262233,
                    lng: 2.3844779,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelarticles/laurent-grasso-solarwind.png" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">Ivry - Silos Calcia</div><div class="author" style="font-size:10px;">25 quai d’Ivry, 75013 Paris</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "11",
                        options: {
                            noHide: true
                        }
                    }
                },
                m8: {
                    lat: 48.8019267,
                    lng: 2.1268266,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/8_yves_buraud_la-marechalerie.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">La Maréchalerie</div><div class="author" style="font-size:10px;">5 avenue de Sceaux, 78000 Versailles</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "12",
                        options: {
                            noHide: true
                        }
                    }
                },
                m9: {
                    lat: 49.047182,
                    lng:  2.1133341,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/9_maubuisson_abbaye_fleurie.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">Abbaye de Maubuisson</div><div class="author" style="font-size:10px;">5, avenue de Sceaux, 78000 Versailles</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "13",
                        options: {
                            noHide: true
                        }
                    }
                },
                m13: {
                    lat: 48.8600782,
                    lng: 2.3626338,
                    getMessageScope: function(){ return $scope;},
                    message:'<div class="row" style="text-align:center;">'+
                                '<div class="col-xs-6" style="width:150px;padding:5px 0 15px 0;;margin:0;">'+
                                    '<img src="https://s3.eu-central-1.amazonaws.com/cartelparcours/fevrier-2016/searching_for_Identity-zinsmeister.jpg" style="width:100%"><img>'+
                                '</div>'+
                                '<div class="col-xs-6" style="width:150px;padding:0;margin:0;">'+
                                    '<div class="title" style="font-size:12px;">Galerie NMariño</div><div class="author" style="font-size:10px;">8 rue des Coutures Saint Gervais - 75003 Paris</div>'+
                                '</div>'+
                            '</div>',

                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'icongalerie',
                        iconAnchor:  [5, 5]
                    },
                    label: {
                        message: "5",
                        options: {
                            noHide: true
                        }
                    }
                }
            }
        });
    }]);
    
    // DIRECTIVE pour le chargement des images au click du thumbnail
	// clickThumbnail
   	app.directive("goToMap", function(){
   	
   		$.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    	}
    	
    	return function (scope, element, attr){	
   			element.bind("click", function(){
    	        $('#map').goTo();
    	    });
    	};
    });
    	
    
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