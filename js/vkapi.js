	$http.jsonp("https://api.vk.com/method/friends.get?"+
				"user_id=999999"+
				"&v=5.53&callback=JSON_CALLBACK").success(function(data){
		console.log(data);
	}).error(function(){

	});