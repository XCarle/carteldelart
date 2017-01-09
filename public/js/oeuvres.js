(function() {
    var app = angular.module('oeuvres', ['ngCookies', 'ngRoute', 'uuid', 'ui.bootstrap']);

	var sessionid;
	var expireDate = new Date();	
    
    app.controller('UserController', ['$http', '$scope', '$cookies', '$window', 'uuid', function($http, $scope, $cookies, $window, uuid) {
    	this.usermail;
		this.isRegistered = false+"";
		var inserted = 0;
		
		
		$scope.sizeFit = function(){
            if ($window.innerWidth < 768){
                return true;
            } else {
                return false;
            }
        };
        
		$scope.oeuvresTab = true;
		console.log($scope.oeuvresTab);
		
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
    }]);
   
    app.controller('ArticleController', ['$scope', '$filter', function($scope, $filter){
        
        $scope.nb = 4;
        $scope.showPlus = true;
        
        $scope.loadArticle = [
            {'name':'alberola', 'show':true},
            {'name':'laurentgrasso', 'show':true},
            {'name':'gonzaleztorres', 'show':true},
            {'name':'samba', 'show':true},
            {'name':'morellet', 'show':true},
            {'name':'long', 'show':true},
            {'name':'pistoletto', 'show':false},
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
        
        this.articles = ['alberola', 'laurentgrasso','gonzaleztorres','samba','morellet','long','pistoletto','shiota','boltanski','rondinone','prouvost','becher','sherman','balincourt','calle','weiwei','rama','dormino-glass', 'pignon-ernest','messager', 'hyman', 'tatah', 'goldin', 'jaar', 'veilhan', 'graham', 'hatoum', 'parreno', 'parr', 'fleury'];
        
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
