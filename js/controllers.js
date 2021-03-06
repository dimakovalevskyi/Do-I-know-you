application.controller("homeCtrl",function ($scope, $http) {
//---Primary Initialization-----------------------------------------------------------
	$scope.users=[
		{id :"", valid : false, name : "", photoUrl : ""},
		{id :"", valid : false, name : "", photoUrl : ""}
	];

	$scope.inProgress=false;//change button on progressbar while calculating
	$scope.showChain=false;//set visible for chain

	$scope.chain=[];//chain of friends from first to second user

	$scope.chainData=[];//chain which contains user`s data
//---Behaviour for input--------------------------------------------------------------
	$scope.userUpdate = function (index) {//action onChange for inputs
		if($scope.users[index].id!=""){//if input is not empty
		$http.jsonp("https://api.vk.com/method/users.get?"+//get info about user
				"user_ids="+$scope.users[index].id+
				"&fields=photo_200,photo_100,photo_50"+
				"&v=5.53&https=1&callback=JSON_CALLBACK").success(function(data){
			if(data.response==undefined){//if data is correct
				$scope.users[index].valid=false;//set input`s text as invalid
			} else{//if(data.response==undefined)
				if(data.response[0].deactivated==undefined){
					$scope.users[index].valid=true;//set input`s text as valid
					$scope.users[index].name=data.response[0].first_name + " " 
										  +  data.response[0].last_name;//print user name
					if(data.response[0].photo_200!=undefined){//if user has photo 200px
						$scope.users[index].photoUrl=data.response[0].photo_200;//show user photo
					}else{
						if(data.response[0].photo_100!=undefined){//if user has photo 100px
							$scope.users[index].photoUrl=data.response[0].photo_100;//show user photo
						}else{
							$scope.users[index].photoUrl=data.response[0].photo_50;//show user photo
						}
					}
				}else{
					$scope.users[index].valid=false;
				}
			}
		}).error(function(){//if request finished with error
			$scope.users[index].valid=false;//set input`s text as valid
		})}//if($scope.users[index].id!="")
		else $scope.users[index].valid=false;//set input`s text as valid
	}
//---Behaviour for button-------------------------------------------------------------
	$scope.letsFind=function (){
		if($scope.users[0].id==$scope.users[1].id){
			alert("Nice try, QA!");
		}else{//if($scope.users[0].id==$scope.users[1].id)
			alert("During the execution of the algorithm, there may be crazy lags in your browser because algorithm is executed on the client's side. It's bad idea, I understand it. Cheer up, dude!");
			setIdsInsteadUserLinks();
			}
	}
//---Preperarion before calculating---------------------------------------------------
	function setIdsInsteadUserLinks(){
		$http.jsonp("https://api.vk.com/method/users.get?"+//get info about user
		"user_ids="+$scope.users[0].id+
		"&v=5.53&https=1&callback=JSON_CALLBACK").success(function(data){
			
			$scope.users[0].id=data.response[0].id;//be sure that id is entered
					
			$http.jsonp("https://api.vk.com/method/users.get?"+//get info about user
			"user_ids="+$scope.users[1].id+
			"&v=5.53&https=1&callback=JSON_CALLBACK").success(function(data){

				$scope.users[1].id=data.response[0].id;//be sure that id is entered

				swapUsersIfNeed();
			});//.success(function(data) user1
		});//.success(function(data) user0
	}

	function swapUsersIfNeed(){

		var countOfFriendsFirstUser;
		var countOfFriendsSecondUser;

		$http.jsonp("https://api.vk.com/method/friends.get?"+//get info about user`s friends
		"user_id="+$scope.users[0].id+
		"&v=5.53&callback=JSON_CALLBACK").success(function(data){
			
			countOfFriendsFirstUser=data.response.count;//be sure that id is entered
					
			$http.jsonp("https://api.vk.com/method/friends.get?"+//get info about user`s friends
			"user_id="+$scope.users[1].id+
			"&v=5.53&callback=JSON_CALLBACK").success(function(data){

				countOfFriendsSecondUser=data.response.count;//be sure that id is entered

				if(countOfFriendsFirstUser>countOfFriendsSecondUser){
					alert("Users will be swapped for faster calculation");
					var temp = $scope.users[0];//swapping two users
					$scope.users[0]=$scope.users[1];//swapping two users
					$scope.users[1]=temp;//swapping two users
				}
				$scope.inProgress=true;//set page as being in calculating
				$scope.showChain=false;
				$scope.chain=[];//clear chain
				$scope.chain.push($scope.users[1].id);//add to chain second user
				find(parseInt($scope.users[0].id) , parseInt($scope.users[1].id));//begin find from first to second
							
			});//.success(function(data) user1
		});//.success(function(data) user0
	}
//---Some MAGIC-----------------------------------------------------------------------
	function find(firstUser, secondUser){
		var queue = [];//queue of users must be checked later
		var checked = [];//list of checked users

		$scope.currentUser= firstUser;//start seeking from first user
		var finded=false;

		var friendsOfSecondUser;

		$http.jsonp("https://api.vk.com/method/friends.get?"+"user_id="+secondUser+"&v=5.53&callback=JSON_CALLBACK")//get second user`s friends list 
		.success(function(data){

			if(data.response!=undefined){//if data is correct

				friendsOfSecondUser=data.response.items;
	
				if(friendsOfSecondUser.indexOf(firstUser) != -1){//if first and second users are friends
					$scope.chain.unshift(firstUser);//add first user to the beginning of chain
					updateChain();
				}else{//if(friendsOfSecondUser.indexOf(firstUser) != -1)
					findRecursion();//call algorithm
				}
			}
		});

		function findRecursion(){
			$http.jsonp("https://api.vk.com/method/friends.get?"+"user_id="+$scope.currentUser+"&v=5.53&callback=JSON_CALLBACK")//get current user`s friends list 
				.success(function(data){
				if(data.response!=undefined){//if data is correct
					for(var i = 0 ; i<data.response.count ; i++){
						if(checked.indexOf(data.response.items[i])==-1){//if current user was not checked
							if(friendsOfSecondUser.indexOf(data.response.items[i]) != -1) {//is this user second user`s friend

								finded=true;//to stop recursion
								$scope.chain.unshift(data.response.items[i]);//add to chain two last users
								$scope.chain.unshift($scope.currentUser);//add to chain two last users
								i=data.response.count;//to stop for(...)
	
							}else{//if(friendsOfSecondUser.indexOf(data.response.items[i]) != -1)
								queue.push(data.response.items[i]);//add him to queue
							}//else		
						}//if(checked.indexOf(data.response.items[i])==-1)
					}//for(var i = 0 ; i<data.response.count ; i++)
				}//if(data.response!=undefined)
	
				checked.push($scope.currentUser);//add user to checked list
				$scope.currentUser = queue.shift();//take out next user from queue
	
				if((queue.length==0)||(finded)){//if algorythm is done
	
					if($scope.chain[0]==firstUser){//if chain is filled
						updateChain();
						return ;//exit from method
					}else{//if($scope.chain[0]==firstUser)
						find(firstUser,$scope.chain[0]);//call this again, not to secondUser, but to last added to chain user
					}
				}else {//if((queue.length==0)||(finded))
					findRecursion();//call this again
				}//else
			});//success(function(data)
		}//function findRecursion()
	}//function find(firstUser, secondUser)
//---Update data in chain method------------------------------------------------------
	function updateChain(){//prepare chain before show

		var usersIds="";//users ids for request

		for(var i = 0; i<$scope.chain.length-1; i++){//make string for request
			usersIds=usersIds+","+$scope.chain[i]+",";
		}
		usersIds=usersIds+","+$scope.chain[$scope.chain.length-1];//make string for request

		$http.jsonp("https://api.vk.com/method/users.get?"+"user_ids="+usersIds+"&fields=photo_100&v=5.53&callback=JSON_CALLBACK")//get info about users from chain 
		.success(function(data){
			if(data.response!=undefined){//if data is correct
				$scope.chainData=data.response;//set data into chain
				$scope.inProgress=false;
				$scope.showChain=true;
			}//if(data.response!=undefined)
		});//.success(function(data)
	}//function updateChain()
});//application.controller("homeCtrl",function ($scope, $http, $location) 

application.controller("aboutCtrl",function ($scope) {
	$scope.header="Do I know you?";
	$scope.text="Do you know what <a class='white-link' href='https://en.wikipedia.org/wiki/Six_degrees_of_separation'>six degrees of separation</a> is? By means of my service you can test it on yourself, your friends, mates and famous people. The search is passed through users in <a class='white-link' href='https://vk.com/'>vk.com</a>";
	$scope.buttonLabel="Try it now";
});//application.controller("aboutCtrl",function ($scope, $http, $location)