angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http) {
    $scope.username='';
    $scope.password='';
    $scope.signin = function(username, password) {


    	var data = {
            username: username,
            password: password
        };

		$http.post('/login', data).then(function(response) {
		    if (response.data.success) {
				console.log('logged in!');
		    } else {
				console.log('failed to log in!');
		    }
		});
    }
})