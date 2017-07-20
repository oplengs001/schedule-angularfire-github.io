angular.module('myApp.routes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/client', {
            templateUrl: 'views/client_page.html',
            controller: 'MainCtrl'
     
        })
        .when('/acceptor', {
            templateUrl: 'views/acceptor_page.html',
            controller: "AccCtrl"
        })              
        .otherwise({
            redirectTo: '/client'
        });
}]);