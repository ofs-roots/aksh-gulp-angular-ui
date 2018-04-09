angular.module('myApp')
	.config(['$routeProvider',function ($routeProvider) {
		var routeConfig = {
			controller: 'myctrl',
			templateUrl: './partials/hostctrl.html',
			
		};

		$routeProvider
			.when('/hostgroup', routeConfig)
			.otherwise({
				redirectTo: '/hostgroup'
			});
	}]);
