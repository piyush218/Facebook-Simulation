var app = angular.module('init', []);

app.controller('status', function($scope, $http) {

	$scope.submit = function() {

		$http({
			method : "POST",
			url : '/postStatus',
			data : {
				postValue : $scope.post
			}
		}).success(function(data) {
			// checking the response data for statusCode
			if (data.statusCode == 200) {
				// $scope.postDetails = response.status;

				$http.get("/getJson").success(function(response) {
					if (response.statusCode == 200) {
						$scope.posts = response.status;
					}
				});
			}

			else
				// Making a get call to the '/redirectToHomepage' API
				window.location.assign("/DataNotFound");
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};

	$http.get("/getJson").success(function(response) {
		if (response.statusCode == 200) {
			$scope.posts = response.status;
			console.log(JSON.stringify($scope.posts));
		}
	});

	$scope.validate = function($event) {
		angular.forEach($scope.addStatus.$error.required, function(field) {
			field.$setDirty();
		});
		if ($scope.addStatus.$error.required) {
			$event.preventDefault();
		} else {
			$scope.submit();
			$scope.post = "";
			angular.forEach($scope.addStatus.$error.required, function(field) {
			    field.$setPristine();
			});
			
		}
	};
});

