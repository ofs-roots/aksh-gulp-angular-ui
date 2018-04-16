angular.module('myApp')
.controller('ipValidation', direc);

direc.$inject = ['$scope'];

function direc($scope){
		return{
			restrict:'A',
			link: function($scope){
				var ipAddressRange = $scope.hostgroup.ip_address.split(/[ ,\n]+/);
				for(var i=0;i<ipAddressRange.length;i++){
					if(ipAddressRange[i].match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)){

					}
				}
			}
		}
	}