angular.module('myApp')
		.controller('testCtrl', myCtrl);

myCtrl.$inject = ['$scope','restCalls'];

function myCtrl($scope,restCalls){
	$scope.greeting = "Welcome";

	$scope.addTwoNumbers = function(a,b){
		$scope.result = a+b;
	}

	$scope.submit =function(id,hostgroup){
		if(id==null||id==""){
			restCalls.submitNewForm(hostgroup)
				.then(function successCallBack(response){
					$window.alert("Successfully Submitted");
					location.reload();
					console.log("success")
				});
		}else{
			restCalls.submit(id,hostgroup)
				.then(function successCallBack(response){
					$window.alert("Updated Successfully");
					location.reload();
				});
		}
	}
}