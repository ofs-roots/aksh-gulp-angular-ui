angular.module('myApp')
.service('restCalls',function($http,$q){
		var deferred = $q.defer;
		this.updateForm = function(id,hostgroup,usernames,ipAddressRange){
			var values={
				id:id,
				name:hostgroup.name,
				 		parentid:hostgroup.parentid,
				 		hostBaseline:hostgroup.hostBaseline,
				 		suppressExcludedService:hostgroup.suppressExcludedService,
				 		inverseSuppression:hostgroup.inverseSuppression,
				 		hostTrap:hostgroup.hostTrap,
				 		sendToCta:hostgroup.sendToCta,
				 		description:hostgroup.description,
				 		hostGroupUser:usernames,
				 		ipAddress:ipAddressRange
			}
			return $http.put("http://localhost:8080/jerseyrest/rest/hostgroup",values);
		}
		this.submitNewForm = function(hostgroup,usernames,ipAddressRange){
			var values={
				 
				 name:hostgroup.name,
				 parentid:hostgroup.parentid,
				 hostBaseline:hostgroup.hostBaseline,
				 suppressExcludedService:hostgroup.suppressExcludedService,
				 inverseSuppression:hostgroup.inverseSuppression,
				 hostTrap:hostgroup.hostTrap,
				 sendToCta:hostgroup.sendToCta,
				 description:hostgroup.description,
				 hostGroupUser:usernames,
				 ipAddress:ipAddressRange
				
			}
			return $http.post("http://localhost:8080/jerseyrest/rest/hostgroup",values);
			// $http.post("http://localhost:8080/jerseyrest/rest/hostgroup",values)
			// 	.then(function successCallback(response){
			// 		deferred.resolve(response.data);
			// 	},
			// 		function errorCallback(errors){
			// 			deferred.reject(errors);
			// 		});
			// 	return deferred.promise;

		}

		this.getFlattenTree =  function(){
			

			return $http.get('http://localhost:8080/jerseyrest/rest/hostgroup/flatten');
		}

		this.deleteHostNode = function(id){
			return $http.delete("http://localhost:8080/jerseyrest/rest/hostgroup/delete/"+id,);
		}
})