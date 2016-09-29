application.directive("bigProfiles",function () {
	return {
		link: function(scope, element, attributes){
			scope.usersData = scope[attributes["bigProfiles"]];
		},
		restrict: "A",
		templateUrl: 'views/bigProfiles.html'
	}//return
});//application.directive("bigProfiles",function () {