(function() {
    var app = angular.module('questionnaire', ['ngCookies', 'ngRoute', 'uuid', 'ui.bootstrap']);

	var sessionid;
	var expireDate = new Date();	
    
    app.controller('UserController', ['$http', '$cookies', '$window', 'uuid', function($http, $cookies, $window, uuid) {
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
    }]);
   

    app.controller('HomeFormController', ['$http', '$cookies', 'uuid', function($http, $cookies, uuid) {
        
        var form = this;
        form.questions = []; 
        form.regions = [];
		form.country = [];
		form.questionsLeft = [];
		
		this.idquestion = 1; 
        this.idQuestionNext;
        this.idPreviousQuestion;
        this.idanswer = [];		

        this.progress = 0;	
        this.questionsLeft = [];
        
        this.isFormAchieved = false;	
        this.isBack = true;				
        this.isCountry = false;			
        this.isRegion = false;
        this.visible = true;
        this.isAnswerValid = false;
        this.selectedCountry;
        this.idQuestionBeforeReset = 1;
        
        this.alert = [];
        
        if ($cookies.get('carteldelartCookie') == undefined){
			expireDate = new Date();
	 		expireDate.setDate(expireDate.getDate()+300);
			$cookies.put('carteldelartCookie',1, {'expires':expireDate});
			this.idquestion = 1;
			this.idQuestionNext = 2;
		}else {
			this.idquestion = $cookies.get('carteldelartCookie');
			if (this.idquestion == 2 || this.idquestion == 3) this.idQuestionNext = 4;
			if (this.idquestion == 2) this.isCountry = true+"";
			if (this.idquestion == 3) this.isRegion = true+"";
		}
		var tmpid = this.idquestion;
      	if (form.questions.length <=1){
      		$http.get('/form.json').success(function(data){
      			form.questions = data;
      			if (tmpid > 0) form.questions[tmpid-1].question.isreadable = 1;
      		});
      	}
      	if (this.idquestion == 0){
      		this.isFormAchieved = true;
      	}

		var idtmp = this.idquestion;
      	if (form.questionsLeft.length <= 1 && !this.isFormAchieved){
      		$http.get('/questionsLeft.json').success(function(data){
      			form.questionsLeft = data;
				this.progress = (form.questionsLeft[idtmp-1].questionsleft.rest - form.questionsLeft[idtmp-1].questionsleft.nb ) / form.questionsLeft[idtmp-1].questionsleft.rest;
      		});
      	} else if (this.isFormAchieved){
      		this.progress = 1;
      	}
      	
      	if (form.country.length < 1 && this.idquestion <= 2 && this.idquestion != 0){
      		$http.get('/country.json').success(function(data){
      					form.country = data;
      					this.selectedCountry = form.country[57];
      				});
      	}
      	if (form.regions.length < 1 && this.idquestion <= 3 && this.idquestion != 0){
      		$http.get('/regions.json').success(function(data){
      					form.regions = data;
      				});
      	}

		this.getRegionSelected = function(data){
      		this.idQuestionNext = 4;
      		if(this.idanswer.length == 1)
      			this.idanswer.splice(0,1);
      		this.idanswer.push(data.regions.code);    
			this.isAnswerValid = true;
      	}

		this.getCountrySelected = function(data){
			if (data.country.name == "France")
				this.idQuestionNext = 3;
			else
				this.idQuestionNext = 4;
			if (this.idanswer.length == 1)
				this.idanswer.splice(0,1);
			this.idanswer.push(data.country.id);
			this.isAnswerValid = true;
		}

      	this.updateAnswer = function(answerid, nextQuestionId){
      		if (this.idquestion == 1 && form.country.length <= 1){
    			 $http.get('/country.json').success(function(data){
    			 	form.country = data;
    			 }); 			
    			 this.idQuestionNext = 2;
      		}      		
			if (this.idquestion == 2 && form.country[answerid-1].name == "France"){
				if (form.regions.length <= 1 && this.idquestion <= 2){
      				$http.get('/regions.json').success(function(data){
      					form.regions = data;
      				});
      			this.idQuestionNext = 3;
	      		}
			} else 
			{
      			this.idQuestionNext = nextQuestionId;
			}
			if (form.questions[this.idquestion - 1].question.multiple){ 
				var i = 0;
				for (; i < this.idanswer.length; i++){
					if (this.idanswer[i] == answerid){
						this.idanswer.splice(i,1);
						return;
					}
				}
			} else { 
				if (this.idanswer.length == 1){ 
					this.idanswer.splice(0,1);
				}
			}
			this.idanswer.push(answerid);
			this.isAnswerValid = true;
      	};
      	
      	this.closeAlert = function() {
      		this.alert = [];
      	}
      	
      	this.updateQuestion = function(){
			if (this.idquestion == 2 && this.idanswer.length == 0){
					this.idQuestionNext = 3;
	      			this.idanswer.push(58);
	      			
	      			if (form.regions.length <= 1){
      					$http.get('/regions.json').success(function(data){
      						form.regions = data;
      					});
	      			}	
			}
			else{
				if (!this.isAnswerValid) {
					if (this.alert.length == 0)
						this.alert.push({type:'info', msg:'Selectionner une réponse avant de répondre à la question.'});
					return;
				}
			}
			this.alert = [];
			this.isAnswerValid = false;
			
			if (this.isBack) this.isBack = false;
			
			if (this.idQuestionNext==2) {this.isCountry = true;} else{this.isCountry = false;}
			if (this.idQuestionNext==3) {this.isRegion = true;} else {this.isRegion = false;}
		
      		if ($cookies.get('uuid') == undefined){
      			if (sessionid == undefined) sessionid = uuid.new();
				expireDate = new Date();
		 		expireDate.setDate(expireDate.getDate()+300);
      			$cookies.put('uuid', sessionid, {'expires': expireDate});
      		} else if (sessionid == undefined){
      			sessionid = $cookies.get('uuid');
      		}
      		if (this.idQuestionNext == undefined) {
				this.idQuestionNext = form.questions[this.idquestion-1].question.answers[0].id_question_next;
      			return;
      		}
      		
      		else if ( this.idQuestionNext == this.idquestion){
      			if (this.idquestion == 2 || this.idquestion == 3){ 
      				this.idQuestionNext = 4 
      			} else {
      				this.idQuestionNext = form.questions[this.idquestion-1].question.answers[0].id_question_next;
      			}
      		}
			
			if (this.idquestion == 0) {
				this.isFormAchieved = true;
				return;
			}
			
      		if (this.idQuestionNext == 0){
      			this.isFormAchieved = true;
      			form.questions[this.idquestion-1].question.isreadable = 0;	
      		}else{
				form.questions[this.idQuestionNext-1].question.isreadable = 1;
				form.questions[this.idquestion-1].question.isreadable = 0;	
				
				if(this.idQuestionNext == 2) this.isCountry = true;
						
				this.progress = (form.questionsLeft[this.idQuestionNext-1].questionsleft.rest- form.questionsLeft[this.idQuestionNext-1].questionsleft.nb) / form.questionsLeft[this.idQuestionNext-1].questionsleft.rest;
      		}
      		expireDate = new Date();
	 		expireDate.setDate(expireDate.getDate()+300);
      		$cookies.put('carteldelartCookie', this.idQuestionNext, {'expires': expireDate});

      		var answerNbr = this.idanswer.length;
      		var tmpId = this.idquestion;
      		if (sessionid != undefined && tmpId != undefined && answerNbr > 0){
      			for (i = 0; i < answerNbr; i++){
      				$http({method: 'POST', url: '/answer?uid='+sessionid+'&qid='+tmpId+'&aid='+this.idanswer[0]}).success(function(data, status, header, config){	
      				}).error(function(data, status, header, config){
      				});
      				this.idanswer.splice(0,1);
      			}
      		}
			this.idPreviousQuestion = this.idquestion;
			this.idquestion = this.idQuestionNext;	
      	};    
      	
      	this.resetForm = function(){
	      	this.isAnswerValid = false;
			expireDate = new Date();
	 		expireDate.setDate(expireDate.getDate()+300);
			
      		this.iqQuestionBeforeReset = this.idquestion;
      		this.idquestion = 1;
      		this.idQuestionNext = 1;
      		this.isFormAchieved = false;
      		this.progress = 0;
			this.isBack = true;
			this.isCountry = false;
			this.idanswer=[]; 
			this.isFormAchieved = false;
			
			if ($cookies.get('carteldelartCookie') != undefined && $cookies.get('uuid') != undefined){
      			this.idQuestionBeforeReset = $cookies.get('carteldelartCookie');
      			sessionid = $cookies.get('uuid');
			}
			$cookies.put('carteldelartCookie', 1, {'expires' : expireDate});
			
      		if (this.idQuestionBeforeReset != 0) form.questions[this.idQuestionBeforeReset-1].question.isreadable = 0;
      		form.questions[this.idquestion-1].question.isreadable = 1;
			
      		if (sessionid != undefined && this.idQuestionBeforeReset != undefined){
      			$http({method: 'POST', url: '/reset?uid='+sessionid+'&qid='+this.idQuestionBeforeReset}).success(function(data, status, header, config){
      			}).error(function(data, status, header, config){
      			});
      		}
      		
      		if (form.country.length < 1){
      			$http.get('/country.json').success(function(data){
      					form.country = data;
      			});
      		}
      	};
      	
      	this.shareForm = function(){
      	};
      	
      	this.isCountryQuestion = function(){
      		if(this.isCountry == (true+"")){return true;} else { return false;}
      	};
      	
      	this.isRegionQuestion = function(){
      		if (this.isRegion == (true+"")){return true;}else{return false;};
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
            replace:false,
            templateUrl:'../www/elem/footer.html'
        }    
    });
    
	app.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true; delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
})();