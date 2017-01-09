(function(){
	var app = angular.module('cookieModule', ['ngCookies']);

	var app.controller('cookieController', ['$cookies', function($cookies){
		var carteldelartCookie = $cookies.myFavorite;
		$cookies.carteldelartCookie = 'myfirstcookie';
	}]);
})();