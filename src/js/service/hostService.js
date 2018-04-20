angular.module('myApp')
.service('restCalls',function($http,$q){

        this.getFlattenTree =  function(){
			return $http.get('http://localhost:8080/jerseyrest/rest/hostgroup/flatten');
		}

		this.updateForm = function(jsondata){
			return $http.put("http://localhost:8080/jerseyrest/rest/hostgroup",jsondata);
		}

		this.submitNewForm = function(jsondata){
			return $http.post("http://localhost:8080/jerseyrest/rest/hostgroup",jsondata);
		}

		this.deleteHostNode = function(id){
			return $http.delete("http://localhost:8080/jerseyrest/rest/hostgroup/delete/"+id);
		}

		this.doExport = function(){
			return $http.get("http://localhost:8080/jerseyrest/rest/hostgroup/export");
		}
})