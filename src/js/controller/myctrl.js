angular.module('myApp')
		.controller('myctrl', myCtrl);

myCtrl.$inject = ['restCalls','$scope','$window'];

function myCtrl(restCalls,$scope,$window){
	$scope.greeting = "Welcome";

	
	$scope.refresh = function(){
		location.reload();

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
         													$scope.banner = true;
         													$scope.delete = true;					
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
           												$scope.hostgroup.ip_address=[];
           												$scope.hostgroup.user=[];
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
												$scope.hostgroup.user = $scope.result[i].hostGroupUser.join();
												var ip=[];
												for(j=0;j<$scope.result[i].ipAddress.length;j++){
													ip.push($scope.result[i].ipAddress[j].ipAddresses);
												}
												$scope.hostgroup.ip_address=ip.join();
										}
								}
								console.log("success")
					});
         	});
	}

	$scope.initleft();
	$scope.submit =function(id,hostgroup){
		var usernames=hostgroup.user.split(',');
		var ipAddressRange = hostgroup.ip_address.split(',');
		var ipRange=[];
		for(i=0;i<ipAddressRange.length;i++){
			ipRange.push({"ipAddresses":ipAddressRange[i],
			"ipLocation":"India",
			"ipDescription":"sdgg"
			});

		}
		if(id==null||id==""){
			restCalls.submitNewForm(hostgroup,usernames,ipRange)
				.then(function successCallBack(response){

					
					$scope.banner = true;
					$scope.success = true;
					console.log("success")
				});
				// location.reload();
		}else{
			restCalls.updateForm(id,hostgroup,usernames,ipRange)
				.then(function successCallBack(response){
					$scope.banner = true;
					$scope.update = true;
				});
		}
	}
};


