(function() {
    var app = angular.module('home', ['ngCookies', 'ngRoute', 'uuid', 'ui.bootstrap',  'leaflet-directive']);

	var sessionid;
	var expireDate = new Date();	
    var accessToken = 'pk.eyJ1IjoiY2FydGVsZGVsYXJ0IiwiYSI6ImNpaTh2NnhmZTAwMWp2emtvYXgzbWJqaDAifQ.b7PWfs663VOaL_JcmRJ65A';
    
    
    
    app.controller('UserController', ['$http', '$scope', '$cookies', '$window', 'uuid', function($http, $scope, $cookies, $window, uuid) {
    	this.usermail;
		this.isRegistered = false+"";
		var inserted = 0;
		
		expireDate = new Date();
 		expireDate.setDate(expireDate.getDate()+300);
    	if ($cookies.get('uuid')==undefined){
    		if (sessionid == undefined) sessionid = uuid.new();
    		$cookies.put('uuid', sessionid, {expires:expireDate});
    	}
    	else{
    		sessionid = $cookies.get('uuid');
    	}
    	
    	if ($cookies.get('isRegistered') == undefined){
    		$cookies.put('isRegistered', false, {'expires':expireDate});
    	}else{
    		this.isRegistered = $cookies.get('isRegistered');
    	}
    	    	
    	this.updateUser = function(){
    		if ((this.usermail+"").length == 0){
    			return;
    		} 
    		
    		var browser = $window.navigator.userAgent;
			expireDate = new Date();
	 		expireDate.setDate(expireDate.getDate()+300);
			
			if ($cookies.get('uuid')==undefined){
    			if (sessionid == undefined) sessionid = uuid.new();
    			$cookies.put('uuid', sessionid, {'expires':expireDate});
    		}
    		else{
				sessionid = $cookies.get('uuid');
    			$cookies.put('uuid', sessionid, {'expires':expireDate});
    		}
			
			expireDate = new Date();
	 		expireDate.setDate(expireDate.getDate()+300);
			$cookies.put('isRegistered',true, {'expires':expireDate});	
      		this.isRegistered = true+"";
      		
    		if ((browser+"").length < 500 && (this.usermail+"").length < 320 && this.usermail != "undefined"){
    			$http({method: 'POST', url: '/user?mail='+this.usermail+'&session='+sessionid+'&lang='+"fr"+'&ua='+browser+""})
    			.success(function(data, status, header, config){
    			}).error(function(data, status, header, config){
				}).then(function(httpData){
					if(httpData.statusText == "OK"){
						expireDate = new Date();
	 					expireDate.setDate(expireDate.getDate()+300);
						$cookies.put('isRegistered',true, {'expires':expireDate});
					}
      			});
      		}
    	};
    	
    	this.isUserRegistered = function(){
    		if(this.isRegistered == (true+"")){return true;} else { return false;}
    	}
    	
    	$scope.sizeFit = function(){
            if ($window.innerWidth < 768){
                return true;
            } else {
                return false;
            }
        }
    }]);
   
    app.controller('ArticleController', ['$scope', '$filter', function($scope, $filter){
        
        $scope.nb = 4;
        $scope.showPlus = true;
        
        $scope.loadArticle = [
            {'name':'alberola', 'show':true},
            {'name':'laurentgrasso', 'show':true},
            {'name':'gonzaleztorres', 'show':true},
            {'name':'samba', 'show':true},
            {'name':'morellet', 'show':false},
            {'name':'long', 'show':false},
            {'name':'pistoletto', 'show':true},
            {'name':'shiota', 'show':false},
            {'name':'boltanski', 'show':false},
            {'name':'rondinone', 'show':false},
            {'name':'prouvost', 'show':false},
            {'name':'becher', 'show':false},
            {'name':'sherman', 'show':false}, 
            {'name':'balincourt', 'show':false}, 
            {'name':'calle', 'show':false}, 
            {'name':'weiwei', 'show':false},
            {'name':'rama', 'show':false},
            {'name':'dormino-glass', 'show':false}, 
            {'name':'pignon-ernest', 'show':false},
            {'name':'messager', 'show':false}, 
            {'name':'hyman', 'show':false}, 
            {'name':'tatah', 'show':false}, 
            {'name':'goldin', 'show':false}, 
            {'name':'jaar', 'show':false}, 
            {'name':'veilhan', 'show':false}, 
            {'name':'graham', 'show':false}, 
            {'name':'hatoum', 'show':false}, 
            {'name':'parreno', 'show':false}, 
            {'name':'parr', 'show':false}, 
            {'name':'fleury', 'show':false
        }];
        
        $scope.findArticle = function(theArticle){
            for (var i = 0; i < $scope.loadArticle.length; i++){
                if ($scope.loadArticle[i].name == theArticle)
                    return $scope.loadArticle[i].show;
            }
        }
        
        this.articles = ['alberola',
                        'laurentgrasso', 
                        'gonzaleztorres',
                        'samba',
                        'morellet',
                        'long',
                        'pistoletto',
                        'shiota',
                        'boltanski',
                        'rondinone',
                        'prouvost',
                        'becher',
                        'sherman',
                        'balincourt',
                        'calle',
                        'weiwei',
                        'rama',
                        'dormino-glass',
                        'pignon-ernest',
                        'messager', 
                        'hyman', 
                        'tatah', 
                        'goldin',
                        'jaar', 
                        'veilhan', 
                        'graham', 
                        'hatoum', 
                        'parreno', 
                        'parr', 
                        'fleury'];
        
        this.showArticle = function(articleTitle){
            for (var i = 0; i < $scope.nb;i ++){
                if (this.articles[i] == articleTitle){
                    return true;
                }
            }
            return false;
        }
        
        this.showMore = function(){
            for (var i = $scope.nb; i < Math.min($scope.nb+4, $scope.loadArticle.length) ;i++){
                $scope.loadArticle[i].show = true;
            }
            //console.log($scope.loadArticle);
            $scope.nb = $scope.nb + 4; 
            if ($scope.nb >= this.articles.length){
                $scope.showPlus = false;
            }
        }
        
    }]);
    
    app.controller('AgendaController', ['$scope', '$filter', '$http' , function($scope, $filter, $http) {
        
        var agenda = this;
    	agenda.evenements = [];
        agenda.calendar = [];
        
        $scope.dateW = new Date();
        $scope.dateF = new Date($scope.dateW.getTime()+10*(60*60*24) * 1000)
        
        $scope.showY = false;
        $scope.showM = false;
        $scope.showD = false;
        
        $scope.M = ['Tous', 'Jan.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Jui.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
        $scope.Y = ['2015', '2016'];
        $scope.D = ['Tous','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

        $scope.allM = false;
        $scope.allD = false;
        
        $scope.agendaMsg = "";
        
        $scope.getEvents = function(date_debut, date_fin){
            $http({method: 'GET', url:'/agenda.json?date_debut='+date_debut
                                                +"&date_fin="+date_fin
            })
            .success(function(data){
                agenda.evenements = data;
                if (data.length == 0){
                    $scope.agendaMsg = "Aucun évènement dans la période du "+$filter('date')(new Date(date_debut), 'dd/MM/yyyy')+" au "+$filter('date')(new Date(date_fin), 'dd/MM/yyyy');
                } else {
                    $scope.agendaMsg = "";
                }
                // effectuer les traitements
                // associer une liste de date avec les elements de la liste.
            })
            .error(function(data, status, header, config){
      			//console.log("error");
			})
			.then(function(httpData){
				if(httpData.statusText == "OK"){
				}
      		});
        }
        
        $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate(), $scope.dateF.getFullYear()+"-"+($scope.dateF.getMonth()+1)+"-"+$scope.dateF.getDate());
        
        var transformD = function(value){
            if (value == 31){
                if ($scope.D.length == 32) return;
                if ($scope.D.length == 31) $scope.D.push('31');
                if ($scope.D.length == 29) $scope.D.push('29', '30', '31');
                if ($scope.D.length == 30) $scope.D.push('30', '31');
            } else if (value == 30){
                if ($scope.D.length == 31) return;
                if ($scope.D.length == 32) $scope.D.splice(31, 1);
                if ($scope.D.length == 30) $scope.D.push('30');
                if ($scope.D.length == 29) $scope.D.push('29', '30');
            } else if (value == 28){
                if ($scope.D.length == 29) return;
                if ($scope.D.length == 30) $scope.D.splice(29,1);
                if ($scope.D.length == 31) $scope.D.splice(29,2);
                if ($scope.D.length == 32) $scope.D.splice(29,3);
            } else if (value == 29){
                if ($scope.D.length == 29) $scope.D.push('29');
                if ($scope.D.length == 30) return;
                if ($scope.D.length == 31) $scope.D.splice(30,1);
                if ($scope.D.length == 32) $scope.D.splice(30,2);
            }
        }
        
        this.clickY = function(){
            $scope.showY = !$scope.showY;
            
            if ($scope.showM) $scope.showM=false;
            if ($scope.showD) $scope.showD=false;
        };
        
        this.clickM = function(){
            $scope.showM = !$scope.showM;
            
            if ($scope.showY) $scope.showY=false;
            if ($scope.showD) $scope.showD=false;
        };
        
        this.clickD = function(){
            $scope.showD = !$scope.showD;
            
            if ($scope.showY) $scope.showY = false;
            if ($scope.showM) $scope.showM = false;
        };
        
        this.selectY = function(Y){
            $scope.dateW.setFullYear(Y);
            
            if (Y == 2016){
                if ($scope.dateW.getMonth() == 1) transformD(29);
            } else {
                if ($scope.dateW.getMonth() == 1) transformD(28);
            }
            
            if ($scope.allM){
                $scope.getEvents($scope.dateW.getFullYear()+"-01-01", ($scope.dateW.getFullYear()+1)+"-01-01");
            } else if ($scope.allD){
                $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-01", $scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.D[$scope.D.length-1]);
            }else {
                $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate(), $scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate());
            }
        }
        
        this.selectM = function(M){
            if (M == "Tous"){
                $scope.allM = true;
                $scope.allD = true;
                $scope.getEvents($scope.dateW.getFullYear()+"-01-01", ($scope.dateW.getFullYear()+1)+"-01-01");
            }else {
                $scope.allM = false;
                for (var i = 1; i < $scope.M.length; i++){
                    if ($scope.M[i] == M){
                        $scope.dateW.setMonth(i-1);
                        if ( (i == 1) || (i==3)  || (i==5)  || (i==7)  || (i==8)  || (i==10) || (i==12)) {transformD(31);}
                        else if ( (i == 4) || (i==6)  || (i==9)  || (i==11)) {transformD(30);}
                        else if ( (i == 2)) { if ($scope.dateW.getFullYear() == 2016) {transformD(29);}else {transformD(28)}}
                        break;
                    }
                }
                if ($scope.allD){
                    $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-01", $scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.D[$scope.D.length-1]);
                } else {
                    $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate(), $scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate());
                }
            }
        }
        
        this.selectD = function(D){
            if (D == "Tous"){
                $scope.allD = true;
                $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-01", $scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-31");
            }else {
                $scope.allD = false;
                $scope.dateW.setDate(D);
                if ($scope.allM){
                    $scope.dateW.setMonth((new Date()).getMonth());
                    $scope.allM = false;
                }
                $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate(), $scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate());
            }
        }
        
    }]);
    
    app.controller('GalerieMapController', [ '$scope', "leafletData", "leafletMapEvents", '$http', '$window', function($scope, leafletData, leafletMapEvents, $http, $window) {
        
        $scope.galeriesTab = true;
        
        $scope.clickMap = function(){
            console.log("map clicked");
        }
        
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
                        lat: 48.93,
                        lng: 2.4
                    },
                    southWest: {
                        lat: 48.82399921173368,
                        lng: 2.323224063349831
                    }
            },
            controls:{},
            paths:{},
            markers: {
                g1: {
                    lat:48.8678544,
                    lng: 2.3735535,
                    group:"galeries",
                    label: {
                        message:"galerie melanie Rio",
                    },
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
                g2: {
                    lat: 48.8632791,
                    lng: 2.3627518,
                    group:"galeries",
                    label: {
                        message:"galerie Charlot",
                    },
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
                g3: {
                    lat: 48.8606044,
                    lng: 2.3593464,
                    group:"galeries",
                    label: {
                        message:"GB Agency",
                    },
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
                g4: {
                    lat: 48.8629227, 
                    lng: 2.3572046,
                    group:"galeries",
                    label: {
                        message:"galerie Christophe Gaillard",
                    },
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
                },
                c1:{
                    lat:48.8902482,
                    lng:2.3700804,
                    group:"chroniques",
                    label:{
                        message:"centquatre Paris"
                    },
                    message:
                        '<div class="row" style="text-align:center;">'+
                            '<div class="col-xs-6" style="width:200px;padding:5px 0 5px 0;;margin:0;">'+
                                '<img src="https://s3.eu-central-1.amazonaws.com/cartelexposition/prosopopee/prosopopees-inferno-bill-vorn-louis-philippe.jpeg" style="width:150px;height:100px;"><img>'+
                            '</div>'+
                            '<div class="col-xs-6" style="width:200px;padding:0;margin:0;">'+
                                '<div class="title" style="font-size:12px;"> Avec prosopopée, le 104 destabilise notre vision des choses</div>'+
                                '<div class="author" style="font-size:11px;paddin-bottom:2px;">Centquatre Paris - 5 Rue Curial</div>'+
                                '<div class="title" style="font-size:11px;"> <a class="btn btn-lg btn-primary" href="/exposition/prosopopee-le-centquatre-destabilise-notre-vision-des-choses" role="button" style="margin-top:5px;padding:5px 15px;font-size:13px;line-height:14px;background-color:#29374C;color:white;">Lire la chronique</a></div>'+
                            '</div>'+
                        '</div>',
                    icon:{
                        type: 'div',
                        iconSize: [10, 10],
                        className: 'iconchronique',
                        iconAnchor:  [5, 5]
                    }
                }
            },
        
        });
    }]);
    
    app.directive('carousel', [function() {
        return {

        };
    }]);
    
    app.directive('setSize1', function(){
        return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				 
				 var imageTmp = new Image();
				 
				 imageTmp.onload = function(){
                    
                     var h = 380;
                     var w = 560;
                 
                     document.getElementById("first-image").style.width = w+"px";
                     document.getElementById("first-image").style.height = h+"px";
                     document.getElementById("first-image").src = imageTmp.src;
                    }
                imageTmp.src = "https://s3.eu-central-1.amazonaws.com/cartelexposition/prosopopee/prosopopees-inferno-bill-vorn-louis-philippe.jpeg";
   			});
		}
    
    });
    
     app.directive('setSize2', function(){
        return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				 
				 var imageTmp = new Image();
				 
				 imageTmp.onload = function(){
                    
                     var h = 450;
                     var w = 338;
                 
                     document.getElementById("second-image").style.width = w+"px";
                     document.getElementById("second-image").style.height = h+"px";
                     document.getElementById("second-image").src = imageTmp.src;
                    }
                imageTmp.src = "https://s3.eu-central-1.amazonaws.com/cartelarticles/felix-gonzalez-torres.png";
   			});
		}
    
    });
    
     app.directive('setSize3', function(){
        return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				 
				 var imageTmp = new Image();
				 
				 imageTmp.onload = function(){
                    
                     var h = 450;
                     var w = 480;
                 
                     document.getElementById("third-image").style.width = w+"px";
                     document.getElementById("third-image").style.height = h+"px";
                     document.getElementById("third-image").src = imageTmp.src;
                    }
                imageTmp.src = "https://s3.eu-central-1.amazonaws.com/cartelarticles/agenda-cartel.png"; 
   			});
		}
    
    });  
    
    
	app.directive('ngEnter', function () {
    	return function (scope, element, attrs) {
    	    element.bind("keydown keypress", function (event) {
    	        if(event.which === 13) {
    	            scope.$apply(function (){
    	                scope.$eval(attrs.ngEnter);
    	            });
	
	                event.preventDefault();
	            }
	        });
	    };
	});
	
	// dormino glass
    app.directive("dorminoGlass", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('dormino-glass')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    //console.log("dorminoGlass");
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/davide-dormino-charles-glass-anything-to-say.png";
                    var thumbnail_canvas = document.createElement('canvas');
                
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.width=868;
                    imageTmp.height=732;
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        //console.log("dorminoGlass loaded");
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 109, 0, 731, 731, 0, 0, 150, size);
                        document.getElementById("dormino-glass").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
		            
		        });
		    }], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
    
    // fleury
    app.directive("fleury", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('fleury')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    //console.log("fleury");
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/sylvie-fleurie-tableau-1.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                    //console.log(thumbnail_canvas.getContext('2d'));
                
                    var imageTmp = new Image();
                    imageTmp.width=688;
                    imageTmp.height=911;
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                    //console.log("fleury loaded");
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 109, 688, 688, 0, 0, 150, 150);
                    
                        var mpImg = new MegaPixImage(imageTmp);
                        mpImg.render(thumbnail_canvas, {maxWidth: 150, quality: 1 , crop:true});
                    
                        document.getElementById("fleury").style.backgroundRepeat= "no-repeat";
                        document.getElementById("fleury").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    
                    }
                    imageTmp.src = myUrl;
                });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	// parr
	app.directive("parr", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('parr')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			//console.log("parr ");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/martin-parr-floride.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				//console.log("parr loaded");
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 159, 0, 641, 641, 0, 0, 150, 150);
					document.getElementById("parr").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	// parreno
	app.directive("parreno", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('parreno')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			    //console.log("parreno");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/philippe-parreno-sans-titre.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    //console.log("parreno loaded");
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 114, 685, 685, 0, 0, 150, 150);
					document.getElementById("parreno").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	// hatoum
	app.directive("hatoum", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('hatoum')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			    //console.log("hatoum");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/mona-hatoum-cellules.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				thumbnail_canvas.style.width = "150px";
				thumbnail_canvas.style.height = "150px";
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    //console.log("hatoum loaded");
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 160, 0, 640, 640, 0, 0, 150, 150);
					document.getElementById("hatoum").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("graham", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('graham')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    //console.log("graham : ");
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/dan-graham-tight-squeeze.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    var sizeGraham = 150*window.devicePixelRatio;
                    
                    thumbnail_canvas.width = sizeGraham;
                    thumbnail_canvas.height = sizeGraham;

                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 242, 0, 558, 558, 0, 0, 150, 150);
                        document.getElementById("graham").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
               });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("veilhan", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('veilhan')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			    //console.log("veilhan");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/xavier-veilhan-le-carrosse.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    //console.log("veilhan loaded");
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 136.5, 0, 663, 663, 0, 0, 150, size);
					document.getElementById("veilhan").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("jaar", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('jaar')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			    //console.log("jarr");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/alfredo-jaar-Culture-=-Capital.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				thumbnail_canvas.style.width = "150px";
				thumbnail_canvas.style.height = "150px";
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    //console.log("jaar loaded");
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 44, 0, 723, 723, 0, 0, 150, size);
					document.getElementById("jaar").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("goldin", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('goldin')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			    //console.log("goldin");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/nan-goldin-nan-and-brian-in-bed.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    //console.log("goldin loaded");
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 272, 0, 647, 647, 0, 0, 150, size);
					document.getElementById("goldin").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("tatah", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('tatah')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			    //console.log("tatah");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/djamel-tatah-sans-titre.png";
				var thumbnail_canvas = document.createElement('canvas');
                var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				thumbnail_canvas.style.width = "150px";
				thumbnail_canvas.style.height = "150px";
                //console.log(thumbnail_canvas.getContext('2d'));
                
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    //console.log("tatah loaded");
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 342, 564, 564, 0, 0, 150, 150);
					document.getElementById("tatah").style.backgroundHeight=size+"px";
					document.getElementById("tatah").style.backgroundWidth=size+"px";
					document.getElementById("tatah").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("hyman", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('hyman')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			    //console.log("hyman");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/jonathan-hyman-all-gave-some-some-gave-all-manhattan.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    //console.log("loaded");
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 638, 638, 0, 0, 150, 150);
					document.getElementById("hyman").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("messager", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('messager')", function(newValue, OldValue, scope){
		            if (!newValue) return;
			    //console.log("messager");
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/annette-messager-la-lune-crayon-1.png";
				var thumbnail_canvas = document.createElement('canvas');
				var tmpC = document.createElement('canvas');
				
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				tmpC.width=size;
				tmpC.height=size;
				
                tmpC.style.width="150px";
                tmpC.style.height="150px";				

				var imageTmp = new Image();
			    imageTmp.width=686;
				imageTmp.height=914;
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    //console.log("messager loaded");
				    //tmpC.getContext('2d').drawImage(imageTmp, 0, 0, 794, 794, 0, 0, size, size);
				    var mpImg = new MegaPixImage(imageTmp);
				    mpImg.render(tmpC, { maxWidth: 150, maxHeight: 150, quality: 1, crop:true });
				    
				    //thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 60, 686, 686, 0, 0, size, size);
					
					document.getElementById("messager").style.backgroundImage = "url("+tmpC.toDataURL()+")";
					document.getElementById("messager").style.backgroundRepeat = "no-repeat";
					//document.getElementById("messager").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("pignonErnest", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('pignon-ernest')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    //console.log("pignon ernest : ");
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/ernest-pignon-ernest-pasolini.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        //console.log("pignon ernest loaded");
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 224, 0, 576, 576, 0, 0, 150, 150);
                        document.getElementById("pignon-ernest").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});

    app.directive("rama", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('rama')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    //console.log("rama : ");
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/carol-rama-isola-degli-occhi.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        //console.log("pignon ernest loaded");
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 115, 0, 685, 685, 0, 0, 150, size);
                        document.getElementById("rama").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("weiweiForeverBicycles", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('weiwei')", function(newValue, OldValue, scope){
		            if (!newValue) return;
		            //console.log("ai weiwei");
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/ai_weiwei_forever_bicycles.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        //console.log("ai weiwei loaded");
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 640, 640, 0, 0, 150, 150);
                        document.getElementById("weiwei-forever-bicycles").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("callePrenezSoinDeVous", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('calle')", function(newValue, OldValue, scope){
		            if (!newValue) return;
		            //console.log("calle");
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/sophie-calle-prenez-soin-de-vous.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 686, 686, 0, 0, 150, 150);
                        document.getElementById("calle-prenez-soin-de-vous").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("sherman", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('sherman')", function(newValue, OldValue, scope){
		            if (!newValue) return;
		            //console.log("sherman");
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/sherman-untitled-2008.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 712, 712, 0, 0, 150, 150);
                        document.getElementById("sherman").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("balincourt", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('balincourt')", function(newValue, OldValue, scope){
		            if (!newValue) return;
		            //console.log("balincourt");
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/balincourt-as-far-as-we-could-go.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 120, 640, 640, 0, 0, 150, 150);
                        document.getElementById("balincourt").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("becher", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('becher')", function(newValue, OldValue, scope){
		            if (!newValue) return;
		            //console.log("becher");
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/becher-chateau-d-eau.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 711, 711, 0, 0, 150, 150);
                        document.getElementById("becher").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("prouvost", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('prouvost')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/prouvost-the-smocking-image.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 130, 0, 670, 670, 0, 0, 150, size);
                        document.getElementById("prouvost").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("rondinone", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('rondinone')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/ugo_rondinone_love.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                    console.log(size);
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 160, 0, 640, 640, 0, 0, 150, size);
                        document.getElementById("rondinone").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("boltanski", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('boltanski')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/christian-boltanski-animitas.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                    console.log(size);
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 192, 0, 607, 607, 0, 0, 150, size);
                        document.getElementById("boltanski").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
		
	app.directive("shiota", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('shiota')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/chiharu_shiota.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                    console.log(size);
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 114, 685, 685, 0, 0, 150, size);
                        document.getElementById("shiota").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
	app.directive("pistoletto", function(){
		return {
		    retrict : 'A', 
		    controller:['$scope', function($scope){
		        $scope.$watch("findArticle('shiota')", function(newValue, OldValue, scope){
		            if (!newValue) return;
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/pistoletto.jpg";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                    console.log(size);
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                    
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                    
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 124, 0, 676, 676, 0, 0, 150, size);
                        document.getElementById("pistoletto").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                 });
   			}], 
		    link:function(scope,element){
		        element.bind("click", function(){
		        });
		    }
		}
	});
	
    app.directive("long", function(){
        return {
            retrict : 'A', 
            controller:['$scope', function($scope){
                $scope.$watch("findArticle('long')", function(newValue, OldValue, scope){
                    if (!newValue) return;
                        
                        var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/richard_long_circleinantarctica.jpg";
                        var thumbnail_canvas = document.createElement('canvas');
                
                        var size = 150*window.devicePixelRatio;
                        console.log(size);
                        thumbnail_canvas.width = size;
                        thumbnail_canvas.height = size;
                
                        var imageTmp = new Image();
                        imageTmp.crossOrigin = "Anonymous";
                
                        imageTmp.onload = function(){
                            thumbnail_canvas.getContext('2d').drawImage(imageTmp, 201, 0, 639, 639, 0, 0, 150, size);
                            document.getElementById("long").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                            console.log("long");
                        }
                        imageTmp.src = myUrl;
                    });
                }], 
                link:function(scope,element){
                    element.bind("click", function(){
                    });
                }
        }
    });
	
	app.directive("morellet", function(){
        return {
            retrict : 'A', 
            controller:['$scope', function($scope){
                $scope.$watch("findArticle('morellet')", function(newValue, OldValue, scope){
                    if (!newValue) return;
                        
                        var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/francois_morellet_schema.png";
                        var thumbnail_canvas = document.createElement('canvas');
                    
                        var size = 150*window.devicePixelRatio;
                        console.log(size);
                        thumbnail_canvas.width = size;
                        thumbnail_canvas.height = size;
                    
                        var imageTmp = new Image();
                        imageTmp.crossOrigin = "Anonymous";
                    
                        imageTmp.onload = function(){
                            thumbnail_canvas.getContext('2d').drawImage(imageTmp, 185, 0, 615, 615, 0, 0, 150, size);
                            document.getElementById("morellet").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                        }
                        imageTmp.src = myUrl;
                    });
                }], 
                link:function(scope,element){
                    element.bind("click", function(){
                    });
                }
        }
    });
	
	app.directive("samba", function(){
        return {
            retrict : 'A', 
            controller:['$scope', function($scope){
                $scope.$watch("findArticle('samba')", function(newValue, OldValue, scope){
                    if (!newValue) return;
                        
                        var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/cheri_samba_fondation_cartier.jpg";
                        var thumbnail_canvas = document.createElement('canvas');
                    
                        var size = 150*window.devicePixelRatio;
                        thumbnail_canvas.width = size;
                        thumbnail_canvas.height = size;
                    
                        var imageTmp = new Image();
                        imageTmp.crossOrigin = "Anonymous";
                    
                        imageTmp.onload = function(){
                            thumbnail_canvas.getContext('2d').drawImage(imageTmp, 159, 0, 641, 641, 0, 0, 150, size);
                            document.getElementById("samba").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                        }
                        imageTmp.src = myUrl;
                    });
                }], 
                link:function(scope,element){
                    element.bind("click", function(){
                    });
                }
        }
    });
	
	
	app.directive("gonzaleztorres", function(){
        return {
            retrict : 'A', 
            controller:['$scope', function($scope){
                $scope.$watch("findArticle('gonzaleztorres')", function(newValue, OldValue, scope){
                    if (!newValue) return;
                    
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/felix-gonzalez-torres.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                    
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                    
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 685, 685, 0, 0, 150, size);
                        document.getElementById("gonzaleztorres").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });   
            }], 
            link:function(scope,element){
                element.bind("click", function(){
                });
            }
        }
    });
    
    app.directive("laurentgrasso", function(){
        return {
            retrict : 'A', 
            controller:['$scope', function($scope){
                $scope.$watch("findArticle('laurentgrasso')", function(newValue, OldValue, scope){
                    if (!newValue) return;
                    
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/laurent-grasso-solarwind.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                    
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                    
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 40, 0, 640, 640, 0, 0, 150, size);
                        document.getElementById("laurentgrasso").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });   
            }], 
            link:function(scope,element){
                element.bind("click", function(){
                });
            }
        }
    });
	
	app.directive("alberola", function(){
        return {
            retrict : 'A', 
            controller:['$scope', function($scope){
                $scope.$watch("findArticle('alberola')", function(newValue, OldValue, scope){
                    console.log("alberola , ", newValue);
                    if (!newValue) return;
                    
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/alberola_pdt.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                    
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                    
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 685, 685, 0, 0, 150, size);
                        document.getElementById("alberola").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
	            });   
            }], 
            link:function(scope,element){
                element.bind("click", function(){
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
    
    app.directive("cartelFooter", function (){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/footer.html'
        }    
    });
    
	app.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true; delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
})();
