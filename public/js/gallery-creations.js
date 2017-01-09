(function(){
	var app = angular.module('creation', ['uiGmapgoogle-maps','ngRoute']);
  	
  	// CONFIG
   	// CONFIG CORS
   	app.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true; 
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	});
	
	// CONFIG GOOGLE MAPS
	app.config(function(uiGmapGoogleMapApiProvider) {
    	uiGmapGoogleMapApiProvider.configure({
    	    key: 'AIzaSyB--7PSdyZYcjHBFEQrsN0oHIqpKzFLyOU',
    	    v: '3.17',
    	    libraries: 'weather,geometry,visualization'
    	});
	});
  	
    app.controller('CreationController', ['$scope', '$filter', '$http','uiGmapGoogleMapApi', function($scope, $filter, $http, uiGmapGoogleMapApi) {
    	
    	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    	
    	uiGmapGoogleMapApi.then(function(maps) {
    	});
    	
    	// structure de memo de données
    	var creators = this;
    	creators.creator = [];
    	creators.constants = [];
      	
      	creators.properties = [];
      	
      	$scope.bio = "";
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
    	$scope.cType = window.cType;
    	
    	$scope.selectArtist = true;
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
    	
    	
    	
    	// artiste module
    	$scope.showArtistModule = true;
    	$scope.showAddArtist = false;
    	$scope.showArtistConfig = true;
    	$scope.showAddArtistSelect = true;
    	
    	$scope.updateImage = false;
    	$scope.updateDetails = false;
    	$scope.updateLocation = false;
    	
    	// récupération des données créations
    	if ($scope.cType == "galerie"){
      		$http({method: 'GET', url:'/gallery_creations.json?id='+idCreator}).success(function(data){
      			if (data){
					creators.creator = data;
					creators.constants = [];
					console.log(data);
					// on set up l'id de creation suivant
					if (creators.creator[0].creator.id_creation_next){
						console.log("id creation next : ", creators.creator[0].creator.id_creation_next);
						$scope.creationId = creators.creator[0].creator.id_creation_next+1;
						console.log("creation id next : ", $scope.creationId);
					} else {
						$scope.creationId = 0;
						creators.creator[0].creator.id_creation_next = 0;
					}
					$scope.newCreationUrl = idCreator+"_"+$scope.creationId+".png";
					if (creators.creator[0].creator.creations){
						// les creations
						if (creators.creator[0].creator.creations[0]){
							$scope.nbCreation = creators.creator[0].creator.creations.length;
							if ($scope.nbCreation === 10) {
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
                        // si pas de creation
					}
					if (creators.creator[0].creator.artiste_details){
					    $scope.showArtistConfig = true;
					    $scope.showAddArtist = false;
					} else {
                        $scope.showArtistConfig = true;
					    $scope.showAddArtist = false;					    
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
      		console.log("else error");
      	}
      	
      	// FONCTION DE PARAMETRAGE NG SHOW
    	$scope.changeShowParam = function(index){
    		if (index < 0 || index > 10) {return;}
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
					$scope.showArtistModule = false;
					
					$scope.showPreview = false;
					
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
    				break;
    			// menu de config IMAGE ajoutée
    			case 2: // modifier la position de l'image
    				$scope.showThumbnailList = true;
    				
    				$scope.showCreationConfig = true;
    				
					$scope.showAddImageButton = false;
					$scope.showArtistModule = false;
					
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
    				$scope.showArtistModule = false;
    				
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
					$scope.showArtistModule = false;
					
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
					$scope.showArtistModule = false;
					
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
					$scope.showArtistModule = false;
					
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
					$scope.showArtistModule = false;
					
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
					$scope.showArtistModule = false;
					
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
					$scope.showArtistModule = false;
					
					$scope.showGeolocationModule = false;
					$scope.showGeolocationSavingButton = false;
					$scope.hideGeolocationSavingButton = true;
					$scope.showGetPosition = false;
					
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 5){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
					break;
				// menu de config IMAGE positionnée
				
    			case 10: // afficher le param artiste
    				$scope.showThumbnailList = true;
    				
    				$scope.showCreationConfig = true;
    				$scope.showPreview = true;
    				
					$scope.showAddImageButton = false;
					$scope.showChangeImageButton = false;
					
					$scope.showDescriptionModule = false;
					
					$scope.showGeolocationSavingButton = false;
					$scope.showGetPosition = false;
					$scope.hideGeolocationSavingButton = true;
					$scope.showGeolocationModule = false;
					$scope.showAdminModule = false;
					
					if ($scope.nbCreation == 10){$scope.showCreationAddButton = false;}else {$scope.showCreationAddButton = true;}
					
					// modification de l'affichage du module auteur
					$scope.showArtistModule = true;
					
					// si defini 
					console.log("select artiste");
					if ($scope.idArtiste >= 0) {
					    $scope.showAddArtistSelect = false;
					    $scope.showArtistConfig = false;
					    $scope.showAddArtist = false;
					}  else {
					    $scope.showAddArtistSelect = true;
					    if (creators.creator[0].creator.artiste_details){
					        if (creators.creator[0].creator.artiste_details.length > 0){
                                $scope.showArtistConfig = true;    
                                $scope.showAddArtist = false;
                            }
					    }else {
					        $scope.showArtistConfig = false;    
					        $scope.showAddArtist = true;    
					    }
					}
    				break;
    		}	
    	}
    	
    	this.addCreation = function(){
			// on calcule la valeur de idcreation et de l'url
			if (creators.creator[0].creator.id_creation_next){$scope.creationId = creators.creator[0].creator.id_creation_next+1;}
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
			$scope.cartel="";
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
    		console.log("add image to creation");
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
    				console.log("success");
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
						// TO DO 
						
					}
					creators.creator[0].creator.id_creation_next++;
					$scope.nbCreation=creators.creator[0].creator.creations.length;
					$scope.updateImage = true;
					
					$scope.changeShowParam(10);
    			}).error(function(data, status, header, config){
    				console.log("error");
				}).then(function(httpData){
					if(httpData.statusText == "OK"){
					}
      			});
    	}
    	
    	this.addArtistToCreation = function(){
    	    if ($scope.idArtiste == 0) {
    		    $scope.changeShowParam(10);
    		    return;
    		}
    		console.log("add artist to creation : ", $scope.creationId);
    	    $http({method: action, url: '/creation_artist?id_creation='+$scope.creationId+
    							'&id_artiste='+$scope.idArtiste
				})
    			.success(function(data, status, header, config){
    				// si ca fonctionne on enregistre les paramètres dans la structure locale
						// creation de la structure locale
					// recherche de l'index ou ajouter
					if (creators.creator[0].creator.creations){
						for (var i = 0; i < creators.creator[0].creator.creations.length; i++){
							if (creators.creator[0].creator.creations[i].id_creation == $scope.creationId){
								if (creators.creator[0].creator.creations[i]){
									creators.creator[0].creator.creations[i].push({
										"id_artiste":$scope.idArtist
									});
									break;
								}else {
									creators.creator[0].creator.creations[i] = [];
									creators.creator[0].creator.creations[i].push({
										"id_artiste":$scope.idArtist
									});
									break;
								}
							}
						}
						//$scope.updateDetails = true;
					}else {
					}
					$scope.changeShowParam(3);
    			}).error(function(data, status, header, config){
				}).then(function(httpData){
					if(httpData.statusText == "OK"){
					}
      			});
    	}
    	
    	this.clickButtonAddArtist = function(){
    	    $scope.showAddArtist = true;
    	    $scope.showArtistConfig = false;
    	}
    	
    	this.addArtistToImage = function(){
    	
    	    console.log($scope.lName);
    	    console.log($scope.fName);
    	    console.log($scope.bio);
    	    
    	    var tmpFName = $scope.stringToDB($scope.fName),
    	        tmpLName = $scope.stringToDB($scope.lName),
    	        tmpBio = $scope.stringToDB($scope.bio);
    	    console.log(tmpFName);
    	    console.log(tmpLName);
    	    console.log(tmpBio);
    	    
    	    if (creators.creator[0].creator.artiste_details) $scope.idArtiste = creators.creator[0].creator.artiste_details.length+1;
    	    else $scope.idArtiste = 0;
    	    
    	    // on ajoute l'artiste à la liste des artistes
    	    $http({method: 'POST', url: '/gallery_artist?id='+$scope.idCreator+
                            '&id_artiste='+$scope.idArtiste+
                            '&fName='+tmpFName+
                            '&lName='+tmpLName+
                            '&bio='+tmpBio
            })
            .success(function(data, status, header, config){
                // on ajoute l'artiste à la liste des artistes de la galerie
                
                // A VERIFIER SI C'EST LE PREMIER ARTISTE
                if (!creators.creator[0].creator.artiste_details) creators.creator[0].creator.artiste_details = []; 
                creators.creator[0].creator.artiste_details.push({
                    "fname":$scope.fName,
                    "lname":$scope.lName,
                    "bio":$scope.bio,
                    "id_artiste_gallery":$scope.idArtiste
                });
                
                console.log("update artiste creation after saving artist", $scope.idArtiste, $scope.creationId);
                
                // on update l'artiste associé à la création.
                $http({method: 'PUT', url: '/creation_artist?id='+$scope.idCreator+
                                '&id_artiste='+$scope.idArtiste+
                                '&id_creation='+$scope.creationId
                        })				
                .success(function(data, status, header, config){
                    // add artiste to the creation  
                    console.log("add artiste to creation");
                    for (var i = 0; i < creators.creator[0].creator.creations.length; i++){
                        if (creators.creator[0].creator.creations[i].id_creation == $scope.creationId){
                            creators.creator[0].creator.creations[i].id_artiste = $scope.id_artiste;
                            
                            // on modifie l'affichage
                            $scope.showAddArtist = false;
                            $scope.showAddArtistSelect = false;
                            $scope.showAddArtistConfig=false;
                            $scope.showAddArtistSelect = false;
                        }
                    }
                }).error(function(data, status, header, config){
                }).then(function(httpData){
                    if(httpData.statusText == "OK"){
                    }
                });
                
                
            }).error(function(data, status, header, config){
            }).then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            });   	
            
            // on change l'affichage
    	}
    	
    	$scope.stringToDB = function(value) {
    	    var tmpString ="";
    	    
    	    for (var i=0; i < value.length;i++){
    			if (value[i] === "'") {
    				tmpString = tmpString + "''";
    				i += 1;
    			} if (value[i] === "‘") {
    				tmpString = tmpString + "''";
    				i += 1;
    			} if (value[i] === "#"){
    			    tmpString= trmpString + "%23";
    			    i += 2;
    			} else{
    				tmpString = tmpString + value[i];
    			}
    			console.log("tmpString", i,  tmpString);
    		}
    		console.log("tmpString : ", tmpString);
    		return tmpString;
    	}
    	
    	this.addCreationDetailToImage = function(){
    		// on modifie le format de la date 
    		// on modifie les caractères spéciaux du cartel
    		// on vérifie qu'un auteur est attribué
    		
    		console.log("$scope.cartel : ", $scope.cartel);
    		
    		var tmpCartel=$scope.stringToDB($scope.cartel),
    		    tmpTitle=$scope.stringToDB($scope.title);
    		
    		console.log("tmp cartel : ", tmpCartel);
    		
			var action="";
    		if (!$scope.updateDetails){action="POST";} else {action="PUT";}
    		var creationDate = $filter('date')($scope.dateCreation, 'yyyy-MM');
    		
    		console.log("tmpCartel : ", tmpCartel);
    		console.log("tmpCartel : ", tmpTitle);
    		
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
						console.log(creationTmp);
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
    	
    	// artiste select
    	this.getArtistSelected=function(artiste){
    	    console.log("select artist : ", artiste);
    	    $scope.fName = artiste.fname;
    	    $scope.lName = artiste.lname;
    	    $scope.bio = artiste.bio;
    	    $scope.idArtiste = artiste.id_artiste_gallery;
    	    
    	    console.log("id : ", $scope.idCreator);
    	    console.log("id_creation : ", $scope.creationId);
    	    
    	    // on update l'artiste associé à la création.
    	    $http({method: 'PUT', url: '/creation_artist?id='+$scope.idCreator+
                            '&id_artiste='+$scope.idArtiste+
                            '&id_creation='+$scope.creationId
                    })				
            .success(function(data, status, header, config){
                // add artiste to the creation  
                for (var i = 0; i < creators.creator[0].creator.creations.length; i++){
                    if (creators.creator[0].creator.creations[i].id_creation == $scope.creationId){
                        creators.creator[0].creator.creations[i].id_artiste = $scope.idArtiste;
                        console.log("getArtiste select : author set up");
                    }
                }
            }).error(function(data, status, header, config){
            }).then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            }); 
    	    
    	    $scope.showAddArtistSelect = false;
    	    $scope.showArtistConfig = false;
    	}
    	
        this.cancelSelectedArtist = function(){
            $scope.showAddArtistSelect= true;
            $scope.showArtistConfig = true;
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
		    console.log("clickThumb");
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
    		
    		$scope.idArtiste = creation.id_artiste;
    		
    		var bool = true;
    		
    		$scope.updateImage = true;
    		$scope.changeShowParam(3);
    		
    		
    		console.log("$scope.idArtiste", $scope.idArtiste);
    		console.log("creators.creator[0].creator.artiste_details", creators.creator[0].creator.artiste_details);
    		// setup de la div auteur
    		if ($scope.idArtiste >= 0 && creators.creator[0].creator.artiste_details.length > 0){
    		    console.log("creation has author");
                for (var i = 0; i < creators.creator[0].creator.artiste_details.length; i++){
                    if (creators.creator[0].creator.artiste_details[i].id_artiste_gallery == $scope.idArtiste){
                        console.log("artiste found");
                        // on charge les données
                        $scope.fName = creators.creator[0].creator.artiste_details[i].fname;
                        $scope.lName = creators.creator[0].creator.artiste_details[i].lname;
                        $scope.bio = creators.creator[0].creator.artiste_details[i].bio;
                        
                        // on préset l'affichage.
                        $scope.showArtistConfig = false;
                        $scope.showAddArtistSelect = false;
                        $scope.showAddArtist = false;
                        
                        break;
                    }
                }
    		} else {
    		    console.log("author not found");
    		    bool = false;
    		    $scope.showAddArtistSelect = true;
    		    $scope.changeShowParam(10);
    		    if ( creators.creator[0].creator.artiste_details && creators.creator[0].creator.artiste_details.length > 0) {
    		        $scope.showArtistConfig = true;
    		        $scope.showAddArtiste = false;
    		    } else {
    		        $scope.showArtistConfig = false;
    		        $scope.showAddArtiste = true;
    		    }
    		    // on met les autres valeurs à false
    		}
    		
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
				
				if (bool) {$scope.changeShowParam(4);}
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
    			
    			if (bool) {$scope.changeShowParam(8);}
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
		
		this.clickOnDivConfigArtist = function(){
			$scope.changeShowParam(10);
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
   				console.log("click thumbnail - url : ", myUrl);
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
				scope.$parent.image.crossOrigin = "Anonymous";
				
				scope.$parent.image.onload = function(){
				    console.log("image load");
					catalog_canvas.getContext('2d').drawImage(scope.$parent.image, scope.creation.p_x, scope.creation.p_y, scope.creation.d_x, scope.creation.d_y, 0, 0, 308, 548);
					thumbnail_canvas.getContext('2d').drawImage(scope.$parent.image, scope.creation.t_p_x, scope.creation.t_p_y, scope.creation.t_d_x, scope.creation.t_d_x, 0, 0, 275, 275);
					
					thumb_elem.src = thumbnail_canvas.toDataURL();
					
					catalog_elem.style.height = "548px";
					catalog_elem.style.backgroundImage = "url(	"+catalog_canvas.toDataURL()+")";
					catalog_elem.style.backgroundSize = "308px 548px;"
					catalog_elem.style.backgroundRepeat = "no-repeat";

					$('#creationParam').goTo();
				}
				scope.$parent.image.onerror = function(err){
				    console.log("thumbnail click image load error : ", err);
				}
				
				scope.$parent.image.src = myUrl;
				
				if ( scope.$parent.image.complete || scope.$parent.image.complete === undefined ) {
				    scope.$parent.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
			    	scope.$parent.image.src = scope.$parent.image.src = myUrl;
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
   	
   	 app.directive("cartelFooter", function (){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/footer.html'
        }    
    });
   	
})();