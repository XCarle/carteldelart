(function() {
    var app = angular.module('events', ['ngRoute']);

    app.controller('eventsController', ['$http', '$scope', '$window', function($http, $scope, $window) {
	    // data
	    $scope.idCreator = window.idCreator;
	    
        $scope.eName = "";
        $scope.eAdresse = "42 rue de Poitou, 75003 Paris";
        $scope.eLongitude = 0;
        $scope.eLatitude = 0;
        $scope.eDebut = '';
        $scope.eFin = '';
        $scope.eDescription = "";
        $scope.eUrl = "";
        $scope.eWidth = "";
        $scope.eHeight = "";
        $scope.url ="";
        $scope.idvalid = false;
        $scope.e_x = "";
        $scope.e_y = "";
        $scope.e_d_x = "";
        $scope.e_d_y = "";
        
        $scope.creationToAdd = [];
        $scope.creationToRemove = [];
        $scope.existingCreations = [];
        // affichage
        $scope.showExhibitionList = true;
        $scope.showExhibitionConfig = true;
        $scope.showExhibitionPreview = true;
        
        $scope.showCreationSelect = true;
        $scope.showCreationPreview = true;
        $scope.showAddCreationConfig = true;
        
        $scope.action = "POST";
        
        // initialisation des données.
        $scope.showExpositionConfigPanel = false;
        
    	$scope.events_details = [];
        
        $http({method: 'GET', url:'/exposition_details.json?id='+idCreator}).success(function(data){
            
            $scope.events_details = data;
            $scope.newExhibitionUrl = idCreator+"_"+($scope.events_details[0].gallery.id_exposition_next+1)+".png";
            
            if ($scope.events_details[0].gallery.gallery_exhibitions){
                for (var i = 0; i < $scope.events_details[0].gallery.gallery_exhibitions.length; i++){
                    $scope.events_details[0].gallery.gallery_exhibitions[i].issvg = true;
                }
            }
            console.log($scope.events_details);
            
        }).error(function(data, status, header, config){
			console.log("error");
		}).then(function(httpData){
			if(httpData.statusText == "OK"){
			}
		});
        // gestion de l'affichage en fonction de l'évolution des données.
        
        // gestion des interactions.
	    
	    this.selectEvent = function(event, index){
	        $scope.selectedEvent = index;
	        $scope.eName = event.e_name;
	        $scope.eAdresse = event.adresse;
	        $scope.eLongitude = event.longitude; 
	        $scope.eLatitude = event.longitude;
	        $scope.eDebut = event.date_debut;
	        $scope.eFin = event.date_fin;
	        $scope.eDescription = event.e_description;
	        $scope.eWidth = event.width;
	        $scope.eHeight = event.height;
	        $scope.e_x = event.t_p_x;
	        $scope.e_y = event.t_p_y;
	        $scope.e_d_x = event.t_d_x;
	        $scope.eUrl = event.url;
	        $scope.exhibitionId  = event.id_exposition;
	        
            $scope.selectedExhibition = index;
            $scope.existingCreations = JSON.parse(JSON.stringify($scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations));
            if (!$scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations){
                console.log("coucou select", $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations);
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations = [];
            }
	        $scope.showExpositionConfigPanel = true;
	        
	        $scope.action = "PUT";
	    }
	    
	    this.addExhibition = function(){
	        $scope.selectedEvent = 0;
	        $scope.eName = "";
	        
	        if ($scope.events_details[0].gallery.gallery_detail){
	            $scope.eAdresse = $scope.events_details[0].gallery.gallery_detail[0].g_adresse;
	            console.log("ici");
	        }else {
	            $scope.eAdresse = "";
	        }
	        console.log("adresse : ", $scope.eAdresse);
	        $scope.eLatitude = "";
	        $scope.eLongitude = "";
	        $scope.eDebut = "";
	        $scope.eFin = "";
	        $scope.eDescription = "";
	        $scope.width = "";
	        $scope.height = "";
	        $scope.e_x = "";
	        $scope.e_y = "";
	        $scope.e_d_x = "";
	        if ($scope.events_details[0].gallery.id_exposition_next >= 0){
	            console.log("id exposition next : ", $scope.events_details[0].gallery.id_exposition_next);
	            $scope.exhibitionId = $scope.events_details[0].gallery.id_exposition_next+1;
	        }
	        else { console.log("exhibition i d = 0");$scope.exhibitionId = 0;}
	        $scope.eUrl = idCreator+"_"+$scope.exhibitionId+".png";;
	        $scope.eLongitude = 0;
            $scope.eLatitude = 0;
        
	        $scope.showExpositionConfigPanel = true;
	        
	        if ($scope.events_details[0].gallery.gallery_exhibitions){
	            $scope.selectedExhibition = $scope.events_details[0].gallery.gallery_exhibitions.length;
	        }else {
	            $scope.selectedExhibition = 0;
	        }
	        
	        $scope.existingCreations = [];
	        
	        if (!$scope.events_details[0].gallery.gallery_exhibitions)
	            $scope.events_details[0].gallery.gallery_exhibitions = [];
	            
	        $scope.events_details[0].gallery.gallery_exhibitions.push({
	            "adresse":$scope.eAdresse,
	            "date_debut":$scope.eDebut,
	            "date_fin":$scope.eFin,
	            "e_description":$scope.e_description,
	            "e_name":$scope.eName,
	            "exposition_creations":$scope.existingCreations,
	            "isvalid":false,
	            "issvg": false,
	            "height":$scope.eHeight,
	            "id_exposition":$scope.exhibitionId,
	            "latitude":$scope.eLatitude,
	            "longitude":$scope.eLongitude,
	            "t_d_x":$scope.e_d_x,
	            "t_p_x":$scope.e_x,
	            "t_p_y":$scope.e_y,
	            "width":$scope.eWidth
	        });
	        
	        console.log($scope.events_details[0].gallery.gallery_exhibitions);
	    }
	    
	    // ajoute une creation a la liste des creation de l'expo
	    this.selectCreation = function(creation){
	        console.log("select creation");
	        // on teste si la creation ne fait pas déjà partie de la liste des creation 
	        for (var i = 0; i < $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations.length; i++){
	            console.log(i);
	            if ($scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations[i].id_creation == creation.id_creation){
	                console.log('remove');
	                this.removeCreation($scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations[i].id_creation);
	                return;
	            }
	        }
	        // on ajoute l'oeuvre selectionné aux créations de l'exposition.
	        $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations.push({
	            "id_creation":creation.id_creation,
	            "id_exposition":$scope.exhibitionId
	        });
            
	        // on vérifie qu'elle n'existe déjà pas dans les créations de l'exposition
	        if ($scope.existingCreations){
                for (var j = 0; j < $scope.existingCreations.length; j++){
                    if ($scope.existingCreations[j].id_creation == creation.id_creation){
                        console.log($scope.existingCreations);
                        console.log("return");
                        break;
                    }
                }
	        }
            
            console.log("creation to add on array");
            console.log("with exhibitions : ", $scope.events_details[0].gallery.gallery_exhibitions);
	        // on ajoute l'oeuvre selectionné aux créations à ajouter si elle n'existe pas déjà 
	        $scope.creationToAdd.push({
	            "id_creation":creation.id_creation,
	            "id_exposition":$scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].id_exposition
	        });
	        console.log("creation to add just been pushed : ", $scope.creationToAdd);
	        console.log("size of creation to remove : ", $scope.creationToRemove.length);
	        // on enlève la création des oeuvres à enlever
	        for (var k = 0; k < $scope.creationToRemove.length; k++){
	            console.log(k);
	            if ($scope.creationToRemove[k] == creation.id_creation){
	                $scope.creationToRemove.splice(k,1);
	                console.log("creation to remove spliced : ", $scope.creationToRemove);
	                break;
	            }
	        }
	    };
	    
	    // enlève une creation de la liste des creation de l'expo
	    this.removeCreation = function(id_creation){
	        console.log("remove creation");
            for (var i = 0; i < $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations.length; i++) {
                if ($scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations[i].id_creation == id_creation){
                    $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].exposition_creations.splice(i, 1);
                    // on en enlève la creation de la liste des créations à ajouter
                    for (var j = 0; j < $scope.creationToAdd.length; j++){
                        if ($scope.creationToAdd[j].id_creation = id_creation){
                            $scope.creationToAdd.splice(j,1);
                            break;
                        }
                    }
                    if ($scope.existingCreations){
                        for (var k = 0; k < $scope.existingCreations.length; k++){
                            if ($scope.existingCreations[k] == id_creation) {
                                console.log("remove creation from array");
                                $scope.creationToRemove.push({
                                    "id_creation":creation.id_creation,
                                    "id_exposition":$scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].id_exposition
                                });
                                break;
                            }
                        }
                    }
                    // on ajoute la création dans la liste des créations à retirer
                    return;
                }
            }
	    };
	    
	    // GEOLOCALISATION
    	this.clickGeolocation = function(){
    	    console.log("click geoloc");
    		$http({method:'GET', url:'https://maps.googleapis.com/maps/api/geocode/json?address='+$scope.eAdresse
    					+'&key=AIzaSyA62f9rWqmGsKRZRBkKS-i733eUBX969pE'})
    		.success(function(data, status, header, config){
    			if (data. status == "OK"){
    				$scope.eLatitude = data.results[0].geometry.location.lat;
    				$scope.eLongitude = data.results[0].geometry.location.lng;
    				console.log("eLatitude : ", $scope.eLatitude);
    				console.log("eLongitude : ", $scope.eLongitude);
    			}
    		}).error(function(data, status, header, config){
			}).then(function(httpData){});
    	}
	    
	    $scope.stringToDB = function(value) {
    	    var tmpString ="";
    	    console.log(value);
    	    for (var i=0; i < value.length;i++){
    			if (value[i] === "'") {
    				tmpString = tmpString + "''";
    			} else if (value[i] === "#"){
    			    tmpString= tmpString + "%23";
    			} else{
    				tmpString = tmpString + value[i];
    			}
    		}
    		console.log(tmpString);
    		return tmpString;
    	}
    	
	    // validate event changes
	    this.addEvent = function(){
	        console.log("add event");
	        console.log("creation to add : ",$scope.creationToAdd);
	        console.log("creation to remove : ", $scope.creationToRemove);
	        
	        // on ajoute les creations à ajouter
	        for (var i = 0; i < $scope.creationToAdd.length; i ++){
                $http({method: 'POST', url:'/exposition_creations.json?id_exposition='
                    +$scope.creationToAdd[i].id_exposition
                    +"&id_creation="+$scope.creationToAdd[i].id_creation
                })
                .success(function(data){ })
                .error(function(data, status, header, config){
                    console.log("error");
                })
                .then(function(httpData){
                    if(httpData.statusText == "OK"){
                    }
                });
            }
            
            // on retire les créations de l'évènement à retirer
            for (var j = 0; j < $scope.creationToRemove.length; j++){
                $http({method: 'DELETE', url:'/exposition_creations.json?id_exposition='
                        +$scope.creationToRemove[j].id_exposition
                        +"&id_creation="+$scope.creationToRemove[j].id_creation
                })
                .success(function(data){})
                .error(function(data, status, header, config){
                    console.log("error");
                })
                .then(function(httpData){
                    if(httpData.statusText == "OK"){
                    }
                });
            }
            
            var tmpName = $scope.stringToDB($scope.eName);
            var tmpDescription = $scope.stringToDB($scope.eDescription);
            var tmpAdresse = $scope.stringToDB($scope.eAdresse);
            
            
            if ((!$scope.eLatitude && $scope.eLatitude ==0) || (!$scope.eLongitude && $scope.eLongitude ==0)){
                this.clickGeolocation();
            }
            
	        // on ajoute  ou on modifie les paramètres de l'évènement 
	        $http({method: $scope.action, url:'/exposition_details.json?id_gallery='
	                +$scope.idCreator
	                +"&id_exposition="+$scope.exhibitionId
	                +"&e_name="+tmpName
	                +"&url="+$scope.eUrl
	                +"&height="+$scope.eHeight
	                +"&width="+$scope.eWidth
	                +"&e_p_x="+$scope.e_x
	                +"&e_p_y="+$scope.e_y
	                +"&e_d_x="+$scope.e_d_x
	                +"&e_debut="+new Date($scope.eDebut)
	                +"&e_fin="+new Date($scope.eFin)
	                +"&e_description="+tmpDescription
	                +"&e_adresse="+tmpAdresse
	                +"&e_latitude="+$scope.eLatitude
	                +"&e_longitude="+$scope.eLongitude
            })
            .success(function(data){
                // afficher l'évènement
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].isvalid = false;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].issvg = true;
                
                // push evenement
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].url = $scope.eUrl;
                console.log("$scope.eUrl : ", $scope.eUrl);
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].adresse = $scope.eAdresse;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].date_debut = $scope.eDebut;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].date_fin= $scope.eFin;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].e_description = $scope.eDescription;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].e_name = $scope.eName;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].height = $scope.eHeight;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].t_d_x = $scope.e_d_x;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].t_p_x = $scope.e_x;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].t_p_y = $scope.e_y;
                $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition].width = $scope.eWidth;
                console.log("$scope.events_details[0].gallery.gallery_exhibitions", $scope.events_details[0].gallery.gallery_exhibitions[$scope.selectedExhibition]);
            })
            .error(function(data, status, header, config){
                console.log("error");
            })
            .then(function(httpData){
                if(httpData.statusText == "OK"){
                }
            });
	    }
	}]);
	
	// CONTROLLER
	// creation Controller
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
      		$http({method: 'GET', url:'/creator_creations.json?id='+idCreator})
      		    .success(function(data){
      			if (data){
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
      		})
      		    .error(function(data, status, header, config){
      			console.log("error");
			})
			    .then(function(httpData){
				if(httpData.statusText == "OK"){
				}
      		});
      	}
      	else {
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
    	
    	this.changeGeolocation = function(){
    		$scope.adresse = "";
    		$scope.latitude = 0;
    		$scope.longitude = 0;
    		
    		$scope.changeShowParam(5);
    		// set up update bool here.
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
	
	
	// directive d'initialisation de l'affichage.
	// DIRECTIVE pour le chargement des images de la liste.
	// setupPreview
	app.directive("setUpPreview", function(){
		return function(scope, element){
			angular.element(document).ready(function(){
			    console.log("set up preview", scope);
				// on récupère l'élément
				var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+scope.creation.url;
				var thumbnail_canvas = document.createElement('canvas');
				thumbnail_canvas.width = 150;
				thumbnail_canvas.height = 150;
				
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
	
	app.directive("expositionCreations", function(){
	    return {
    		restrict : 'A',
    	    link:function(scope,element){
				angular.element(document).ready(function (){
				    // on récupère les données de selection
				    console.log("exposition creations : ", scope);
				    
				    var myCreations = scope.$parent.events_details[0].gallery.gallery_creations;
				    
				    
				    for (var i = 0; i < myCreations.length; i++){
				        if (myCreations[i].id_creation == scope.exhibitionCreation.id_creation){
				            break;    
				        }
				    }
				    
				    if (i == myCreations.length){ return; }
				    
				    var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+myCreations[i].url;
    				// charger les images
    				var thumbnail_canvas = document.createElement('canvas');
                    thumbnail_canvas.width = 140;
                    thumbnail_canvas.height = 140;
                
                    var imageTmp = new Image();
                    imageTmp.crossOrigin = "Anonymous";
                    
                    imageTmp.onload = function(){
                        thumbnail_canvas.getContext('2d').drawImage(imageTmp, myCreations[i].t_p_x, myCreations[i].t_p_y, myCreations[i].t_d_x, myCreations[i].t_d_x, 0, 0, thumbnail_canvas.width, thumbnail_canvas.height);
                        scope.$parent.events_details[0].gallery.gallery_exhibitions[scope.selectedExhibition].exposition_creations[scope.$index].thumbnailUrl = "url("+thumbnail_canvas.toDataURL()+")";
                        document.getElementById('listCreationThumb_'+scope.$parent.events_details[0].gallery.gallery_exhibitions[scope.selectedExhibition].exposition_creations[scope.$index].id_creation).style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")";
                    }
                    imageTmp.src = myUrl;
                    
                    });
   			}
   		}
	});
	
	app.directive("setupExhibitionPreview", function(){
        return {
                restrict : 'A',
                scope:{
                    withsrc: "@",
                    withtpx:"@",
                    withtpy:"@",
                    withtdx:"@"
                },
                controller:['$scope', function($scope){
                    $scope.$watch("withsrc", function(newValue, OldValue, scope){
                        
                        if (scope.withsrc){
                            var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelexposition/"+scope.withsrc;
                            // charger les images
                            var thumbnail_canvas = document.createElement('canvas');
                        
                            thumbnail_canvas.width = 125;
                            thumbnail_canvas.height = 125;
                
                            var imageTmp = new Image();
                            imageTmp.crossOrigin = "Anonymous";
                        
                            imageTmp.onload = function(){
                                thumbnail_canvas.getContext('2d').drawImage(imageTmp,scope.withtpx, scope.withtpy, scope.withtdx, scope.withtdx, 0, 0, thumbnail_canvas.width, thumbnail_canvas.height);
                                console.log(scope.$parent.events_details[0]);
                                scope.$parent.events_details[0].gallery.gallery_exhibitions[scope.$parent.$index].thumbnailUrl = "url("+thumbnail_canvas.toDataURL()+")";
                                document.getElementById('exhibitionImage_'+scope.$parent.events_details[0].gallery.gallery_exhibitions[scope.$parent.$index].id_exposition).src = thumbnail_canvas.toDataURL();
                            }
                            imageTmp.src = myUrl;
                        }
                    });   
                }],
                link:function(scope,element){
                    angular.element(document).ready(function (){
                        // on récupère les données de selection
                        console.log("scope : : ", scope);
                        
                        
                    });
                }
            }
	});
	
	app.directive("clickExhibition", function(){
	    
   		$.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    	}
   		
   		return function (scope, element, attr){	
   			element.bind("click", function(){
   			    console.log("click exhibition clicked");
                // on récupère l'objet creation selectionné
                console.log(scope.eUrl);
                if (scope.eUrl.length > 0){
                    if (scope.eUrl.length){
                        var myUrl = "https://s3.eu-central-1.amazonaws.com/cartelexposition/"+scope.eUrl;
                
                        var thumbnail_canvas = document.createElement('canvas');
                
                        thumbnail_canvas.width = 308;
                        thumbnail_canvas.height = 308;
        
                        var imageTmp = new Image();
                        imageTmp.crossOrigin = "Anonymous";
                
                        imageTmp.onload = function(){
                            thumbnail_canvas.getContext('2d').drawImage(imageTmp, scope.e_x, scope.e_y, scope.e_d_x, scope.e_d_x, 0, 0, 308, 308);
                    
                            document.getElementById("buttonAddExhibitionImage").src = thumbnail_canvas.toDataURL();
                            document.getElementById("buttonAddExhibitionImage").style.width = "156px";
                            document.getElementById("buttonAddExhibitionImage").style.height = "156px";
                            document.getElementById("buttonAddExhibitionImage").style.marginLeft="-13px";
                            document.getElementById("buttonAddExhibitionImage").style.marginTop="-30px";
                    
                            document.getElementById("exhibitionImage").style.height = "308px";
                            document.getElementById("exhibitionImage").style.backgroundImage = "url("+thumbnail_canvas.toDataURL()+")"; 
                        }
                
                        imageTmp.src = myUrl;
                    }
                }
                $('#exhibitionConfigPanel').goTo();
                
                
	        });
	    };
	});
	
	app.directive("clickNewExhibition", function(){
	    
   		$.fn.goTo = function() {
        $('html, body').animate({
            scrollTop: $(this).offset().top + 'px'
        }, 'fast');
        return this; // for chaining...
    	}
   		
   		return function (scope, element, attr){	
   			element.bind("click", function(){
   			    console.log("click exhibition clicked");
                // on récupère l'objet creation selectionné
                    
                document.getElementById("buttonAddExhibitionImage").src = "/img/cartel 7_select-image-medium.png";
                document.getElementById("buttonAddExhibitionImage").style.width = "90px";
                document.getElementById("buttonAddExhibitionImage").style.height = "90px";
                document.getElementById("buttonAddExhibitionImage").style.marginLeft="0px";
                document.getElementById("buttonAddExhibitionImage").style.marginTop="0px";
                
                document.getElementById("exhibitionImage").style.height = "200px";
                document.getElementById("exhibitionImage").style.backgroundImage = "none"; 
            
                $('#exhibitionConfigPanel').goTo();
                
                
	        });
	    };
	});
	
	app.directive("cartelFooter", function (){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/footer.html'
        }    
    });
})();