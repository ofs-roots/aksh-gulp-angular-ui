angular.module('myApp')
		.controller('myctrl', myCtrl);

myCtrl.$inject = ['restCalls','$scope','$window'];

function myCtrl(restCalls,$scope,$window){
	$scope.greeting = "Welcome";

	$scope.usernames = [];
	$scope.ipAddressRange =[];
	$scope.adduser = function(host_user){
		$scope.usernames.push(host_user);
		$scope.host_user="";

	}
	$scope.addip = function(host){
		$scope.ipAddressRange.push({"ipAddresses":host.ip_address,
			"ipLocation":host.ip_location,
			"ipDescription":host.ip_desc
	});
		$scope.host.ip_address="";
		$scope.host.ip_location="";
		$scope.host.ip_desc="";
	}

	$scope.cancel = function(){
			location.reload();
	}

	$scope.initleft = function(){
			$(function () {
				var getData;
		 		var tree=[];
		 			
      			restCalls.getFlattenTree()
         			.then(function successCallBack(response){
           				for(var i=0;i<response.data.length;i++){
								var temp={};
								if(response.data[i].parentid==0){
									temp.id=response.data[i].id;
									temp.parent='#';
									temp.text=response.data[i].name;
									tree.push(temp)
								}else{
									temp.id=response.data[i].id;
									temp.parent=response.data[i].parentid;
									temp.text=response.data[i].name;
									tree.push(temp);
								}
						}
						createJSTree(tree);
					})
			});

       		function createJSTree(tree) {            
            	$('#left').jstree({
                	'core': {
                		'data': tree
              		},
              		"check_callback" : true,
              		'plugins':[ "contextmenu","wholerow","types","dnd","state"],
              		'contextmenu':{
              			"select_node": true, 
              			"items": function ($node) {
                       		var trees = $("#left").jstree(true);
                        	return {
                        			"Remove": {
									        "separator_before": false,
									        "separator_after": false,
									        "label": "Remove",
									        "action": function (obj) {
									           		var id = $node.id;
									                 restCalls.deleteHostNode(id)
         												.then(function successCallBack(response){
									        					location.reload();					
														});					           
											}
									},
                          			"Create": {
                            	 			"separator_before": false,
          									"separator_after": false,
           									"label": "Create",
           									"action": function (obj) { 
           										var id=$node.id;
           											$scope.$apply(function(){
           												$scope.hostgroup.id="";
           												$scope.hostgroup.name="";
           												$scope.hostgroup.description="";
           												$scope.hostgroup.hostBaseline="false";
           												$scope.hostgroup.suppressExcludedService="false";
           												$scope.hostgroup.sendToCta="false";
           												$scope.hostgroup.hostTrap="false";
           												$scope.hostgroup.inverseSuppression="false";
           												$scope.hostgroup.parentid=id;
           												$scope.usernames=[];
           												$scope.ipAddressRange=[];
           											})
           									}
                           			}
							};
						}
					}
                });
        	}
			$('#left').on("changed.jstree", function (e, data) {
         		var id = data.node.id;
       	 		restCalls.getFlattenTree()
         			.then(function successCallBack(response){
         						$scope.result=response.data;
								for(var i=0;i<$scope.result.length;i++){
										if($scope.result[i].id==id){
												$scope.hostgroup = $scope.result[i];
												$scope.usernames = $scope.result[i].hostGroupUser;
												$scope.ipAddressRange = $scope.result[i].ipAddress;
										}
								}
								console.log("success")
					});
         	});
	}

	$scope.initleft();
	$scope.submit =function(id,hostgroup,usernames,ipAddressRange){
		if(id==null||id==""){
			restCalls.submitNewForm(hostgroup,usernames,ipAddressRange)
				.then(function successCallBack(response){
					$window.alert("Successfully Submitted");
					location.reload();
					console.log("success")
				});
		}else{
			restCalls.updateForm(id,hostgroup,usernames,ipAddressRange)
				.then(function successCallBack(response){
					$window.alert("Updated Successfully");
					location.reload();
				});
		}
	}
};


