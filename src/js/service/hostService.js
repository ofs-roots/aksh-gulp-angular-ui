angular.module('myApp')
.service('restCalls',function($http,$q){
		var deferred = $q.defer;
		this.submit = function(id,hostgroup){
			var values={
				name:hostgroup.name,
				 		parentid:hostgroup.parentid,
				 		hostbaseline:hostgroup.hostbaseline,
				 		suppress_excluded_service:hostgroup.suppress_excluded_service,
				 		inverse_suppression:hostgroup.inverse_suppression,
				 		host_trap:hostgroup.host_trap,
				 		send_to_cta:hostgroup.send_to_cta,
				 		description:hostgroup.description
			}
			return $http.put("http://localhost:8080/jerseyrest/rest/hostgroup/"+id,values);
		}
		this.submitNewForm = function(hostgroup){
			var values={
				 
				 name:hostgroup.name,
				 parentid:hostgroup.parentid,
				 hostbaseline:hostgroup.hostbaseline,
				 suppress_excluded_service:hostgroup.suppress_excluded_service,
				 inverse_suppression:hostgroup.inverse_suppression,
				 host_trap:hostgroup.host_trap,
				 send_to_cta:hostgroup.send_to_cta,
				 description:hostgroup.description,
				
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