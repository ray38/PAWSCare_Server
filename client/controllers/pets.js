var PAWSCare = angular.module('PAWSCare');

PAWSCare.controller('PetsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('PetsController loaded');
	$scope.getPets = function(){

		$http({
		  method: 'GET',
		  url: '/api/pets'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //console.log('PetsController2 loaded');
		    $scope.pets=response.data;

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("error http get pets");
		  });
	}

	$scope.getPet = function(){
		var id = $routeParams.id;
		$http({
		  method: 'GET',
		  url: '/api/pets/'+id
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //console.log('PetsController2 loaded');
		    $scope.pet=response.data;

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("error http get pet");
		  });
	}

	$scope.addPet = function(){
		console.log($scope.pet)
		$http({
		  method: 'POST',
		  url: '/api/pets/',
		  //data: $scope.pet
		  data: { 'message' : $scope.pet },
		  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //console.log('PetsController2 loaded');
		    window.location.href='#/pets';

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("error http addPet");
		  });
	}
}]);