var application = angular.module("dikyApp",['ngRoute','ngSanitize']);

application.config(function($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'views/home.html',
		controller:'homeCtrl'
	})
	.when('/about',{
		templateUrl:'views/about.html',
		controller:'aboutCtrl'
	})
	.otherwise('/',{
		redirectTo:'/'
	});
});