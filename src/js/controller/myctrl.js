angular.module('myApp')
		.controller('myctrl', myCtrl);

myCtrl.$inject = ['restCalls','modelData','$scope','$window','$routeParams'];

function myCtrl(restCalls,modelData,$scope,$window,$routeParams){

	

	$scope.export = function(){
		$window.open('http://localhost:8080/jerseyrest/rest/hostgroup/export');
	}

	$scope.refreshpage = function(){
		$scope.initleft();
	}
	
	$scope.cancel = function(){
			location.reload();
	}
	$scope.flattenTree =[];
	// var flatten=[];
	$scope.initleft = function(){
		$scope.jstree();
		}
	
	$scope.initleft = function(){
		
		$(function () {
			var getData;
		 	var tree=[];
		 	restCalls.getFlattenTree()
         		.then(function successCallBack(response){
         			$scope.flattenTree = response.data;
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
                	'data': tree,
                	'multiple':false
              	},
              	'themes':{
              		'icons':false
              	},
             	"checkbox" : {
     				"three_state" : false, // to avoid that fact that checking a node also check others
      				"whole_node" : false,
   				},
              	"check_callback" : true,
              	'plugins':[ "contextmenu","checkbox","wholerow","themes","search"],
              	'search':{
              		"case_sensitive":false,
              		"show_only_matches":true
              	},
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
         										$scope.export=false;
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
           							$scope.hostgroup={};
           							if(id==0){
           										$scope.hostgroup.parentid="--";
           								}else{
           									$scope.flatten = $scope.flattenTree;

         											for(var i=0;i<$scope.flatten.length;i++){
         												if(id==$scope.flatten[i].id){
				           									$scope.hostgroup.parentid=$scope.flatten[i].name;
				           								}
         											}
           								}
           								
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
           								
           								
           						}
                           	}
						};
					}
				}
            });
        }
        $("#jstree-panel").on("loaded.jstree", function(){
    		$('#jstree-panel').jstree(true).select_node($routeParams.id);
		});
       
		$('#jstree-panel').on("changed.jstree", function (e, data) {
	        var id = data.node.id;
	        	$scope.$apply(function(){
	         		var result=$scope.flattenTree;
					for(var i=0;i<result.length;i++){
						if(result[i].id==id){
							$scope.hostgroup = result[i];
							$scope.hostgroup.user = result[i].hostGroupUser.join('\n');
							var ip=[];
							for(j=0;j<result[i].ipAddress.length;j++){
								ip.push(result[i].ipAddress[j].ipAddresses);
							}
							$scope.hostgroup.ip_address=ip.join('\n');
							for(var m=0;m<result.length;m++){
								if(result[i].parentid == result[m].id){
									$scope.hostgroup.parentid = result[m].name;
								}else{
									if(result[i].parentid == 0){
										$scope.hostgroup.parentid = "--"
									}
								}
							}
						}
					}
				});
	     });
	    $('.search').keypress(function(e){
	    	var searchString = $(this).val();
	    	if(searchString.length >=3 && e.which == 13){
	    	$('#jstree-panel').jstree('search',searchString);
	    }
	    })
	    $('.search').keydown(function(e){
	    	if(e.which==8){
	    		$scope.refreshpage();
	    	}
	    })
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
		
        for(var i=0;i<$scope.flattenTree.length;i++){
        	if($scope.hostgroup.parentid == $scope.flattenTree[i].name){
	         	parentId = $scope.flattenTree[i].id;
	         	$scope.saveOrUpdate(id,hostgroup,usernames,ipRange,parentId);
	         }	
         		 }
         		 if($scope.hostgroup.parentid=="--"){
	         	parentId = 0;
	         	$scope.saveOrUpdate(id,hostgroup,usernames,ipRange,parentId);

	         }
         	// })	
	}
	
	$scope.saveOrUpdate = function(id,hostgroup,usernames,ipRange,parentId){
		if(id==null||id==""){
	         			var response = modelData.jsonWithoutId(hostgroup,usernames,ipRange,parentId);
						restCalls.submitNewForm(response)
							.then(function successCallBack(response){
								$scope.refreshpage();
								$scope.banner = true;
								$scope.success = true;
								$scope.export=false;
								$scope.duplicate = false;
								$scope.update = false;
								$scope.delete = false;
							},
							function errorCallBack(error){
								if(error.status==-1){
								$scope.banner = true;
								$scope.duplicate = true;
								$scope.export=false;
								$scope.success = false;
								$scope.update = false;
								$scope.delete = false;
								}
							});
		 				}else{
		 					var response = modelData.jsonWithId(id,hostgroup,usernames,ipRange,parentId)
							restCalls.updateForm(response)
								.then(function successCallBack(response){
									$scope.banner = true;
									$scope.update = true;
									$scope.export=false;
									$scope.success = false;
									$scope.delete = false;
									$scope.duplicate = false;
								
								});
							}
	         		 }
};

