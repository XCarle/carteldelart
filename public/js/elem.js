(function() {
    var app = angular.module('elem', []);

    app.directive("cartelNav", function(){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/navbar.html'
        }
    });
    
    app.directive("cartelPublicNav", function(){
        return{
            restrict:'EAC',
            replace:false,
            templateUrl:'../www/elem/navbar-public.html'
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