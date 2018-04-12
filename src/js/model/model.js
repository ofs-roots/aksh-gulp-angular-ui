angular.module('myApp')
.factory('modelData',function(){
		var factory={};
		factory.jsonWithId = function(id,hostgroup,usernames,ipAddressRange,parentid){
			factory={
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
			return factory;
		}
		factory.jsonWithoutId = function(hostgroup,usernames,ipAddressRange,parentid){
			factory={
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
			return factory;
		}
	return factory;
})