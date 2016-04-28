var app = angular.module('about', []);

app.controller('c-about', function($scope) {
	$scope.c_relationship = false;
	$scope.c_contact_info = false;
	$scope.c_work_education = false;
	$scope.c_life_events = true;
	$scope.c_interests = false;
	
	$scope.cOverview = function(){
		$scope.c_relationship = false;
		$scope.c_contact_info = false;
		$scope.c_work_education = false;
		$scope.c_interests = false;
		$scope.c_life_events = true;

	};
	
	$scope.cLifeEvents = function(){
		$scope.c_life_events = false;
		$scope.c_relationship = true;
		$scope.c_contact_info = true;
		$scope.c_work_education = true;
		$scope.c_interests = true;
	};
	
	$scope.cRelation = function(){
		$scope.c_life_events = true;
		$scope.c_relationship = false;
		$scope.c_contact_info = true;
		$scope.c_work_education = true;
		$scope.c_interests = true;
	};
	
	$scope.cWork = function(){
		$scope.c_life_events = true;
		$scope.c_relationship = true;
		$scope.c_contact_info = true;
		$scope.c_work_education = false;
		$scope.c_interests = true;
	};
	
	$scope.cContact = function(){
		$scope.c_life_events = true;
		$scope.c_relationship = true;
		$scope.c_contact_info = false;
		$scope.c_work_education = true;
		$scope.c_interests = true;
	};
	
	$scope.cInterests = function(){
		$scope.c_life_events = true;
		$scope.c_relationship = true;
		$scope.c_contact_info = true;
		$scope.c_work_education = true;
		$scope.c_interests = false;
	};
});