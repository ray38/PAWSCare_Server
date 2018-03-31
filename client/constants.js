angular.module('PAWSCare')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
 
.constant('API_ENDPOINT', {
	//:'localhost:9000/api'
	//url: 'http://143.215.17.115:9000/api'
  //url: 'http://127.0.0.1:9000/api'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
	url: 'http://35.174.137.208:8080/api'
});