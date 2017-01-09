(function() {
    var app = angular.module('cartel', []);


    app.directive("shiota", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
    app.directive("dorminoGlass", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
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
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 109, 0, 731, 731, 0, 0, 150, size);
					document.getElementById("dormino-glass").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	}); 
    
    app.directive("fleury", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/sylvie-fleurie-tableau-1.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 109, 688, 688, 0, 0, 150, 150);
				    
				    document.getElementById("fleury").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
					
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("parr", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/martin-parr-floride.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 159, 0, 641, 641, 0, 0, 150, 150);
					document.getElementById("parr").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("parreno", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/philippe-parreno-sans-titre.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 114, 685, 685, 0, 0, 150, 150);
					document.getElementById("parreno").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("hatoum", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
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
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 160, 0, 640, 640, 0, 0, 150, 150);
					document.getElementById("hatoum").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("graham", function(){
		return function(scope, element){
                angular.element(document).ready(function(){
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
		    }
	});
	
	app.directive("veilhan", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/xavier-veilhan-le-carrosse.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 136.5, 0, 663, 663, 0, 0, 150, size);
					document.getElementById("veilhan").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("jaar", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
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
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 44, 0, 723, 723, 0, 0, 150, size);
					document.getElementById("jaar").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("goldin", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/nan-goldin-nan-and-brian-in-bed.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 272, 0, 647, 647, 0, 0, 150, size);
					document.getElementById("goldin").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("tatah", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/djamel-tatah-sans-titre.png";
				var thumbnail_canvas = document.createElement('canvas');
                var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				thumbnail_canvas.style.width = "150px";
				thumbnail_canvas.style.height = "150px";
                
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 342, 564, 564, 0, 0, 150, 150);
					document.getElementById("tatah").style.backgroundHeight=size+"px";
					document.getElementById("tatah").style.backgroundWidth=size+"px";
					document.getElementById("tatah").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("hyman", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/jonathan-hyman-all-gave-some-some-gave-all-manhattan.png";
				var thumbnail_canvas = document.createElement('canvas');
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 638, 638, 0, 0, 150, 150);
					document.getElementById("hyman").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("messager", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/annette-messager-la-lune-crayon-1.png";
				var thumbnail_canvas = document.createElement('canvas');
				
				var size = 150*window.devicePixelRatio;
				
				thumbnail_canvas.width = size;
				thumbnail_canvas.height = size;

				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
				    thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 794, 794, 0, 0, 150, 150);
				    document.getElementById("messager").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	app.directive("pignonErnest", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/ernest-pignon-ernest-pasolini.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 224, 0, 576, 576, 0, 0, 150, 150);
                        document.getElementById("pignon-ernest").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });
		    }
		};
	}); 

    app.directive("rama", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/carol-rama-isola-degli-occhi.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 115, 0, 685, 685, 0, 0, 150, size);
                        document.getElementById("rama").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });
		    }
		};
	}); 
	
	app.directive("weiweiForeverBicycles", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/ai_weiwei_forever_bicycles.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                
                    thumbnail_canvas.width = size;
                    thumbnail_canvas.height = size;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, 0, 0, 640, 640, 0, 0, 150, 150);
                        document.getElementById("weiwei-forever-bicycles").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                });
		    }
		};
	});
	
	app.directive("callePrenezSoinDeVous", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("sherman", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("balincourt", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("becher", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
		
	app.directive("prouvost", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
                    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelarticles/prouvost-the-smocking-image.png";
                    var thumbnail_canvas = document.createElement('canvas');
                    
                    var size = 150*window.devicePixelRatio;
                    console.log(size);
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
		    }
		};
	});
	
	app.directive("rondinone", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("boltanski", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("pistoletto", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("long", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
                    }
                    imageTmp.src = myUrl;
                });
		    }
		};
	});
	
	app.directive("morellet", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("samba", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("gonzaleztorres", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("laurentgrasso", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("alberola", function(){
		return {
    		restrict : 'AE',
    		scope:{},
            link: function(scope, element){
                angular.element(document).ready(function(){
                    // on récupère l'élément
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
		    }
		};
	});
	
	app.directive("mosaique", function(){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/mosaique.html'
        }
    });
    
	
	
	app.directive("cartelNav", function(){
        return{
            restrict:'EAC',
            replace:false,
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
})();