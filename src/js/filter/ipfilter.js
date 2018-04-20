angular.module('myApp')
.filter('IpFilter',function(){
	return function(input){
		var result;
		for (i=0;i<input.length;i++){
		if(input[i].match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/)){
			result="Valid";
		}else{
			result="Invalid";
			break;
		}
	}
		return result;
	}

})