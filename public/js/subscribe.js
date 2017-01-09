(function() {
	var app = angular.module('subscribe', ['ngCookies', 'ngRoute', 'uuid', 'ui.bootstrap', 'ngGeolocation']);
	
	app.controller('geoCtrl', ['$geolocation', '$scope', function($geolocation, $scope) {
		$geolocation.getCurrentPosition({
			timeout:60000
		}).then(function(position){
			$scope.myPosition = position;
			console.log("myPosition : ",$scope.myPosition);
		})
	}]);
})();