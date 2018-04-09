angular.module('myApp')
.service('restCalls',function($http,$q){

        this.getFlattenTree =  function(){
			return $http.get('http://localhost:8080/jerseyrest/rest/hostgroup/flatten');
		}

		this.updateForm = function(id,hostgroup,usernames,ipAddressRange,parentid){
			var values={
				id:id,
				name:hostgroup.name,
				parentid:parentid,
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

		this.submitNewForm = function(hostgroup,usernames,ipAddressRange,parentid){
			var values={
				 name:hostgroup.name,
				 parentid:parentid,
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
		}

		this.deleteHostNode = function(id){
			return $http.delete("http://localhost:8080/jerseyrest/rest/hostgroup/delete/"+id);
		}

		this.doExport = function(){
			return $http.get("http://localhost:8080/jerseyrest/rest/hostgroup/export");
		}
})