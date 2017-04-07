var PAWSCare = angular.module('PAWSCare');

PAWSCare.controller('PetsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('PetsController loaded');
	$scope.getPets = function(){
		//$http.get('/api/pets').success(function(response){
		//	$scope.pets = response;
		//});
	
		$http.get('/api/pets').then(successCallback, errorCallback);

		function successCallback(response){
		    $scope.pets = response;
		}
		function errorCallback(error){
		    //error code
		}
	}
}]);