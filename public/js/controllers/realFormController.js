var app = angular.module('lnmApp', ['ngCookies']);

app.controller('app', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {
	var baseUrl = 'https://lnm-feedback-portal.herokuapp.com/';
	$scope.facultySelect = 0;

	$scope.formToggle = true;

	$scope.sendToken = $cookies.get('token');
	console.log($scope.sendToken);
	$scope.goNext = function() {

		$scope.year = $('input:radio:checked').attr('value');
		console.log($scope.year);
		$scope.formToggle = false;
		$http.get(baseUrl + 'faculty/' + $scope.year)
			.success(function(response) {
				console.log(response);
				$scope.faculties = response;
			});
	};

	$scope.branches = [{
		id: '1',
		name: 'CSE'
	}, {
		id: '2',
		name: 'CCE'
	}, {
		id: '3',
		name: 'ECE'
	}, {
		id: '4',
		name: 'MME'
	}, {
		id: '5',
		name: 'ME'
	}];
	/*$scope.faculties = [{
		index: 0,
		name: 'Faculty1',
		subject: ['Dummy1', 'Dummy2', 'Dummy3']
	}, {
		index: 1,
		name: 'Faculty2',
		subject: ['Dummy1', 'Dummy2']
	}];*/

}]);
