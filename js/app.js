angular.module("dikyApp",[])
.controller("mainCtrl",function ($scope, $http) {

	$scope.users=[
		{id :"", valid : false, name : "", photoUrl : ""},
		{id :"", valid : false, name : "", photoUrl : ""}
	];

	$scope.userUpdate = function (index) {
		if($scope.users[index].id!=""){
		$http.jsonp("https://api.vk.com/method/users.get?"+
				"user_ids="+$scope.users[index].id+
				"&fields=photo_200"+
				"&v=5.53&callback=JSON_CALLBACK").success(function(data){
			if(data.response==undefined){
				$scope.users[index].valid=false;
			} else{

				$scope.users[index].valid=true;
				$scope.users[index].name=data.response[0].first_name + " " 
									  +  data.response[0].last_name;
				$scope.users[index].photoUrl=data.response[0].photo_200;
			
			}
		}).error(function(){
			$scope.users[index].valid=false;
		})} 
		else $scope.users[index].valid=false;
	}
	//$http.jsonp("https://api.vk.com/method/friends.get?"+
	//			"user_id=999999"+
	//			"&v=5.53&callback=JSON_CALLBACK").success(function(data){
	//	console.log(data);
	//}).error(function(){

	//});
});