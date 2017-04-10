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
/*
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
*/
	$scope.getPet = function(){
		var id = $routeParams.id;
		console.log(id)
		$http.get('/api/pets/'+id).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //console.log('PetsController2 loaded');
		    $scope.pet=response.data;

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("error http get Pet");
		  });
	}

	$scope.getPet2 = function(){
		var id = $routeParams._id;
		console.log(id)
		$http.get('/api/pets/'+id).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //console.log('PetsController2 loaded');
		    $scope.pet=response.data;

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("error http get Pet");
		  });
	}


	$scope.addPet = function(){
		$http.post('/api/pets', $scope.pet).then(function successCallback(response) {
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

	$scope.updatePet = function(){
		var id = $routeParams._id;
		console.log(id)
		$http.put('/api/pets/'+id, $scope.pet).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //console.log('PetsController2 loaded');
		    window.location.href='#/pets';

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("error http get Pet");
		  });
	}

}]);