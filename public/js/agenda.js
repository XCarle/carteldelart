(function() {
    var app = angular.module('agenda', ['ngRoute']);
    
    app.controller('AgendaController', ['$scope', '$filter', '$window','$http' , function($scope, $filter, $window, $http) {
        
        var agenda = this;
    	$scope.evenements = [];
        agenda.calendar = [];
        
        $scope.agendaTab = true;
        
        $scope.sizeFit = function(){
            if ($window.innerWidth < 768){
                return true;
            } else {
                return false;
            }
        };
        
        $scope.dateW = new Date();
        
        $scope.showY = false;
        $scope.showM = false;
        $scope.showD = false;
        $scope.showT = false;
        
        $scope.changeAgendaMsg = false;
        
        $scope.M = ['Tous', 'Jan.', 'Fév.', 'Mars', 'Avril', 'Mai', 'Juin', 'Jui.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
        $scope.Y = ['2015', '2016'];
        $scope.D = ['Tous','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];

        $scope.T = ["Tous les types d'évènement",'Biennale','Concert','Conférence','Décrochage','Exposition','Film', 'Foire','Installation','Performance','Prix','Rencontre','Vernissage'];
        
        $scope.typeS = $scope.T[0];
        
         var transformD = function(value){
            console.log("transform D : ", value);
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
            console.log($scope.D);
        }
        
        // on modifie les jours ref en fonction de la date.
        var currentM = $scope.dateW.getMonth()+1;
        if ( (currentM == 1) || (currentM==3)  || (currentM==5)  || (currentM==7)  || (currentM==8)  || (currentM==10) || (currentM==12)) {transformD(31);}
                else if ( (currentM == 4) || (currentM==6)  || (currentM==9)  || (currentM==11)) {transformD(30);}
                else if ( (currentM == 2)) { if ($scope.dateW.getFullYear() == 2016) {transformD(29);}else {transformD(28)}}
        
        $scope.allM = false;
        $scope.allD = false;
        
        $scope.agendaMsg = "";
        
        $scope.getEvents = function(date_debut, date_fin){
            console.log("$scope.getEvents");
            $scope.date_debut = date_debut;
            $scope.date_fin = date_fin;
            $http({method: 'GET', url:'/agenda.json?date_debut='+date_debut
                                                +"&date_fin="+date_fin
            })
            .success(function(data){
                $scope.evenements = data;
                if (data.length == 0){
                    $scope.changeMessage();
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
        
        $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate(), $scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+$scope.dateW.getDate());
        
        this.clickY = function(){
            $scope.showY = !$scope.showY;
            
            if ($scope.showM) $scope.showM=false;
            if ($scope.showD) $scope.showD=false;
            if ($scope.showT) $scope.showT=false;
        };
        
        this.clickM = function(){
            $scope.showM = !$scope.showM;
            
            if ($scope.showY) $scope.showY=false;
            if ($scope.showD) $scope.showD=false;
            if ($scope.showT) $scope.showT=false;
        };
        
        this.clickD = function(){
            $scope.showD = !$scope.showD;
            
            if ($scope.showY) $scope.showY = false;
            if ($scope.showM) $scope.showM = false;
            if ($scope.showT) $scope.showT=false;
        };
        
        this.clickT = function(){
            $scope.showT = !$scope.showT;
            if ($scope.showD) $scope.showD = false;
            if ($scope.showM) $scope.showM = false;
            if ($scope.showY) $scope.showY = false;
        }
        
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
            console.log("selectM : ", M);
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
            console.log("selectD : ", D);
            if (D == "Tous"){
                $scope.allD = true;
                console.log("month : ", $scope.dateW.getMonth());
                console.log("days : ", $scope.D.length-1);
                $scope.getEvents($scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-01", $scope.dateW.getFullYear()+"-"+($scope.dateW.getMonth()+1)+"-"+($scope.D.length-1));
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
        
        
        this.selectT = function(type){
            // on modifie la liste des ng-repeat d'évènement en fonction du type.
            $scope.typeS = type;
            //console.log("select T : ", type);
            $scope.changeAgendaMsg = false;
        }
        
        this.showEvenement = function(evenement, last){
            if ($scope.typeS == "Tous les types d'évènement"){
                //console.log("show event 1 true");
                if (!$scope.changeAgendaMsg) {$scope.changeAgendaMsg = true;$scope.agendaMsg = "";}
                return true;
            } else if (evenement.evenement.type == $scope.typeS){
                //console.log("show event 2 true");
                if (!$scope.changeAgendaMsg) {$scope.changeAgendaMsg = true;$scope.agendaMsg = "";}
                return true;
            }
            if (last & !$scope.changeAgendaMsg)  {$scope.changeMessage();}
            return false;
        }
        
        this.searchEvents = function(search){
            console.log("date debut : ", $scope.date_debut);
            console.log("date fin : ", $scope.date_fin);
            if (!search){
                $scope.getEvents($scope.date_debut, $scope.date_fin);
            } else {
                var tmpStr = "";
            
                if (search.length > 300){
                    return;
                }
                // transform search
                for (var i = 0; i < search.length; i++){
                    if (search[i] == "'"){
                        tmpStr= tmpStr + "''";
                    }else {
                        tmpStr= tmpStr + search[i];
                    }
                }
                
                console.log("tmp Str : ", tmpStr);
                console.log("date_debut : ", $scope.date_debut);
                $http({method: 'POST', url:'/searchEvents.json?str='+tmpStr+'&date_debut='+$scope.date_debut})//$scope.date_debut.getFullYear()+"-"+($scope.date_debut.getMonth()+1)+"-"+$scope.date_debut.getDate()})
                .success(function(data){
                    if (data){
                        console.log("data :", data);
                        $scope.evenements = data;
                        if (data.length == 0){
                            $scope.agendaMsg = "Nous n'avons trouvé aucun évènement correspondant à votre recherche";
                        } else {
                            $scope.agendaMsg = "";
                        }
                    }
                })
                .error(function(data, status, header, config){
                    //console.log("error");
                })
                .then(function(httpData){
                    if(httpData.statusText == "OK"){
                    }
                });
            }
        }
        
        
        $scope.changeMessage = function(){
            //console.log("change message");
            if ($scope.typeS == "Tous les types d'évènement"){
                $scope.agendaMsg = "Aucun évènement dans la période du "+$filter('date')(new Date($scope.date_debut), 'dd/MM/yyyy')+" au "+$filter('date')(new Date($scope.date_fin), 'dd/MM/yyyy');
            } else if ($scope.typeS == "Biennale" || $scope.typeS == "Conférence" || $scope.typeS == "Exposition" || $scope.typeS == "Foire" || $scope.typeS == "Installation" || $scope.typeS == "Performance" || $scope.typeS == "Rencontre"){
                $scope.agendaMsg = "Aucune "+$filter('lowercase')($scope.typeS)+" dans la période du "+$filter('date')(new Date($scope.date_debut), 'dd/MM/yyyy')+" au "+$filter('date')(new Date($scope.date_fin), 'dd/MM/yyyy');
            } else if  ($scope.typeS == "Prix" || $scope.typeS == "Concert" || $scope.typeS == "Décrochage" || $scope.typeS == "Film" || $scope.typeS == "Vernissage"){
                $scope.agendaMsg = "Aucun "+$filter('lowercase')($scope.typeS)+" dans la période du "+$filter('date')(new Date($scope.date_debut), 'dd/MM/yyyy')+" au "+$filter('date')(new Date($scope.date_fin), 'dd/MM/yyyy');
            }
        }
    }]);
    
    app.directive('event', function($timeout){
        return{
            restrict:'EAC',
            controller:['$scope', function($scope){
    			$scope.$watch("evenements", function(newValue, OldValue, scope){	
    			    
                    // This will only run after the ng-repeat has rendered its things to the DOM
                    $timeout(function(){
                        console.log("occoucou");
                        var currentM = new Date();    
                    
                        console.log("+++++++++++++++++++++++++++++++++++++++");
                        console.log("event array : ",newValue.length);
                        console.log("+++++++++++++++++++++++++++++++++++++++");
                    
                        for (var i = 0; i < newValue.length; i++){
                            console.log("i : ", i);
                            if (document.getElementById('evenements_'+i)){
                                document.getElementById('evenements_'+i).style.backgroundColor = 'rgba(255, 255, 255, 255)';
                            }
                        
                            if (new Date(newValue[i].evenement.date_fin.substr(0,4), newValue[i].evenement.date_fin.substr(5,2)-1, newValue[i].evenement.date_fin.substr(8,2), 0, 0, 0, 0) <  new Date()){
                                console.log("exists : ", document.getElementById('evenements_'+i));
                                if (document.getElementById('evenements_'+i)){
                                    console.log("grey for i : ", i);
                                    document.getElementById('evenements_'+i).style.backgroundColor = 'rgba(167, 169, 171, 0.3)';
                                }
                            }
                        }
                    }, 0);

    			    
				});
    		}],
    		link:function(scope,element){
   			}	
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