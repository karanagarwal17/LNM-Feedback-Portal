var app = angular.module('lnmApp', []);

app.controller('loginApp', ['$scope', '$http', 'loginFactory', function($scope, $http, loginFactory) {
	// var baseUrl = 'http://10.42.0.1:3000/';
	$scope.sendOtp = function() {

		$scope.register = {
			username: $scope.sendEmail
		};
		console.log($scope.register);

		loginFactory.register($scope.register, function(response) {
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

		loginFactory.login($scope.submitOtp, function(response) {
			console.log(response);

			if (response.data.user.type == 'student') {
				window.location.href = 'file:///media/umang/Entropy/LNM-Feedback-Portal/public/realForm.html';
			} else if (response.data.user.type == 'faculty') {
				window.location.href = 'file:///media/umang/Entropy/LNM-Feedback-Portal/public/adminDash.html';
			}


		});



	};
}]);
