(function() {
    var app = angular.module('place', ['ngRoute']);
    
    // CONTROLLER
    // place Controller
    app.controller('placeController', ['$scope', '$http', '$window', function($scope,$http, $window) {
		console.log("placeController IN");
		
		$scope.idCreator = window.idCreator;
        
        $scope.gName = "";
        $scope.gAdresse = "";
        $scope.gMail = "";
        $scope.gRcs = "";
        $scope.gPhone = ""
        $scope.gImage_url = $scope.idCreator+"_"+$scope.gName+".png";
        $scope.gSite = "";
        $scope.gVisites = "";
        
        $scope.droitAccepted = false;
        $scope.action = "POST";
        
        $scope.showExhibitionList = false;
        $scope.showExhibitionConfig = false;
        $scope.showExhibitionPreview = false;
        
        $scope.showCreationSelect = false;
        $scope.showCreationPreview = false;
        $scope.showAddCreationConfig = false;
        $scope.showProfilConfig =true;
        
        $scope.areDataLoaded = true;

        // ajustement des paramètres.
        $scope.showGalleryValidationButon = true;
        
        $scope.showGalleryIdentiteDiv = false;
        $scope.showGalleryIdentiteParam = false;
        $scope.showGalleryContactDiv = false;
        $scope.showGalleryContactParam = false;
        $scope.showGalleryDroitDiv = false;
        $scope.showGalleryDroitParam = false;
        
        $scope.idEtape = 1;
        
        $scope.$watchGroup(["showGalleryIdentiteDiv",
                            "showGalleryContactDiv", "showGalleryDroitDiv", "showValidRight"], function(newValue){
            $scope.showFormValidationButton = true;
            console.log("showFormValidationButton - watch over validated params : ", newValue);
            for (var i = 0 ; i < newValue.length; i++){
                if (!newValue[i]){
                    $scope.showFormValidationButton = false;
                    console.log("$scope.showFormValidationButton", $scope.showFormValidationButton);
                    return;
                }
            }
        });
        
        $scope.$watchGroup(["showValidAvatar", "showValidIdentite", 
                            "showValidContact", "showValidRight"], function(newValue){
            if (!$scope.showProfilConfig) return;
            $scope.showProfilConfig = false;
            
            console.log("showProfilConfig - watch over validated params : ", newValue);
            for (var i = 0 ; i < newValue.length; i++){
                if (!newValue[i]){
                    $scope.showProfilConfig = true;
                    return;
                }
            }
        });
        
        $scope.$watchGroup(["showValidAvatar", "showValidIdentite", 
                            "showValidContact", "showValidRight", "areDataLoaded"], function(newValue){
            $scope.areDataValid = true;
            console.log("showProfilConfig - watch over validated params : ", newValue);
            for (var i = 0 ; i < newValue.length; i++){
                if (!newValue[i]){
                    $scope.areDataValid = false;
                    return;
                }
            }
        });
        
        var gallery = this;
    	gallery.gallery_details = [];
        
        $http({method: 'GET', url:'/gallery_details.json?id='+idCreator}).success(function(data){
            console.log(data);
            gallery.gallery_details = data;
            if (gallery.gallery_details[0].gallery.type){
                if (gallery.gallery_details[0].gallery.type=="galerie"){
                    // on affiche la partie avatar
                    $scope.idEtape = 1;
                    
                    console.log("get data");
                    if (gallery.gallery_details[0].gallery.url){
                        $scope.url= gallery.gallery_details[0].gallery.url;
                        $scope.g_x = gallery.gallery_details[0].gallery.a_x;
                        $scope.g_y = gallery.gallery_details[0].gallery.a_y;
                        $scope.g_d_x = gallery.gallery_details[0].gallery.a_d_x;
                        // on affiche la partie identité
                        $scope.changeShowParam(2);
                        $scope.idEtape = 2;
                        if (gallery.gallery_details[0].gallery.gallery_detail){
                            
                            $scope.updateGalleryDetails = true;
                            
                            $scope.changeShowParam(3);
                            if (gallery.gallery_details[0].gallery.gallery_detail[0].gname ){
                                $scope.gName = gallery.gallery_details[0].gallery.gallery_detail[0].gname ;
                                if (gallery.gallery_details[0].gallery.gallery_detail[0].g_rcs != 'undefined') $scope.gRcs = gallery.gallery_details[0].gallery.gallery_detail[0].g_rcs;
                                else $scope.gRcs = "";
                                if (gallery.gallery_details[0].gallery.gallery_detail[0].g_site != 'undefined') $scope.gSite = gallery.gallery_details[0].gallery.gallery_detail[0].g_site;
                                else $scope.gSite = "";
                                if (gallery.gallery_details[0].gallery.gallery_detail[0].g_tel != 'undefined') $scope.gPhone = gallery.gallery_details[0].gallery.gallery_detail[0].g_tel;
                                else $scope.gPhone = "";
                                if (gallery.gallery_details[0].gallery.gallery_detail[0].visites != 'undefined') $scope.gVisites = gallery.gallery_details[0].gallery.gallery_detail[0].visites;
                                else $scope.gVisites = "";
                                
                                $scope.changeShowParam(4);
                                $scope.idEtape = 3;
                            } else {
                                $scope.areDataLoaded = false;
                            }
                            $scope.changeShowParam(5);
                            if (gallery.gallery_details[0].gallery.gallery_detail[0].g_adresse
                                && gallery.gallery_details[0].gallery.gallery_detail[0].g_tel){
                                $scope.gAdresse = gallery.gallery_details[0].gallery.gallery_detail[0].g_adresse;
                                $scope.gTel = gallery.gallery_details[0].gallery.gallery_detail[0].g_tel;
                                if (gallery.gallery_details[0].gallery.gallery_detail[0].g_mail != "undefined") $scope.gMail = gallery.gallery_details[0].gallery.gallery_detail[0].g_mail;
                                else $scope.gMail = "";
                                
                                console.log(6);
                                $scope.changeShowParam(6);
                                $scope.idEtape = 4;
                            } else {
                                $scope.areDataLoaded = false;
                            }
                            if (gallery.gallery_details[0].gallery.gallery_rights){
                                
                                $scope.updateGalleryRights = true;
                                
                                $scope.changeShowParam(7);
                                if (gallery.gallery_details[0].gallery.gallery_rights[0].is_accepted){
                                    $scope.droitAccepted = gallery.gallery_details[0].gallery.gallery_rights[0].is_accepted;
                                    // on valide la partie droit
                                    $scope.changeShowParam(8);
                                    $scope.idEtape = 5;
                                } else {
                                    $scope.areDataLoaded = false;
                                }
                            } else {
                                $scope.changeShowParam(7);
                                $scope.areDataLoaded = false;
                            }
                        } else { // show identité with param
                            $scope.changeShowParam(3);
                            $scope.areDataLoaded = false;
                        }
                    } else {
                        console.log("coucou");
                        $scope.url = $scope.idCreator+"_gallery.png";
                        $scope.areDataLoaded = false;
                        $scope.changeShowParam(1);
                    }
                }
            }
            console.log("areDataLoaded : ", $scope.areDataLoaded);
        }).error(function(data, status, header, config){
			console.log("error");
		}).then(function(httpData){
			if(httpData.statusText == "OK"){
			}
		});
        
        $scope.changeShowParam = function(index){
            console.log("change show param : ", index);
            switch (index){
                case 1 : // show Avatar with param
                    $scope.showValidAvatar = false;
                    $scope.showGalleryAvatarParam = true;
                    break;
                case 2 : // show valid Avatar
                    $scope.showValidAvatar = true;
                    $scope.showGalleryAvatarParam = false;
                    $scope.showGalleryIdentiteDiv = true;
                    break;
                case 3 : // show Identite with param
                    $scope.showValidIdentite = false;
                    $scope.showGalleryIdentiteParam = true;
                    break; 
                case 4 : // show valid Identite
                    $scope.showValidIdentite = true;
                    $scope.showGalleryIdentiteParam = false;
                    $scope.showGalleryContactDiv = true;
                    break;
                case 5 : // show Contact with param
                    $scope.showValidContact = false;
                    $scope.showGalleryContactParam = true;
                    break;
                case 6 : // show valid Contact
                    $scope.showValidContact = true;
                    $scope.showGalleryContactParam = false;
                    $scope.showGalleryDroitDiv = true;
                    break;
                case 7 : // show Right with param
                    $scope.showValidRight = false;
                    $scope.showGalleryDroitParam = true;
                    break;
                case 8 : // show valid Right
                    $scope.showValidRight = true;
                    $scope.showGalleryDroitParam = false;
                    break;
            }
        }
        
        this.selectImageForExhibition = function(){
            $scope.showCreationSelect = !$scope.showCreationSelect;
            $scope.showPreviewCreation = false;
            $scope.showAddCreationConfig = false;
        };
        
        this.selectThumbnail = function() {
            $scope.showPreviewCreation = !$scope.showPreviewCreation;
        };
        
        this.addCreationToGalleryCollection = function(){
            $scope.showCreationPreview = !$scope.showPreviewCreation;
            $scope.showAddCreationConfig = !$scope.showAddCreationConfig;
            $scope.showCreationSelect = false;
        };
        
        this.clickProfil = function(){
            $scope.showProfilConfig = !$scope.showProfilConfig;
        };
        
        this.addExhibition = function(){
            $scope.showExhibitionConfig = true;
            $scope.showExhibitionPreview = true;
        };
        
        this.test = function(){
            console.log("test");
            $scope.showExhibitionList = true;
        }
        
        $scope.stringToDB = function(value) {
    	    
    	    if (!value) return "";
    	    var tmpString ="";
    	    
    	    for (var i=0; i < value.length;i++){
    			if (value[i] === "'") {
    				tmpString = tmpString + "''";
    			} if (value[i] === "#"){
    			    tmpString= trmpString + "%23";
    			} else{
    				tmpString = tmpString + value[i];
    			}
    		}
    		return tmpString;
    	}
        
        this.addDetailsToGallery = function(){
            console.log("addDetailsToGallery");
            
            // adapt for db record
            var tmpName = $scope.stringToDB($scope.gName);
            var tmpAdresse = $scope.stringToDB($scope.gAdresse);
            console.log("visites");
            var tmpVisites = $scope.stringToDB($scope.gVisites);
            console.log(tmpVisites);
            
            if (!$scope.updateGalleryDetails){
                $scope.action = 'POST';
            } else {
                $scope.action = 'PUT';
            }
            
            console.log("addDetailsToGallery", $scope.action);
            
            // DETAILS
            $http({method: $scope.action, url:'/gallery_details.json?id='+$scope.idCreator
                        +'&gName='+tmpName
                        +'&gRcs='+$scope.gRcs
                        +'&gAdresse='+tmpAdresse
                        +'&gTel='+$scope.gPhone
                        +'&gMail='+$scope.gMail
                        +'&gSite='+$scope.gSite
                        +'&gVisites='+tmpVisites})
            .success(function(data){
                console.log("add detail to db success", data);
                // on ajoute les donnees dans la structure locale
                $scope.areDataLoaded = true;
                // on modifie les variables d'affichage
                
                
            }).error(function(data, status, header, config){
                console.log("write profile details error");
            }).then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            });
            
            if (!$scope.updateGalleryRights){
                $scope.actionRights = 'POST';
            } else {
                $scope.actionRights = 'PUT';
            }
            
            // DROITS
            console.log("droitAccepted", $scope.droitAccepted);
            if (!$scope.droitAccepted) $scope.droitAccepted = "false";
            $http({method: $scope.actionRights, url:'/gallery_rights.json?id='+$scope.idCreator
                        +'&id_right=0'+'&is_accepted='+$scope.droitAccepted
                        })
            .success(function(data){
                // on ajoute à la structure locale la valeur.
                
            }).error(function(data, status, header, config){
                
            }).then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            });
        }
        
        
        // bouton de mise à jour de l'affichage du profil en fonction de l'avancement du chargement des données.
        this.updateGalleryProfile = function(){
            console.log("updateGalleryProfile : ", $scope.idEtape);
            switch($scope.idEtape){
    			// AVATAR
    			case 1 :
                    $http({method: 'PUT', url:'/creator_avatar.json?id='+$scope.idCreator
							+'&url='+$scope.url
							+'&a_x='+$scope.g_x
							+'&a_y='+$scope.g_y
							+'&a_d_x='+$scope.g_d_x})
					.success(function(data){
						// on ajoute à la structure locale la valeur.
						$scope.changeShowParam(2);
						$scope.changeShowParam(3);
						$scope.idEtape = 2;
					}).error(function(data, status, header, config){
						console.log("update creator type to artiste error");
					}).then(function(httpData){
						if(httpData.statusText == "OK"){
						}
					});
					break;
				case 2 : // IDENTITE
				    $scope.identiteMessage = "";
				    // perform verification on fields NOM, TVA, Site
				    if (($scope.gName != 'undefined') && ($scope.gName.length == 0 || $scope.gName.length > 100)){
				        $scope.identiteMessage = "Veuillez renseigner le nom de la galerie avec 100 caractères maximum. Actuel : "+$scope.gName.length+". ";
				    } 
				    if (($scope.gRcs != 'undefined') && $scope.gRcs.length > 13){
				        $scope.identiteMessage += "Veuillez corriger votre TVA intracommunautaire (format : FRXX999999999). ";
				    }
				    
				    if (($scope.gSite != 'undefined') && $scope.gSite.length > 255){
				        $scope.identiteMessage += "Veuillez corriger l'url de votre site (255 caractères maximum. Actuel : "+$scope.gSite.length+").";
				    }
				    
				    if ($scope.identiteMessage.length > 0){
				        return;
				    }
				    
				    // modifier l'affichage
				    $scope.idEtape=3;
				    $scope.changeShowParam(3);
				    $scope.changeShowParam(4);
				    $scope.changeShowParam(5);
				    break;
				case 3 : // CONTACT
				    var testalpha = (($scope.gAdresse != 'undefined') && ($scope.gAdresse.length == 0 || $scope.gAdresse.length > 120));
				    console.log("contact test ++++++++++++++++++++++++++++++++++", testalpha);
				    $scope.contactMessage = "";
				    
				    console.log("ICI" );
				    
				    if (($scope.gAdresse != 'undefined') && ($scope.gAdresse.length == 0 || $scope.gAdresse.length > 120)){
				        $scope.contactMessage = "Veuillez renseigner l'adresse de la galerie sur 120 caractères maximum. Actuel : "+$scope.gAdresse.length+". ";
				    }
				    
				    if (($scope.gPhone != 'undefined') && ($scope.gPhone.length == 0 || $scope.gPhone.length > 12)){
				        $scope.contactMessage += "Veuillez renseigner un numéro sur lequel l'équipe Cartel pourra appeler la galerie sur 12 caractères maximum. Actuel : "+$scope.gPhone.length+". ";
				    }
				    
				    if (($scope.gMail != 'undefined') &&  ($scope.gMail.length > 120)){
				        $scope.contactMessage += "Veuillez renseigner le mail de contact de la galerie (120 caractères maximum. Actuel : "+$scope.gName.length+"). ";
				    }
				    
				    if ($scope.contactMessage.length > 0){
				        return;
				    }
				    
				    $scope.idEtape=4;
				    $scope.changeShowParam(6);
				    $scope.changeShowParam(7);
				    break;
				case 4 : // DROIT
				    $scope.droitMessage = "";
				    if ($scope.droitAccepted != "undefined" && !$scope.droitAccepted){
				        $scope.droitMessage = "Vous devez accepter les conditions particulières d'utilisation pour continuer";
				        return;
				    }
				    
				    if ($scope.droitAccepted){
				        console.log($scope.idEtape);
                        $scope.idEtape=5;
                        $scope.changeShowParam(8);
				    }
				    break;
				case 5 : 
				    break;
				}
        };
        
        this.clickGalleryAvatarDiv = function(){
            $scope.showGalleryAvatarParam = !$scope.showGalleryAvatarParam;
            $scope.idEtape = 1;
            $scope.showGalleryIdentiteParam = false;
            $scope.showGalleryContactParam = false;
            $scope.showGalleryDroitParam = false;
        }
        
        this.clickGalleryIdentiteDiv = function(){
            $scope.showGalleryIdentiteParam = !$scope.showGalleryIdentiteParam;
            $scope.idEtape = 2;
            $scope.showGalleryAvatarParam = false;
            $scope.showGalleryContactParam = false;
            $scope.showGalleryDroitParam = false;
        }
        
        this.clickGalleryContactDiv = function(){
            $scope.showGalleryContactParam = !$scope.showGalleryContactParam;
            $scope.idEtape = 3;
            $scope.showGalleryAvatarParam = false;
            $scope.showGalleryIdentiteParam = false;
            $scope.showGalleryDroitParam = false;
        }
        
        this.clickGalleryDroitDiv = function(){
            $scope.showGalleryDroitParam = !$scope.showGalleryDroitParam;
            $scope.idEtape = 4;
            $scope.showGalleryAvatarParam = false;
            $scope.showGalleryContactParam = false;
            $scope.showGalleryIdentiteParam = false;
        }
        
	}]);
	
	// DIRECTIVE pour le chargement des images de la liste.
	// setupPreview
	app.directive("setUpPreview", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+scope.creation.url;
				var thumbnail_canvas = document.createElement('canvas');
				thumbnail_canvas.width = 140;
				thumbnail_canvas.height = 140;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, scope.creation.t_p_x, scope.creation.t_p_y, scope.creation.t_d_x, scope.creation.t_d_x, 0, 0, thumbnail_canvas.width, thumbnail_canvas.height);
					scope.$parent.creationCtrl.creator[0].creator.creations[scope.$index].thumbnailUrl= "url("+thumbnail_canvas.toDataURL()+")";
					document.getElementById('listThumb_'+scope.$parent.creationCtrl.creator[0].creator.creations[scope.$index].id_creation).style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	// SHOW VALIDATION BUTTON
    app.directive('showValidationButton', function(){
    	return {
    		restrict : 'A',
    		controller:['$scope', function($scope){
    			$scope.$watchGroup(["showValidAvatar", "showValidIdentite", "showValidContact", "showValidAvatar", "showValidRight", "areDataLoaded", "areDataValid"], 
    			function(newValue, OldValue, scope){
					console.log("SHOW VALIDATION BUTTON");
					var i = 0;
					for (i; i < newValue.length-1; i++){
						if (!newValue[i]){
							break;
						}
					}
					if (scope.areDataLoaded){
						document.getElementById("pageProfile").style.border ="1px solid white";
						document.getElementById("validationButton").style.backgroundColor = "#5CB884";
						scope.validationButtonLabel = "";
						scope.showForm = false;
						// et on fait disparaitre le bouton
					} else {
                        if (i == newValue.length-2){ // modification
                            console.log("coucou");
                            document.getElementById("validationButton").style.backgroundColor = "#63C1D3";
                            document.getElementById("pageProfile").style.border ="1px solid #63C1D3";
                            scope.validationButtonLabel = "Enregistrer";
                            scope.showExhibitionList = true;
                        }else {
                            document.getElementById("validationButton").style.backgroundColor = "#ee6779";
                            document.getElementById("pageProfile").style.border ="1px solid #ee6779";
                            scope.validationButtonLabel = "Renseigner les champs manquants";
                        }
					}
					
				});
    		}],
    		link:function(scope,element){
				element.bind("click", function (){
    				// nothing to do here.
    			});
   			}	
   		}
    });
	
	// DIRECTIVE 
	// clickThumbnail
	app.directive("clickThumbnail", function(){
   	
   	/*
   		$.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    	}
   	*/	
   		return function (scope, element, attr){	
   			element.bind("click", function(){
   				// detail
   				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+scope.creation.url;
   				// on recrée l'image du scope
   				var tmp = document.getElementById("detailImageDiv");
   				var catalog_elem = document.getElementById('catalogImageDiv');
   				var thumb_elem = document.getElementById('preview');
   				var newFullHeight = scope.creation.height*308/scope.creation.width;
   				tmp.style.backgroundImage = 'url('+myUrl+')';
   				tmp.style.backgroundSize = "308px "+newFullHeight+"px";
				tmp.style.backgroundRepeat = "no-repeat";
				tmp.style.height = newFullHeight+"px";

				// on met à jour les autres element sur la base de la taille de l'image chargée.
				var divIndicatorHeight = newFullHeight + 85;
				var divDescriptionHeight = divIndicatorHeight + 30;
				document.getElementById('divIndicator').style.top = divIndicatorHeight+"px";
				document.getElementById('divDescription').style.top = divDescriptionHeight+"px";
				
				// catalogImageDiv et preview par canvas
				// on créé les canvas
				var catalog_canvas = document.createElement('canvas');
				var thumbnail_canvas = document.createElement('canvas');
				catalog_canvas.width = 309;
				catalog_canvas.height = 550;
				thumbnail_canvas.width = 275;
				thumbnail_canvas.height = 275;
				
				document.getElementById('preview').style.height = 275;
				document.getElementById('preview').style.width = 275;
				
				scope.$parent.image = new Image();
				scope.$parent.image.src = document.getElementById('detailImageDiv').style.backgroundImage.slice(4,-1);
				scope.$parent.image.crossOrigin = "Anonymous";
				
				scope.$parent.image.onload = function(){
					catalog_canvas.getContext('2d').drawImage(scope.$parent.image, scope.creation.p_x, scope.creation.p_y, scope.creation.d_x, scope.creation.d_y, 0, 0, 308, 548);
					thumbnail_canvas.getContext('2d').drawImage(scope.$parent.image, scope.creation.t_p_x, scope.creation.t_p_y, scope.creation.t_d_x, scope.creation.t_d_x, 0, 0, 275, 275);
					
					thumb_elem.src = thumbnail_canvas.toDataURL();
					
					catalog_elem.style.height = "548px";
					catalog_elem.style.backgroundImage = "url(	"+catalog_canvas.toDataURL()+")";
					catalog_elem.style.backgroundSize = "308px 548px;"
					catalog_elem.style.backgroundRepeat = "no-repeat";

					$('#creationParam').goTo();
				}
				
				scope.$parent.image.src = document.getElementById('detailImageDiv').style.backgroundImage.slice(4,-1);
				
				
				
				if ( scope.$parent.image.complete || scope.$parent.image.complete === undefined ) {
				    scope.$parent.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			    	scope.$parent.image.src = document.getElementById('detailImageDiv').style.backgroundImage.slice(4,-1);
				}
   			});
   		}
   	});
   	
   	// DIRECTIVE de click sur ajout de création, on remet à zéro tous les champs.
   	// addCreation
   	app.directive("addCreation", function(){
   		
   		/*
   		$.fn.goTo = function() {
			$('html, body').animate({
				scrollTop: $(this).offset().top + 'px'
			}, 'fast');
			return this; // for chaining...
    	}
   		*/
   		return function(scope,element){
   			element.bind("click", function (){
   				// on met à jour tous les élément
   				document.getElementById('catalogImageDiv').style.backgroundImage = "";
   				document.getElementById('preview').src = "";
   				document.getElementById('detailImageDiv').style.backgroundImage = "";
   				
   				//$('#creationParam').goTo();
   			});
   		}
   	});
   	
   	// DIRECTIVE de click sur la gauche
   	// leftButton
   	app.directive("leftButton", function(){
   		return function(scope, element){
   			element.bind("click", function(){
   				// test des elemets requis
				if (scope.image == undefined){return;}

				// variables de déplacement
				var alpha_depl = 8;
				var orientation;							
				// variable de dessinage
				var thumbnail_canvas = document.createElement('canvas');
				var catalog_canvas = document.createElement('canvas');

				catalog_canvas.width = 309;
				catalog_canvas.height = 550;
		
				thumbnail_canvas.width = 275;
				thumbnail_canvas.height = 275;
				
				// set up du comportement portrait ou paysage
				if (scope.image.height >= scope.image.width){scope.t_d_x = scope.image.width;orientation=false;}else{scope.t_d_x=scope.image.height;orientation=true;}
		
				// on calcule 
				var delta = scope.image.width / (alpha_depl * scope.zoom);
		
				if (orientation){
					if (scope.p_x == 0) {return;}
					if (scope.p_x > delta) {scope.p_x = scope.p_x - delta;} else {scope.p_x = 0;}
					catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
					document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
			
					if (scope.t_p_x == 0){return;}
					if (scope.t_p_x > delta) {scope.t_p_x = scope.t_p_x - delta;} else {scope.t_p_x = 0;}
					// image to draw 
					thumbnail_canvas.getContext('2d').drawImage(scope.image, scope.t_p_x, scope.t_p_y, scope.t_d_x, scope.t_d_x, 0, 0, 275, 275);
					document.getElementById("preview").src = thumbnail_canvas.toDataURL();
				}
				else{
					if (scope.t_p_x != 0){
						if (scope.t_p_x > delta) {scope.t_p_x = scope.t_p_x - delta;} else {scope.t_p_x = 0;}
						// image to draw 
						thumbnail_canvas.getContext('2d').drawImage(scope.image, scope.t_p_x, scope.t_p_y, scope.t_d_x, scope.t_d_x, 0, 0, 275, 275);
						document.getElementById("preview").src = thumbnail_canvas.toDataURL();
					}
					if (scope.p_x == 0){return;}
					if (scope.p_x > delta) {scope.p_x = scope.p_x - delta;} else {scope.p_x = 0;}
					catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
					document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
				}
   			});
   		}
   	});
   	
   	// DIRECTIVE de click sur la droite
   	// rightButton
   	app.directive("rightButton", function(){
   		return function(scope, element){
   			element.bind("click", function(){
   				// test des elemets requis
				if (scope.image == undefined){return;}
				
				// variables de déplacement
				var alpha_depl = 8;
				var orientation;							
				// variable de dessinage
				var thumbnail_canvas = document.createElement('canvas');
				var catalog_canvas = document.createElement('canvas');

				catalog_canvas.width = 309;
				catalog_canvas.height = 550;
		
				thumbnail_canvas.width = 275;
				thumbnail_canvas.height = 275;
				
				var orientation;
				
				// calculate t_d_x
				if (scope.image.height >= scope.image.width){scope.t_d_x = scope.width;orientation=false;}else{scope.t_d_x=scope.image.height;orientation=true;}
		
				var alpha_depl = 8;
				// on calcule 
				var delta =  scope.image.width / (alpha_depl * scope.zoom);
		
				if (orientation){
					if (scope.p_x == scope.image.width - scope.d_x){return;}
					if ((scope.p_x + delta) < (scope.image.width - scope.d_x)) {scope.p_x = scope.p_x + delta;} else {scope.p_x = scope.image.width - scope.d_x;}
					catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
					document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
					
					if (scope.t_p_x + scope.t_d_x == scope.image.width){return;}
					if (scope.t_p_x + delta <= scope.image.width - scope.t_d_x) {scope.t_p_x = scope.t_p_x + delta;} else {scope.t_p_x = scope.image.width - scope.t_d_x;}
					// image to draw 
					thumbnail_canvas.getContext('2d').drawImage(scope.image, scope.t_p_x, scope.t_p_y, scope.t_d_x, scope.t_d_x, 0, 0, 275, 275);
					document.getElementById("preview").src = thumbnail_canvas.toDataURL();
				} else {
					if (scope.t_p_x + scope.t_d_x != scope.image.width){
						if (scope.t_p_x + delta <= scope.image.width - scope.t_d_x) {scope.t_p_x = scope.t_p_x + delta;} else {scope.t_p_x = scope.image.width - scope.t_d_x;}
						// image to draw 
						thumbnail_canvas.getContext('2d').drawImage(scope.image, scope.t_p_x, scope.t_p_y, scope.t_d_x, scope.t_d_x, 0, 0, 275, 275);
						document.getElementById("preview").src = thumbnail_canvas.toDataURL();
					}
					if (scope.p_x == scope.image.width - scope.d_x) {return;}
					if ((scope.p_x + delta) < (scope.image.width - scope.d_x)) {scope.p_x = scope.p_x + delta;} else {scope.p_x = scope.image.width - scope.d_x;}
					catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
					document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
				}
   			});
   		}
   	});
   
   // DIRECTIVE de click sur le haut
   // upButton
   	app.directive("upButton", function(){
   		return function(scope, element){
   			element.bind("click", function(){
   				// test des elemets requis
				if (scope.image == undefined){return;}
				
				// variables de déplacement
				var alpha_depl = 8;
				var orientaion;		
				
				// variable de dessinage
				var thumbnail_canvas = document.createElement('canvas');
				var catalog_canvas = document.createElement('canvas');

				catalog_canvas.width = 309;
				catalog_canvas.height = 550;
		
				thumbnail_canvas.width = 275;
				thumbnail_canvas.height = 275;
				
				
				if (scope.image.height >= scope.image.width){scope.t_d_x = scope.image.width;orientation=false;}else{scope.t_d_x=scope.image.height;orientation=true;}
		
				// on calcule 
				var delta = scope.image.height / (alpha_depl * scope.zoom);
		
				if (orientation){
					if (scope.p_y == 0){return;}
					if (scope.p_y > delta) {scope.p_y = scope.p_y - delta;} else {scope.p_y = 0;}
					catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
					document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
			
					if (scope.t_p_y == 0){return;}
					if (scope.t_p_y > delta) {scope.t_p_y = scope.t_p_y - delta;} else {scope.t_p_y = 0;return;}
					// image to draw 
					thumbnail_canvas.getContext('2d').drawImage(scope.image, scope.t_p_x, scope.t_p_y, scope.t_d_x, scope.t_d_x, 0, 0, 275, 275);
					document.getElementById("preview").src = thumbnail_canvas.toDataURL();
				} else {
					if (scope.t_p_y == 0) {return;}
					if (scope.t_p_y > delta) {scope.t_p_y = scope.t_p_y - delta;} else {scope.t_p_y = 0;}
					// image to draw 
					thumbnail_canvas.getContext('2d').drawImage(scope.image, scope.t_p_x, scope.t_p_y, scope.t_d_x, scope.t_d_x, 0, 0, 275, 275);
					document.getElementById("preview").src = thumbnail_canvas.toDataURL();
			
					if (scope.p_y == 0){return;}
					if (scope.p_y > delta) {scope.p_y = scope.p_y - delta;} else {scope.p_y = 0;}
					catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
					document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
				}
   			});
   		}
   	});

	// DIRECTIVE de click sur le bas
	// downButton
   	app.directive("downButton", function(){
   		return function(scope, element){
   			element.bind("click", function(){
   				// test des elemets requis
				if (scope.image == undefined){return;}
				
				// variables de déplacement
				var alpha_depl = 8;
				var orientation;
							
				// variable de dessinage
				var thumbnail_canvas = document.createElement('canvas');
				var catalog_canvas = document.createElement('canvas');

				catalog_canvas.width = 309;
				catalog_canvas.height = 550;
		
				thumbnail_canvas.width = 275;
				thumbnail_canvas.height = 275;
				
				if (scope.image.height >= scope.image.width){scope.t_d_x = scope.image.width;orientation=false;}else{scope.t_d_x=scope.image.height;orientation=true;}		
		
				// on calcule 
				var delta = scope.image.height / (alpha_depl * scope.zoom);
		
				if (orientation){
					if (scope.p_y + scope.d_y == scope.image.height){return;}
					if (scope.p_y + delta < scope.image.height - scope.d_y) {scope.p_y = scope.p_y + delta;} else {scope.p_y = scope.image.height - scope.d_y;}
			
					catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
					document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
			
					if (scope.t_p_y+scope.t_d_x == scope.image.height) {return;}
					if (scope.t_p_y + delta < scope.image.height - scope.t_d_x) {scope.t_p_y = scope.t_p_y + delta;} else {scope.t_p_y = scope.image.height - scope.t_d_x;}
					// image to draw 
					thumbnail_canvas.getContext('2d').drawImage(scope.image, scope.t_p_x, scope.t_p_y, scope.t_d_x, scope.t_d_x, 0, 0, 275, 275);
					document.getElementById("preview").src = thumbnail_canvas.toDataURL();
				} else {
					if (scope.t_p_x+scope.t_d_x == scope.image.height){return;}
					if (scope.t_p_y + delta < scope.image.height - scope.t_d_x) {scope.t_p_y = scope.t_p_y + delta;} else {scope.t_p_y = scope.image.height - scope.t_d_x;}
					// image to draw 
					thumbnail_canvas.getContext('2d').drawImage(scope.image, scope.t_p_x, scope.t_p_y, scope.t_d_x, scope.t_d_x, 0, 0, 275, 275);
					document.getElementById("preview").src = thumbnail_canvas.toDataURL();
			
					if (scope.p_y + scope.d_y == scope.image.height) {return;}
					if (scope.p_y + delta < scope.image.height - scope.d_y) {scope.p_y = scope.p_y + delta;} else {scope.p_y = scope.image.height - scope.d_y;}
					catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
					$document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
				}
   			});
   		}
   	});
	
	// DIRECTIVE de click zoom In
	// zoomInButton
   	app.directive("zoomInButton", function(){
   		return function(scope, element){
   			element.bind("click", function(){
   				if (scope.image == undefined){return;}
				
				// variables de déplacement
				var alpha_depl = 8;
							
				// variable de dessinage
				var catalog_canvas = document.createElement('canvas');

				catalog_canvas.width = 309;
				catalog_canvas.height = 550;
		
				if (scope.d_x == scope.image.width / 10){return;}
				if (scope.d_y == scope.image.height / 10){return;}
		
				var delta_w, delta_h;
				delta_w = scope.image.width / 25;
				delta_h = scope.image.height / 25;

				// on recalcule calcule d_x, d_y
				if (scope.d_x /1.25 > scope.image.width / 10 || scope.d_y /1.25 > scope.image.height / 10 ){scope.zoom = scope.zoom *1.25;} 
				if (scope.d_x /1.25 > scope.image.width / 10){scope.d_x = scope.d_x/1.25;}else{ scope.d_x = scope.image.width / 10;}
				if (scope.d_y /1.25 > scope.image.height / 10 ){scope.d_y = scope.d_y/1.25;}else{ scope.d_y = scope.image.height / 10;}

				// on dessine
				catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
				document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
				
   			});
   		}
   	});

	// DIRECTIVE de click zoom Out
	// zoomOutButton
   	app.directive("zoomOutButton", function(){
   		return function(scope, element){
   			element.bind("click", function(){
				if (scope.zoom == 1){return;}

				if (scope.image == undefined){return;}
				
				// variables de déplacement
				var alpha_depl = 8;
							
				// variable de dessinage
				var catalog_canvas = document.createElement('canvas');

				catalog_canvas.width = 309;
				catalog_canvas.height = 550;

				if (scope.p_x + 1.25 * scope.d_x > scope.image.width){
					scope.p_x = scope.image.width - 1.25 * scope.d_x;
				}
				if (scope.p_y + 1.25 * scope.d_y > scope.image.height){
					scope.p_y = scope.image.height - 1.25 * scope.d_y;
				}
	
				if (scope.p_x + 1.25*scope.d_x > scope.image.width || scope.p_y + scope.d_y*1.25 > scope.image.height){
					// on  recalcule les param initiaux : 
					if (scope.d_x * 548 / scope.d_y > 309){
						scope.d_x = 309 * scope.image.height / 548;
						scope.d_y = scope.image.height;
					} else if (scope.image.width * 548 / scope.image.height < 309){
						if (scope.image.height * 308 / scope.image.width > 548){
							scope.d_x = scope.image.width;
							scope.d_y = 548 * scope.image.width / 309;
						}
					}
					scope.zoom = 1;
				}else {
					scope.d_x = 1.25 * scope.d_x;
					scope.d_y = 1.25 * scope.d_y;
					scope.zoom = scope.zoom * 0.8;
				}
				catalog_canvas.getContext('2d').drawImage(scope.image, scope.p_x, scope.p_y, scope.d_x, scope.d_y, 0, 0, 308, 548);
				document.getElementById("catalogImageDiv").style.backgroundImage = "url(" + catalog_canvas.toDataURL() + ")";
			});
   		}
   	});
   	
   	// DIRECTIVE de click sur le bouton de récupération de géolocalisation locale
   	// clickGeolocation
   	app.directive("clickGeolocation", ['$http', function($http){   
   		
   		var showPosition = function(position){
   			var $element = document.getElementById("creationSection");
			$scope = angular.element($element).scope();
			
			$scope.latitude = position.coords.latitude;
			$scope.longitude = position.coords.longitude;
			$http({method:'GET', url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.latitude+","+$scope.longitude
			+'&key=AIzaSyA62f9rWqmGsKRZRBkKS-i733eUBX969pE'})
			.success(function(data, status, header, config){
				if (data. status == "OK"){
					for (var i = 0; i < data.results.length; i++){
						for (var j = 0; j < data.results[i].types.length; j++){
							if (data.results[i].types[j] == "street_address"){
								// on doit récupérer le bon scope.
								$scope.adresse = data.results[i].formatted_address;
								// on cache la partie
								$scope.showGeolocationModule = false;
								return;
							}
						}
					}
				}
			}).error(function(data, status, header, config){
			}).then(function(httpData){});
    	}
   	
   		return function(scope,element){
   			element.bind("click", function(){
				if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(showPosition);
						scope.changeShowParam(6);
				} else { 
					document.getElementById("myadresse").innerHtml = "La geolocation n'est pas supportée par votre navigateur internet. Renseignez votre adresse.";
					scope.$parent.changeShowParam(5);
				}	
   			});
   		};
   	}]);
	
	// DIRECTIVE pour le chargement de l'avatar galerie.
	// setupGalleryPreview
	app.directive("setUpGalleryAvatar", function(){
     	return {
    		restrict : 'A',
    		controller:['$scope', function($scope){
    			$scope.$watch("url", function(newValue, OldValue, scope){	
					if (scope.g_x >= 0 && scope.g_y >= 0 && scope.g_d_x >=0 && newValue.length > 0 ){
						console.log("here");
						var aImage = new Image();
						var profile_canvas = document.createElement('canvas');
							profile_canvas.width = 308;
							profile_canvas.height = 308;
							
						document.getElementById("buttonAddGalleryImage").style.width = "156px";
						document.getElementById("buttonAddGalleryImage").style.height = "156px";
						document.getElementById("buttonAddGalleryImage").style.marginLeft="-13px";
						document.getElementById("buttonAddGalleryImage").style.marginTop="-30px";
						
						aImage.crossOrigin = "Anonymous";
						aImage.onload = function(){
							console.log("on load");
							
							profile_canvas.getContext('2d').drawImage(aImage, scope.g_x, scope.g_y, scope.g_d_x, scope.g_d_x, 0, 0, 308, 308);
							document.getElementById("profileImage").src =  profile_canvas.toDataURL();  
							document.getElementById("buttonAddGalleryImage").src = profile_canvas.toDataURL();

						}
						aImage.src = "https://s3.eu-central-1.amazonaws.com/cartelgallery/"+newValue;
					}
				});
    		}],
    		link:function(scope,element){
				element.bind("click", function (){
    				// nothing to do here.
    			});
   			}	
   		}
    });
    
    app.directive("conditionsGaleries", function (){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/conditions/cpu-galeries.html'
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