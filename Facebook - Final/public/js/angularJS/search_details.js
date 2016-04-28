/**
 * New node file
 */
var app = angular.module('init', []);

app.controller('search', function($scope, $http) {
	

	$scope.searchSubmit = function() {
		
		$http({
			method : "POST",
			url : '/postJsonSearch',
			data : {				
					searchValue : $scope.search 	
				}
		}).success(function(data) {
			//checking the response data for statusCode

			if (data.statusCode == 200) {
				//$scope.postDetails = response.status;
		
//				$http.get("/postJsonSearch").success(function(response) {
	//				if (response.statusCode == 200) {
						alert(JSON.stringify(data));

						$scope.posts = data.status;
		//			}
			//		else{
				//	}
				//});
			}
			
			else
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/DataNotFound"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
	
	
	
	
	$http.get("/postJsonSearch").success(function(response) {
		if (response.statusCode == 200) {
			$scope.posts = response.status;
		}
	});
});


