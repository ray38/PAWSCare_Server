var PAWSCare = angular.module('PAWSCare',['ngRoute','ui.router']);

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
	.when('/outside',{
		templateUrl:'views/outside_home.html'
	})
	.when('/login',{
		controller:'LoginController',
		templateUrl:'views/login.html'
	})
	.when('/register',{
		controller:'RegisterController',
		templateUrl:'views/register.html'
	})
	.when('/inside',{
		controller:'InsideController',
		templateUrl:'views/inside_home.html'
	});/*
	.otherwise({
		redirectTo:'/'
	});*/

});


PAWSCare.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
//angular.module('PAWSCare',['ngRoute','ui.router']).config(function($stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('');
	$stateProvider

    .state('outside.pets_main', {
		controller:'PetsController',
		templateUrl:'views/pets.html'
    })
    .state('outside.pets', {
     	url: '/pets',
		controller:'PetsController',
		templateUrl:'views/pets.html'	
    })
    .state('outside.pet_details', {
     	url: '/pets/details/:id',
		controller:'PetsController',
		templateUrl:'views/pet_details.html'
   	})
   	.state('outside.add_pet', {
	    url: '/pets/add',
		controller:'PetsController',
		templateUrl:'views/add_pet.html'
   	})
	.state('outside.edit_pet', {
	    url: '/pets/edit/:_id',
		controller:'PetsController',
		templateUrl:'views/edit_pet.html'
   	})
   	.state('outside', {
	    url: '/outside',
		abstract: true,
		templateUrl:'views/outside_home.html'
   	})
	.state('outside.login', {
	    url: '/login',
		controller:'LoginController',
		templateUrl:'views/login.html'
   	})
   	.state('outside.register', {
	    url: '/register',
		controller:'RegisterController',
		templateUrl:'views/register.html'
   	})
   	.state('inside', {
	    url: '/inside',
		controller:'InsideController',
		templateUrl:'views/inside_home.html'
   	});
 
//  $urlRouterProvider.otherwise('/outside/login');
});

PAWSCare.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
//.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
	$rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
     	if (!AuthService.isAuthenticated()) {
       		console.log(next.name);
       		if (next.name !== 'outside.login' && next.name !== 'outside.register') {
         		event.preventDefault();
         		$state.go('outside.login');
       		}
     	}
   	});
});