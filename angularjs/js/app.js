let myApp = angular.module('myApp', ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider.when('/fname', {
            templateUrl: 'views/fname.html',
            controller: 'FirstNameController'
        });
        $routeProvider.when('/lname', {
            templateUrl: 'views/lname.html',
            controller: 'LastNameController'
        });
        $routeProvider.otherwise({redirectTo: '/fname'});
    });