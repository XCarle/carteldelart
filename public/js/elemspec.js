(function() {
    var app = angular.module('elem', []);
    
    console.log("coucou from angular");
    
    app.directive("cartelNav", function(){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'/nav'
        }
    });
    
    app.directive("cartelFooter", function (){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'/footer'
        }
    });
    
})();