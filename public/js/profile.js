(function() {
    var app = angular.module('profile', ['ngRoute']);
    
    // data controller
    app.controller('profileController', ['$scope', '$timeout', '$http', '$window', function($scope, $timeout, $http, $window) {
    	
    	var profile = this;
    	profile.creator_details = [];
    	
    	// initiate the collection of data.
    	$http({method: 'GET', url:'/artiste_details.json?id='+idCreator}).success(function(data){
			if (data){
				profile.creator_details = data;
				console.log("profile - detail : ", data);
				if (profile.creator_details[0].creator.type){
					if(profile.creator_details[0].creator.type == "artiste"){
						$scope.changeShowParam(1);
						$scope.type = profile.creator_details[0].creator.type;
						$scope.idEtape = 0;
					
						if (profile.creator_details[0].creator.url){
							$scope.url = profile.creator_details[0].creator.url;
							$scope.a_x = profile.creator_details[0].creator.a_x;
							$scope.a_y = profile.creator_details[0].creator.a_y;
							$scope.a_d_x = profile.creator_details[0].creator.a_d_x;
						
							$scope.idEtape = 1;
							$scope.showValidAvatar = true;
							$scope.showAvatarParam = false;
						}else {
							$scope.url = idCreator+"_avatar.png";
							$scope.showAvatarParam = true;
						}

						// SET UP THE TYPE OF ACTION
						if (profile.creator_details[0].creator.creator_detail){
							$scope.detailAction = "PUT";
							$scope.areDataLoaded = true;
							if (profile.creator_details[0].creator.creator_detail[0].fname){
								$scope.prenom = profile.creator_details[0].creator.creator_detail[0].fname;
								$scope.nom = profile.creator_details[0].creator.creator_detail[0].lname;
								$scope.changeShowParam(6);
								$scope.showValidIdentite = true;
								$scope.idEtape = 2;
							} else {
								$scope.areDataLoaded = false;
							}
							if (profile.creator_details[0].creator.creator_detail[0].mail ){
								$scope.mail = profile.creator_details[0].creator.creator_detail[0].mail;
								$scope.tel = profile.creator_details[0].creator.creator_detail[0].tel;
								$scope.site = profile.creator_details[0].creator.creator_detail[0].site;
								$scope.changeShowParam(8);
								$scope.showValidContact = true;
								$scope.idEtape = 3;
							}else {
								$scope.areDataLoaded = false;
							}
							if (profile.creator_details[0].creator.creator_detail[0].bio){
								$scope.bio = profile.creator_details[0].creator.creator_detail[0].bio;
								$scope.changeShowParam(10);
								$scope.showIdentiteParam = false;
								$scope.showValidBio = true;
								$scope.idEtape = 4;
							}else {
								$scope.areDataLoaded = false;
							}
						
							// DROITS 
							if (profile.creator_details[0].creator.creator_rights){
								$scope.actionDroits = "PUT";
								$scope.droitAccepted = profile.creator_details[0].creator.creator_rights[0].is_accepted;
						
								$scope.changeShowParam(10);
								$scope.showValidDroits = true;
								$scope.idEtape = 5;
							}else {
								$scope.actionDroits = "POST";
								$scope.droitAccepted = false;
								$scope.showDroitsParam = true;
								$scope.changeShowParam(11);
								$scope.showValidDroits = false;
								$scope.areDataLoaded = false;
								if($scope.idEtape == 4) {$scope.idEtape++;}
							}
						} 
						else {
							$scope.detailAction = "POST";
							$scope.prenom = "Votre prénom";
							$scope.nom = "Votre nom ";
							$scope.mail = "@";
							$scope.tel = "06";
							$scope.site = "http://";
							$scope.bio = "";
						}
					
						$scope.pushSetUp();
					}else{
						$scope.changeShowParam(0);
					}
				} else {
					// rien a initialiser?
				}	
			}
		}).error(function(data, status, header, config){
			console.log("error");
		}).then(function(httpData){
			if(httpData.statusText == "OK"){
			}
		});
		
		$scope.validationButtonLabel = "Renseigner les champs manquants";
		$scope.type = "";
		
		$scope.showForm = true;
    	// Div	
    	$scope.showIdentiteDiv = false;
    	$scope.showContactDiv = false;
    	$scope.showBioDiv = false;
    	$scope.showDroitsDiv = false;
    	$scope.showValidateButton = true;
    	// div params
    	$scope.showImageButton = true;
    	
    	// Validation labels
    	$scope.showValidAvatar = false;
    	$scope.showValidIdentite = false;
    	$scope.showValidContact = false;
    	$scope.showValidBio = false;    	
    	$scope.showValidDroits = false;
    	
    	$scope.showValidationButton = false;
    	
    	$scope.isFormValid=false;
    	
    	
    	$scope.idEtape = 0;
    	$scope.idCreator = window.idCreator;
    	
    	$scope.bioLength = 400;
    	
    	// parametres de compte
    	$scope.bioLength = 400;
    	$scope.right = false;
    	
    	var imageUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/";
    	
    	$scope.changeShowParam = function(index){
    		// set up $scope.idEtape
    		switch (index){
    			// INIT
    			case 0 :
    				break;
    			// ARTISTE
    			case 1 :
    				break;
    			// GALERIE	
    			case 2 :
    				break;
    			// AVATAR +
    			case 3 :
    				$scope.idEtape = 1;
    				$scope.showAvatarParam = true;
    				
    				// cache le reste
    				$scope.showIdentiteParam = false;
    				$scope.showContactParam = false;
    				$scope.showBioParam = false;
    				break;
    			// IDENTITE +
    			case 4 :
    				$scope.showIdentiteDiv = true;
    				//$scope.showIdentiteParam = true;
    				
    				// cache le reste 
    				$scope.showAvatarParam = false;
    				
    				break;
    			case 5 :
    				break;
    			// CONTACT +
    			case 6 : // afficher le div contact
    				$scope.showAvatarDiv = true;
    				$scope.showIdentiteDiv = true;
    				$scope.showContactDiv = true;
    				$scope.showContactParam = !$scope.showContactParam;
    				
    				// cacher le reste
    				$scope.showIdentiteParam = false;
    				break;
    			// 
    			case 7 : 
    				break;
    			case 8 : // afficher le div bio 
    			    $scope.showAvatarDiv = true;
    				$scope.showIdentiteDiv = true;
    				$scope.showContactDiv = true;
    				$scope.showBioDiv = true;
    				$scope.showBioParam = !$scope.showBioParam;
    				
    				// reset
    				$scope.showContactParam = false;
    				break;
    			case 9 : // afficher le div Bio avec validation
    				$scope.showBioDiv = true;
    				$scope.showBioParam = true;
    				break;
    			case 10 : // afficher le div droits d'auteurs
    				$scope.showDroitsDiv = true;
    				$scope.showDroitsParam = !$scope.showDroitsParam;
    				
    				$scope.showBioParam = false;
    				break;
    			case 11 : // afficher le div droits d'auteurs avec validation
    				$scope.showDroitsDiv = true;
    				$scope.showDroitsParam = true;
    				break;
    			case 12 : 
    				break;
    		}
    	}
    	
    	this.addProfileDetails = function(){
    		if ($scope.showValidAvatar && $scope.showValidIdentite && $scope.showValidContact && $scope.showValidBio && $scope.showValidDroits){
				$http({method: $scope.detailAction, url:'/artiste_details.json?id='+$scope.idCreator
						+'&fname='+$scope.prenom
						+'&lname='+$scope.nom
						+'&bio='+$scope.bio
						+'&mail='+$scope.mail
						+'&tel='+$scope.tel
						+'&site='+$scope.site})
				.success(function(data){
					if (!profile.creator_details[0].creator.creator_detail){
    					console.log("undefined in case 2");
    					profile.creator_details[0].creator.creator_detail = [];
    				}
    				profile.creator_details[0].creator.creator_detail.push({
    					"fname": $scope.prenom,
    					"lname": $scope.nom,
    					"mail": $scope.mail,
    					"tel": $scope.tel,
    					"site":$scope.site,
    					"bio": $scope.bio
    				});
    				$scope.detailAction = "PUT";			
				}).error(function(data, status, header, config){
					console.log("write profile details error");
				}).then(function(httpData){
					if(httpData.statusText == "OK"){
					}
				});

				$http({method: $scope.actionDroits, url:'/artiste_rights.json?id='+$scope.idCreator
							+'&id_right=0'+'&is_accepted='+$scope.droitAccepted
							})
				.success(function(data){
					// on ajoute à la structure locale la valeur.
					if (!profile.creator_details[0].creator.creator_rights){
						profile.creator_details[0].creator.creator_rights = [];
					}
					profile.creator_details[0].creator.creator_rights.push({
						"id_right":0,
						"is_accepted":$scope.droitAccepted
					});
					$scope.areDataLoaded = true;
					$scope.showForm = false;
				}).error(function(data, status, header, config){
					console.log("update creator type to artiste error");
					$scope.areDataLoaded = false;
				}).then(function(httpData){
					if(httpData.statusText == "OK"){
					}
				});
			} else {
				if (!$scope.showValidAvatar){
					
					console.log("avatar");
					$scope.changeShowParam(3);
				} else if  (!$scope.showValidIdentite){
					
					console.log("identite");
					$scope.changeShowParam(4);
				} else if (!$scope.showValidContact){
					
					console.log("contact");
					$scope.changeShowParam(6);
				} else if (!$scope.showValidBio){
				
					console.log("Bio");
					$scope.changeShowParam(8);
				} else if (!$scope.showValidDroits){
				
					console.log("Droits");
					$scope.changeShowParam(10);
				} 
			}
    	}
    	
    	this.clickProfile = function(){
    		if (!$scope.showForm) {
    			$scope.showForm = true;
    		}
    	}
    	
    	this.cancelSelection = function(){
			$scope.changeShowParam(0);
    	}
    	
    	// PUSH SET UP
    	//
    	// fonction de construction de la structure de données locale.
    	// gestion de l'évolution de l'affichage des div
    	// gestion de l'évolution de l'affichage des controles
    	$scope.pushSetUp = function(){
    		console.log("push Set Up with id : ", $scope.idEtape);
    		switch($scope.idEtape){
    			case 0:
    				return;
    			// AVATAR
    			case 1 :
    				console.log("push set up 2");
    				// on ajoute la valeur en base de données
    				$http({method: 'PUT', url:'/creator_avatar.json?id='+$scope.idCreator
							+'&url='+$scope.url
							+'&a_x='+$scope.a_x
							+'&a_y='+$scope.a_y
							+'&a_d_x='+$scope.a_d_x})
					.success(function(data){
						// on ajoute à la structure locale la valeur.
						profile.creator_details[0].creator.url = $scope.url;
						profile.creator_details[0].creator.a_x = $scope.a_x;
						profile.creator_details[0].creator.a_y = $scope.a_y;
						profile.creator_details[0].creator.a_d_x = $scope.a_d_x;
						$scope.showValidAvatar = true;
					}).error(function(data, status, header, config){
						console.log("update creator type to artiste error");
					}).then(function(httpData){
						if(httpData.statusText == "OK"){
						}
					});
					
    				// si ca fonctionne, on modifie la valeur courante de idEtape.
    				$scope.idEtape = 2;
    				// on affiche la div suivante
    				$scope.changeShowParam(4);
    				console.log("end push set up 2");
    				break;
    			//IDENTITE
    			case 2 : 
    				
    				$scope.showValidIdentite = true;
    				// si ca fonctionne, on modifie la valeur courante de idEtape.
    				$scope.idEtape = 3;
    				
    				// on affiche la div suivante
    				$scope.changeShowParam(6);
    				
    				console.log("end push set up 3");
    				break;
    			// CONTACT
    			case 3 : 
    				// si ca fonctionne, on modifie la valeur courante de idEtape.
    				$scope.idEtape = 4;
    				
    				$scope.showValidContact = true;
    				// on affiche la div suivante
    				$scope.changeShowParam(8);
    				console.log("end push set up 4");
    				break;
    			// BIO
    			case 4 : 
    				$scope.idEtape = 5
    				$scope.showValidBio = true;
    				$scope.changeShowParam(10);
    				break;
    			// DROITS
    			case 5 : 
    				if ($scope.droitAccepted){
    					$scope.showValidDroits = true;
    					$scope.showDroitsParam = false;
    				}
    				break;
    		}
    	}
    	
    	
    	this.clickAvatarDiv = function(){
    		$scope.showAvatarParam = !$scope.showAvatarParam;
    		$scope.showImageButton = true;
			$scope.showIdentiteParam = false;
			$scope.showContactParam = false;
			$scope.showBioParam = false;
			$scope.showDroitsParam = false;
    	}
    	
    	this.clickIdentiteDiv = function(){
    		$scope.showAvatarParam = false;
			$scope.showIdentiteParam = !$scope.showIdentiteParam;
			$scope.showContactParam = false;
			$scope.showBioParam = false;
			$scope.showDroitsParam = false;
    	}
    	
    	this.clickContactDiv = function(){
    		$scope.showAvatarParam = false;
			$scope.showIdentiteParam = false;
			$scope.showContactParam = !$scope.showContactParam;
			$scope.showBioParam = false;
			$scope.showDroitsParam = false;
    	}
    	
    	this.clickBioDiv = function(){
    		$scope.showAvatarParam = false;
			$scope.showIdentiteParam = false;
			$scope.showContactParam = false;
			$scope.showBioParam = !$scope.showBioParam;
			$scope.showDroitsParam = false;
    	}
    	
    	this.clickDroitAuteurDiv = function(){
    		$scope.showAvatarParam = false;
			$scope.showIdentiteParam = false;
			$scope.showContactParam = false;
			$scope.showBioParam = false;
			$scope.showDroitsParam = !$scope.showDroitsParam;
    	}
    	
    }]);    
 	
    app.controller('CreationController', ['$scope', '$filter', '$http', function($scope, $filter, $http) {
    	console.log("creation Controller scope : ", $scope);
    	// structure de memo de données
    	var creators = this;
    	creators.creator = [];
    	creators.constants = [];
      	
      	creators.properties = [];
      	 
      	// variables de form
      	$scope.title ="";
      	$scope.nbCharCartel=800;
      	$scope.cartel="";
      	$scope.dateCreation= new Date('2015-08');
      	$scope.medium="";
      	$scope.width=0;
      	$scope.height=0;
      	$scope.p_x=0;
      	$scope.p_y=0;
      	$scope.d_x=0;
      	$scope.d_y=0;
      	$scope.t_p_x=0;
      	$scope.t_p_y=0;
      	$scope.t_d_x=0;
      	$scope.latitude=0;
      	$scope.longitude=0;
      	$scope.url="";
      	$scope.idGodfather=0;
      	$scope.s_h=0;
      	$scope.s_w=0;
      	$scope.s_l=0;
      	$scope.isValid=false;
    	$scope.idCreator = window.idCreator;
    	$scope.nbCreation = 0;
    	$scope.zoom = 1;
		$scope.adresse = "";
    	$scope.isDeleted = false;
    	var creationUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/";
    	
    	
    	$scope.creationId = 0;
    	$scope.testDelete = 0;
    	// on calcule s'il faut afficher le bouton d'ajout
    	// on calcule s'il faut afficher le bouton de paramétrage
    	$scope.showThumbnailList = true;
    	$scope.showCreationConfig = false;
    	$scope.showAddImageButton = true;
    	$scope.showChangeImageButton = true;
    	$scope.showCreationAddButton = true;
    	$scope.showGeolocationSavingButton = true;
    	$scope.showGetPosition = true;
    	$scope.showGeolocationModule = true;
    	$scope.showDescriptionModule = true;
    	$scope.showPreview = true;
    	$scope.showAdminModule = true;
    	
    	$scope.updateImage = false;
    	$scope.updateDetails = false;
    	$scope.updateLocation = false;
    	
    	// récupération des données créations
    	if (idCreator){
      		$http({method: 'GET', url:'/creator_creations.json?id='+idCreator}).success(function(data){
      			if (data){
      				console.log("creationController jSON data : ", data);
					creators.creator = data;
					creators.constants = [];
					if (creators.creator[0].creator.id_creation_next){
						$scope.creationId = creators.creator[0].creator.id_creation_next;
					} else {
						$scope.creationId = 0;
						creators.creator[0].creator.id_creation_next = 0;
					}
					$scope.newCreationUrl = idCreator+"_"+$scope.creationId+".png";
					if (creators.creator[0].creator.creations){
						// les creations
						if (creators.creator[0].creator.creations[0]){
							$scope.nbCreation = creators.creator[0].creator.creations.length;
							if ($scope.nbCreation === 5) {
								$scope.showCreationAddButton = false;
							} else { // fetch url
								$scope.showCreationAddButton = true;
							}
							// les propriétés de la premiere creation
							if (creators.creator[0].creator.creations[0].properties) {
								creators.properties = creators.creator[0].creator.creations[0].properties[0];
								// on modifie le format des dates
							}
						}
					}else{

					}
      			}else{
      			}
      		}).error(function(data, status, header, config){
      			console.log("error");
			}).then(function(httpData){
				if(httpData.statusText == "OK"){
				}
      		});
      	}else {
      		console/log("else error");
      	}
      	
      	// FONCTION DE PARAMETRAGE NG SHOW
    	$scope.changeShowParam = function(index){
    		if (index < 0 || index > 9) {return;}
    		switch (index){
    			// chargement de la page
    			case 0: // affichage de la liste de thumbnails
    				$scope.showThumbnailList = true;
    				
    				$scope.showCreationConfig = false;
    				
    				if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
					break;
				// click sur ajout d'image
    			case 1: // affichage de la configuration d'une nouvelle image
    				$scope.showThumbnailList = true;
    				
    				$scope.showCreationConfig = true;
					$scope.showAddImageButton = true;
					
					$scope.showChangeImageButton = false;
					$scope.showGeolocationSavingButton = false;
					$scope.showGetPosition = false;
					$scope.showGeolocationModule = false;
					$scope.showDescriptionModule = false;
					$scope.hideGeolocationSavingButton = true;
					
					$scope.showPreview = false;
					
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
    				break;
    			// menu de config IMAGE ajoutée
    			case 2: // modifier la position de l'image
    				$scope.showThumbnailList = true;
    				
    				$scope.showCreationConfig = true;
    				
					$scope.showAddImageButton = false;
					
					$scope.showChangeImageButton = true;
					$scope.showPreview = true;
					
					$scope.showGeolocationSavingButton = false;
					$scope.showGetPosition = false;
					$scope.showGeolocationModule = false;
					$scope.showDescriptionModule = false;
					$scope.hideGeolocationSavingButton = true;
					
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
    				break;
    			// menu de config IMAGE positionnée
    			case 3: // afficher le param description
    				$scope.showThumbnailList = true;
    				
    				$scope.showCreationConfig = true;
    				$scope.showPreview = true;
    				
					$scope.showAddImageButton = false;
					$scope.showChangeImageButton = false;
					
					$scope.showDescriptionModule = true;
					
					$scope.showGeolocationSavingButton = false;
					$scope.showGetPosition = false;
					$scope.hideGeolocationSavingButton = true;
					$scope.showGeolocationModule = false;
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
    				break;
    			// menu de config DESCRIPTION parametrée
    			case 4: // afficher la le module de geoloc
    				$scope.showThumbnailList = true;
    				$scope.showCreationConfig = true;
					$scope.showPreview = true;
					
					$scope.showAddImageButton = false;
					$scope.showChangeImageButton = false;
					
					$scope.showGeolocationModule = true;
					$scope.showGetPosition = true;
					$scope.hideGeolocationSavingButton = true;
					$scope.showGeolocationSavingButton = false;
					$scope.showDescriptionModule = false;
					
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
    				break;
    			// menu de config GEOLOC LOCAL échoué  
    			case 5: // filtrer le module de geoloc sur le partie adresse
    				$scope.showThumbnailList = true;
    				$scope.showCreationConfig = true;
    				
					$scope.showAddImageButton = false;
					$scope.showChangeImageButton = false;
					$scope.showDescriptionModule = false;
					$scope.showPreview = true;
					
					$scope.showGeolocationModule = true;
					$scope.showGetPosition = false;
					$scope.showGeolocationSavingButton = false;
					$scope.hideGeolocationSavingButton = true;
					
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
    				break;
    			// menu de config GEOLOC effectué
    			case 6: // afficher le résultat de la géoloc
    				$scope.showThumbnailList = true;
					$scope.showCreationConfig = true;
					
					$scope.showAddImageButton = false;
					$scope.showChangeImageButton = false;
					$scope.showPreview = true;
					$scope.showDescriptionModule = false;
					
					$scope.showGeolocationModule = false;
					$scope.showGeolocationSavingButton = true;
					$scope.hideGeolocationSavingButton = false;
					$scope.showGetPosition = false;
					
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
    				break;
    			case 9:
					$scope.showThumbnailList = true;
					$scope.showCreationConfig = true;
					
					$scope.showAddImageButton = false;
					$scope.showChangeImageButton = false;
					$scope.showPreview = true;
					$scope.showDescriptionModule = false;
					
					$scope.showGeolocationModule = false;
					$scope.showGeolocationSavingButton = true;
					$scope.hideGeolocationSavingButton = true;
					$scope.showGetPosition = false;
					
					$scope.showAdminModule = true;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
					break;
				// menu de configuration Administration
				case 7:
					$scope.showThumbnailList = true;
					$scope.showCreationConfig = true;
					
					$scope.showAddImageButton = false;
					$scope.showChangeImageButton = false;
					$scope.showPreview = true;
					$scope.showDescriptionModule = false;
					
					$scope.showGeolocationModule = false;
					$scope.showGeolocationSavingButton = false;
					$scope.hideGeolocationSavingButton = true;
					$scope.showGetPosition = false;
					
					$scope.showAdminModule = true;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
					break;
				// on affiche seulement la preview
				case 8 : 
					$scope.showThumbnailList = true;
					$scope.showCreationConfig = true;
					
					$scope.showAddImageButton = false;
					$scope.showChangeImageButton = false;
					$scope.showPreview = true;
					$scope.showDescriptionModule = false;
					
					$scope.showGeolocationModule = false;
					$scope.showGeolocationSavingButton = false;
					$scope.hideGeolocationSavingButton = true;
					$scope.showGetPosition = false;
					
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
					break;
    		}	
    	}
    	
    	this.addCreation = function(){
			// on calcule la valeur de idcreation et de l'url
			if (creators.creator[0].creator.id_creation_next){$scope.creationId = creators.creator[0].creator.id_creation_next;}
			else {creators.creator[0].creator.id_creation_next=0;$scope.creationId  = 0;}
			$scope.newCreationUrl = idCreator+"_"+$scope.creationId+".png";			

			// on réinitialise tous les champs 
			$scope.width=0;
			$scope.height=0;
			$scope.p_x=0;
			$scope.p_y=0;
			$scope.d_x=0;
			$scope.d_y=0;
			$scope.t_p_x=0;
			$scope.t_p_y=0;
			$scope.t_d_x=0;
			$scope.isValid=false;
			$scope.idGodfather=0;
			
			$scope.title ="";
			$scope.cartel="Cartel de l'oeuvre";
			$scope.dateCreation='';
			$scope.medium="Select medium";
			$scope.url=$scope.newCreationUrl;
			$scope.urlVideo = "";
			$scope.s_h=0;
			$scope.s_w=0;
			$scope.s_l=0;
			
			$scope.latitude=0;
			$scope.longitude=0;
			$scope.country = "";
			$scope.adresse = "";
			
			$scope.updateImage = false;
			$scope.updateDetails = false;
			$scope.updateLocation = false;
			
			// on set up l'affichage des éléments nécessaires
			$scope.changeShowParam(1);
    	}
    	
    	this.addImageToCreation = function(){
    		// on ne modifie pas la structure de données
    		// enregistrer les paramètres de calcul d'image
    		var action="";
    		if (!$scope.updateImage){action="POST";} else {action="PUT";}
    		$http({method: action, url: '/creations?&id='+$scope.idCreator+
						'&id_creation='+$scope.creationId+
						'&url='+$scope.url+
						'&isValid='+$scope.isValid+
						'&idGodfather='+$scope.idGodfather+
						'&width='+$scope.width+
						'&height='+$scope.height+
						'&p_x='+$scope.p_x+
						'&p_y='+$scope.p_y+
						'&d_x='+$scope.d_x+
						'&d_y='+$scope.d_y+
						'&t_p_x='+$scope.t_p_x+
						'&t_p_y='+$scope.t_p_y+
						'&t_d_x='+$scope.t_d_x+
						'&isDeleted='+$scope.isDeleted
				})
    			.success(function(data, status, header, config){
    				// on ajoute les paramètres à la strcture existante
    				// on ajoute un element à creator.creations
    				if (action="POST"){
						if (!creators.creator[0].creator.creations){
							creators.creator[0].creator.creations = [];
						}
						creators.creator[0].creator.creations.push({
								"id_creation":$scope.creationId,
								"url":$scope.url,
								"d_x":$scope.d_x,
								"d_y":$scope.d_y,
								"p_x":$scope.p_x,
								"p_y":$scope.p_y,
								"t_p_x":$scope.t_p_x,
								"t_p_y":$scope.t_p_y,
								"t_d_x":$scope.t_d_x,
								"width":$scope.width,
								"height":$scope.height,
								"idGodfather":$scope.idGodfather,
								"isValid":$scope.isValid,
								"properties":""
							});
					}else {
						// on met à jour la structure
						// mettre à jour la strcture.
					}
					creators.creator[0].creator.id_creation_next++;
					$scope.nbCreation=creators.creator[0].creator.creations.length;
					$scope.updateImage = true;
					
					$scope.changeShowParam(3);
    			}).error(function(data, status, header, config){
    				console.log("error");
				}).then(function(httpData){
					if(httpData.statusText == "OK"){
					}
      			});
    	}
    	
    	this.addCreationDetailToImage = function(){
    		// on modifie le format de la date 
    		// on modifie les caractères spéciaux du cartel
    		var tmpCartel="", tmpTitle="";
    		for (var i=0; i < $scope.cartel.length;i++){
    			if ($scope.cartel[i] === "'") {
    				tmpCartel = tmpCartel + "''";
    			} else{
    				tmpCartel = tmpCartel + $scope.cartel[i];
    			}
    		}
    		for (i=0; i < $scope.title.length;i++){
    			if ($scope.title[i] === "'") {
    				tmpTitle = tmpTitle + "''";
    			} else{
    				tmpTitle = tmpTitle + $scope.title[i];
    			}
    		}
			var action="";
    		if (!$scope.updateDetails){action="POST";} else {action="PUT";}
    		var creationDate = $filter('date')($scope.dateCreation, 'yyyy-MM');
    		$http({method: action, url: '/creation_details?id_creator='+$scope.idCreator+
    							'&id_creation='+$scope.creationId+
								'&title='+tmpTitle+
								'&cartel='+tmpCartel+
								'&creationDate='+creationDate+
								'&s_h='+$scope.s_h+
								'&s_w='+$scope.s_w+
								'&s_l='+$scope.s_l+
								'&url_video='+$scope.urlVideo+
								'&medium='+$scope.medium
				})
    			.success(function(data, status, header, config){
    				// si ca fonctionne on enregistre les paramètres dans la structure locale
						// creation de la structure locale
					// recherche de l'index ou ajouter
					if (creators.creator[0].creator.creations){
						for (var i = 0; i < creators.creator[0].creator.creations.length; i++){
							if (creators.creator[0].creator.creations[i].id_creation === $scope.creationId){
								if (creators.creator[0].creator.creations[i].properties){
									creators.creator[0].creator.creations[i].properties.push({
										"cartel":$scope.cartel,
										"title":$scope.title, 
										"creation_date":$scope.dateCreation,
										"url_video":$scope.url,
										"s_w":$scope.s_w,
										"s_h":$scope.s_h,
										"s_l":$scope.s_l,
										"medium":$scope.medium
									});
									break;
								}else {
									creators.creator[0].creator.creations[i].properties = [];
									creators.creator[0].creator.creations[i].properties.push({
										"cartel":$scope.cartel,
										"title":$scope.title, 
										"creation_date":$scope.dateCreation,
										"url_video":$scope.url,
										"s_w":$scope.s_w,
										"s_h":$scope.s_h,
										"s_l":$scope.s_l,
										"medium":$scope.medium
									});
									break;
								}
							}
						}
						$scope.updateDetails = true;
					}else {
						// on ajoute à la premier position
					}
					$scope.changeShowParam(4);
    			}).error(function(data, status, header, config){
				}).then(function(httpData){
					if(httpData.statusText == "OK"){
					}
      			});
    	}
    	
    	this.deleteCreation = function(){
			$http({method: "DELETE", url: '/creations?&id='+$scope.idCreator+
						'&id_creation='+$scope.creationId
				})
			.success(function(data, status, header, config){
				var creationTmp = [];
				for (var i = 0; i < creators.creator[0].creator.creations.length;i++){
					if (creators.creator[0].creator.creations[i].id_creation != $scope.creationId){
						creationTmp.push(creators.creator[0].creator.creations[i]);
					}
				}
				creators.creator[0].creator.creations = creationTmp;
				$scope.nbCreation = creators.creator[0].creator.creations.length;
				$scope.changeShowParam(0);
			}).error(function(data, status, header, config){
				console.log("error");
			}).then(function(httpData){
				if(httpData.statusText == "OK"){
				}
			});
		}
    	
    	// GEOLOCALISATION
    	this.clickGeolocation = function(){
    		$http({method:'GET', url:'https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.adresse
    					+'&key=AIzaSyA62f9rWqmGsKRZRBkKS-i733eUBX969pE'})
    		.success(function(data, status, header, config){
    			if (data. status == "OK"){
    				$scope.latitude = data.results[0].geometry.location.lat;
    				$scope.longitude = data.results[0].geometry.location.lng;
    				$scope.changeShowParam(6);
    			}
    		}).error(function(data, status, header, config){
			}).then(function(httpData){});
    	}
    	
    	this.changeGeolocation = function(){
    		$scope.adresse = "";
    		$scope.latitude = 0;
    		$scope.longitude = 0;
    		
    		$scope.changeShowParam(5);
    		// set up update bool here.
    	}
    	
    	this.validateGeolocation = function(){
    	    var action="";
    		if (!$scope.updateLocations){action="POST";} else {action="PUT";}
    		$http({method: action, url: '/creation_location?id_creator='+$scope.idCreator+
    							'&id_creation='+$scope.creationId+
								'&adresse='+$scope.adresse+
								'&type='+'reference'+
								'&latitude='+$scope.latitude+
								'&longitude='+$scope.longitude
			})
			.success(function(data, status, header, config){
				// si ca fonctionne on enregistre les paramètres dans la structure locale
					// creation de la structure locale
				// recherche de l'index ou ajouter
				
				if (creators.creator[0].creator.creations.length){
					for (var i = 0; i < creators.creator[0].creator.creations.length; i++){
						if (creators.creator[0].creator.creations[i].id_creation === $scope.creationId){
							if(creators.creator[0].creator.creations[i].locations){
								creators.creator[0].creator.creations[i].locations.push({
									"adresse":$scope.adresse,
									"latitude":$scope.latitude, 
									"longitude":$scope.longitude
								});
								$scope.changeShowParam(7);
								break;
							}else {
								creators.creator[0].creator.creations[i].locations = [];
								creators.creator[0].creator.creations[i].locations.push({
									"adresse":$scope.adresse,
									"latitude":$scope.latitude, 
									"longitude":$scope.longitude
								});
								$scope.changeShowParam(7);
								break;
							}
						}
					}
				} else{
					
				}
				$scope.updateLocation = true;
			}).error(function(data, status, header, config){
			}).then(function(httpData){
				if(httpData.statusText == "OK"){
				}
			});
    	}
		
		// UPDATE SCREENING WHEN CLICK ON CREATION MENU
		this.clickThumb = function(creation){
    		// on charge les données dans la page
    		$scope.creationId = creation.id_creation;
    		$scope.url = creation.url;
    		$scope.isValid = creation.isValid;
    		$scope.idGodfather = creation.id_godfather;
    		$scope.width = creation.width;
    		$scope.height = creation.height;
    		$scope.p_x = creation.p_x;
    		$scope.p_y = creation.p_y;
    		$scope.d_x = creation.d_x;
    		$scope.d_y = creation.d_y;
    		$scope.t_p_x = creation.t_p_x;
    		$scope.t_p_y = creation.t_p_y;
    		$scope.t_d_x = creation.t_d_x;
    		$scope.updateImage = true;
    		$scope.changeShowParam(3);
    		if (creation.properties){
				$scope.title = creation.properties[0].title;
				$scope.cartel = creation.properties[0].cartel;
				$scope.medium = creation.properties[0].medium;
				// on formatte la date 
				$scope.dateCreation = new Date(creation.properties[0].creation_date);
				$scope.s_h = creation.properties[0].s_h;
				$scope.s_w = creation.properties[0].s_w;
				$scope.s_l = creation.properties[0].s_l;
				$scope.urlVideo = creation.properties[0].url_video;	
				
				$scope.updateDetails = true;
				
				$scope.changeShowParam(4);
    		} else {
    			$scope.title = "";
    			$scope.cartel = "";
    			$scope.medium = "";
    			$scope.dateCreation = new Date();
    			$scope.s_h = 0;
    			$scope.s_w = 0;
    			$scope.s_l = 0;
    			$scope.urlVideo ="";
    			
    			$scope.updateDetails = false;
    		}
    		if (creation.locations){
    			$scope.adresse = creation.locations[0].adresse;
    			$scope.latitude = creation.locations[0].latitude;
    			$scope.longitude = creation.locations[0].longitude;
    			
    			$scope.updateLocation = true;
    			
    			$scope.changeShowParam(8);
    		}else{
    			$scope.adresse = "";
    			$scope.latitude = 0;
    			$scope.longitude = 0;
    			$scope.updateLocation = false;
    		}
    		
    	}
    	
		this.clickOnDivConfigPhoto = function(){
			$scope.changeShowParam(2);
		}
		
		this.clickOnDivConfigDescription = function(){
			$scope.changeShowParam(3);
		}
		
		this.clickOnDivConfigGeolocalisation = function(){
			if ($scope.updateLocation){
				$scope.changeShowParam(9);
			} else {
				$scope.changeShowParam(4);
			}
			
		}
		
		this.clickOnDivConfigGestion = function(){
			$scope.changeShowParam(7);
		}
		
	}]);
    
    // LOAD AVATAR
    app.directive('loadAvatar', function(){
     	return {
    		restrict : 'A',
    		controller:['$scope', function($scope){
    			$scope.$watch("url", function(newValue, OldValue, scope){	
					if (scope.a_x >= 0 && scope.a_y >= 0 && scope.a_d_x >=0 ){
						console.log("here");
						var aImage = new Image();
						var profile_canvas = document.createElement('canvas');
							profile_canvas.width = 150;
							profile_canvas.height = 150;
							
						document.getElementById("buttonAddAvatarImage").style.width = "150px";
						document.getElementById("buttonAddAvatarImage").style.height = "150px";
						document.getElementById("buttonAddAvatarImage").style.borderRadius = "100%";
						document.getElementById("buttonAddAvatarImage").style.marginLeft="-13px";
						document.getElementById("buttonAddAvatarImage").style.marginTop="-30px";
						
						aImage.crossOrigin = "Anonymous";
						aImage.onload = function(){
							console.log("on load");
							
							profile_canvas.getContext('2d').drawImage(aImage, scope.a_x, scope.a_y, scope.a_d_x, scope.a_d_x, 0, 0, 150, 150);
							document.getElementById("profileImage").src =  profile_canvas.toDataURL();  
							document.getElementById("buttonAddAvatarImage").src = profile_canvas.toDataURL();

						}
						aImage.src = "https://s3.eu-central-1.amazonaws.com/cartelavatar/"+newValue;
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
    
    // SHOW VALIDATION BUTTON
    app.directive('showValidationButton', function(){
    	return {
    		restrict : 'A',
    		controller:['$scope', function($scope){
    			$scope.$watchGroup(["showValidAvatar", "showValidIdentite", "showValidContact", "showValidBio", "showValidDroits", "areDataLoaded"], 
    			function(newValue, OldValue, scope){
					console.log("SHOW VALIDATION BUTTON");
					var i = 0;
					for (i; i < newValue.length-1; i++){
						if (!newValue[i]){
							break;
						}
					}
					console.log("i : ", i );
					if (i == newValue.length-1){ // modification
						document.getElementById("validationButton").style.backgroundColor = "#63C1D3";
						scope.validationButtonLabel = "Enregistrer"
						
					}else {
						document.getElementById("validationButton").style.backgroundColor = "#ee6779";
						document.getElementById("pageProfile").style.border ="1px solid #ee6779";
						scope.validationButtonLabel = "Renseigner les champs manquants";
					}
					
					if (scope.areDataLoaded){
						document.getElementById("pageProfile").style.border ="1px solid #63C1D3";
						scope.validationButtonLabel = "";
						scope.showForm = false;
						// et on fait disparaitre le bouton
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
	// DIRECTIVE pour le chargement des images de la liste.
	// setupPreview
	app.directive("setUpPreview", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+scope.creation.url;
				var thumbnail_canvas = document.createElement('canvas');
				thumbnail_canvas.width = 275;
				thumbnail_canvas.height = 275;
				
				var imageTmp = new Image();
				imageTmp.crossOrigin = "Anonymous";
				
				imageTmp.onload = function(){
					thumbnail_canvas.getContext('2d').drawImage(imageTmp, scope.creation.t_p_x, scope.creation.t_p_y, scope.creation.t_d_x, scope.creation.t_d_x, 0, 0, 275, 275);
					scope.$parent.creationCtrl.creator[0].creator.creations[scope.$index].thumbnailUrl= "url("+thumbnail_canvas.toDataURL()+")";
					document.getElementById('listThumb_'+scope.$parent.creationCtrl.creator[0].creator.creations[scope.$index].id_creation).style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
				}
				imageTmp.src = myUrl;
   			});
		}
	});
	
	// DIRECTIVE pour le chargement des images au click du thumbnail
	// clickThumbnail
   	app.directive("clickThumbnail", function(){
   	
   		$.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    	}
   		
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
   		
   		$.fn.goTo = function() {
			$('html, body').animate({
				scrollTop: $(this).offset().top + 'px'
			}, 'fast');
			return this; // for chaining...
    	}
   		
   		return function(scope,element){
   			element.bind("click", function (){
   				// on met à jour tous les élément
   				document.getElementById('catalogImageDiv').style.backgroundImage = "";
   				document.getElementById('preview').src = "";
   				document.getElementById('detailImageDiv').style.backgroundImage = "";
   				
   				$('#creationParam').goTo();
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
            replace:true,
            templateUrl:'../www/elem/footer.html'
        }    
    });
    
})();