angular.module('myApp')
		.controller('myctrl', myCtrl);

myCtrl.$inject = ['restCalls','$scope','$window'];

function myCtrl(restCalls,$scope,$window){

	// $scope.refresh = function(){
	// 	location.reload();
	// }
	$scope.refreshpage = function(){
		$scope.initleft();
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
         			var rootnode={};
					rootnode.id=0;
					rootnode.parent='#';
					rootnode.text = 'Niyut';
					tree.push(rootnode);
           			for(var i=0;i<response.data.length;i++){
           				var temp={};
						if(response.data[i].parentid==0){
							temp.id=response.data[i].id;
							temp.parent='0';
							temp.text=response.data[i].name;
							tree.push(temp);
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
            $('#jstree-panel').jstree({
                'core': {
                	'data': tree
              	},
              	'themes':{
              		'icons':false
              	},
             	"checkbox" : {
     				"three_state" : false, // to avoid that fact that checking a node also check others
      				"whole_node" : false
   				},
              	"check_callback" : true,
              	'plugins':[ "contextmenu","checkbox","wholerow","themes"],
              	'contextmenu':{
              		"select_node": true, 
              		"items": function ($node) {
                       	var trees = $("#jstree-panel").jstree(true);
                        return {
                        	"Remove": {
								"separator_before": false,
								"separator_after": false,
								"label": "Remove",
								"action": function (obj) {
									    var id = $node.id;
									    restCalls.deleteHostNode(id)
         									.then(function successCallBack(response){
         										$scope.refreshpage();
         										$scope.banner = true;
         										$scope.delete = true;
         										$scope.success = false;
												$scope.update = false;
												$scope.duplicate = false;	
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
				           					$scope.hostgroup.ip_address=[];
				           					$scope.hostgroup.user=[];
				           				})
           								if(id==0){
           										$scope.hostgroup.parentid="Niyut";
           								}else{
           										restCalls.getFlattenTree()
         										.then(function successCallBack(response){
         											for(var i=0;i<response.data.length;i++){
         												if(id==response.data[i].id){
				           									$scope.hostgroup.parentid=response.data[i].name;
				           								}
         											}
         										})
           								}
           						}
                           	}
						};
					}
				}
            });
        }
		$('#jstree-panel').on("changed.jstree", function (e, data) {
	        var id = data.node.id;
	       	restCalls.getFlattenTree()
	         	.then(function successCallBack(response){
	         		$scope.result=response.data;
					for(var i=0;i<$scope.result.length;i++){
						if($scope.result[i].id==id){
							$scope.hostgroup = $scope.result[i];
							$scope.hostgroup.user = $scope.result[i].hostGroupUser.join('\n');
							var ip=[];
							for(j=0;j<$scope.result[i].ipAddress.length;j++){
								ip.push($scope.result[i].ipAddress[j].ipAddresses);
							}
							$scope.hostgroup.ip_address=ip.join('\n');
							for(var m=0;m<$scope.result.length;m++){
								if($scope.result[i].parentid == $scope.result[m].id){
									$scope.hostgroup.parentid = $scope.result[m].name;
								}else{
									if($scope.result[i].parentid == 0 ){
										$scope.hostgroup.parentid = "Niyut"
									}
								}
							}
						}
					}
				});
	    });
	}

	$scope.initleft();
	$scope.submit =function(id,hostgroup){
		var usernames=hostgroup.user.split(/[ ,\n]+/);
		var ipAddressRange = hostgroup.ip_address.split(/[ ,\n]+/);
		var ipRange=[];
		var parentId;
		for(i=0;i<ipAddressRange.length;i++){
			ipRange.push({"ipAddresses":ipAddressRange[i],
			"ipLocation":"India",
			"ipDescription":"sdgg"
			});
		}
		restCalls.getFlattenTree()
         	.then(function successCallBack(response){
         		for(var i=0;i<response.data.length;i++){
         			if($scope.hostgroup.parentid == response.data[i].name){
	         			parentId = response.data[i].id;
	         			if(id==null||id==""){
							restCalls.submitNewForm(hostgroup,usernames,ipRange,parentId)
								.then(function successCallBack(response){
									$scope.refreshpage();
									$scope.banner = true;
									$scope.success = true;
									$scope.duplicate = false;
									$scope.update = false;
									$scope.delete = false;
							},
							function errorCallBack(error){
								if(error.status==-1){
								$scope.banner = true;
								$scope.duplicate = true;
								$scope.success = false;
								$scope.update = false;
								$scope.delete = false;
								}
							});
		 				}else{
							restCalls.updateForm(id,hostgroup,usernames,ipRange,parentId)
								.then(function successCallBack(response){
									$scope.banner = true;
									$scope.update = true;
								});
							}
	         		}
         		}
         	})	
	}
};


