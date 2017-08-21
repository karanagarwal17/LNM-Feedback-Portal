var app = angular.module('lnmApp', ['ngCookies']);

app.controller('loginApp', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	var baseUrl = 'https://lnm-feedback-portal.herokuapp.com/';
	// var baseUrl = 'http://10.42.0.1:3000/';
	$scope.sendOtp = function() {

		$scope.register = {
			username: $scope.sendEmail
		};
		console.log($scope.register);
		$http.post(baseUrl + 'users/register', $scope.register)
			.success(function(response) {
				console.log(response);
			});
	};

	$scope.submit = function() {
		$scope.type = $('input:radio:checked').attr('value');
		$scope.submitOtp = {
			username: $scope.sendEmail,
			password: $scope.typeOtp,
			type: $scope.type
		};
		console.log($scope.submitOtp);
		$http.post(baseUrl + 'users/login', $scope.submitOtp)
			.success(function(response) {
				console.log(response);
				$cookies.get('token');
				$cookies.put('token', 'vhdv');
				console.log($cookies.get('token'));
				// window.location.href = 'file:///media/umang/Entropy/LNM-Feedback-Portal/public/realForm.html';
			});
	};
}]);
