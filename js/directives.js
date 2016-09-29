application.directive("bigProfiles",function () {
	return {
		link: function(scope, element, attributes){
			scope.usersData = scope[attributes["bigProfiles"]];
		},
		restrict: "AE",
		templateUrl: 'bigProfiles.html'
		//template: '<div class="col-xs-6" ng-repeat="user in usersData"><img class="img-thumbnail user-photo" src="{{user.photoUrl}}" ng-show="user.valid"/><p class="lead text-center" ng-show="user.valid"><a class="user-link"  href="{{"http://vk.com/id"+user.id}}" ng-bind="user.name"></a></p></div>'
	}//return
});//application.directive("bigProfiles",function () {