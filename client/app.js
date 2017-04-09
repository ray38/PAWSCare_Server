var PAWSCare = angular.module('PAWSCare',['ngRoute']);

PAWSCare.config(function($routeProvider, $locationProvider){
	$locationProvider.hashPrefix('');
	$routeProvider.when('/',{
		controller:'PetsController',
		templateUrl:'views/pets.html'
	})
	.when('/pets',{
		controller:'PetsController',
		templateUrl:'views/pets.html'		
	})
	.when('/pets/details/:id',{
		controller:'PetsController',
		templateUrl:'views/pet_details.html'
	})
	.when('/pets/add',{
		controller:'PetsController',
		templateUrl:'views/add_pet.html'
	})
	.when('/pets/edit/:_id',{
		controller:'PetsController',
		templateUrl:'views/edit_pet.html'
	})
	.otherwise({
		redirectTo:'/'
	});

});