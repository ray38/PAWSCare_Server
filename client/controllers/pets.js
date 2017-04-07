var PAWSCare = angular.module('PAWSCare');

PAWSCare.controller('PetsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('PetsController loaded');
	$scope.getPets = function(){
		//$http.get('/api/pets').success(function(response){
		//	$scope.pets = response;
		//});
	
		//$http.get('/api/pets').then(successCallback, errorCallback);

		//function successCallback(response){
		//    $scope.pets = response;
		//}
		//function errorCallback(error){
		    //error code
		//    console.log("error http get");
		//}

		$http({
		  method: 'GET',
		  url: '/api/pets'
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		    //console.log('PetsController2 loaded');
		    $scope.pets=response.data;
		    console.log($scope.pets);

		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("error http get");
		  });
	}
}]);