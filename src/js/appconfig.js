angular.module('myApp')
	.config(['$routeProvider',function ($routeProvider) {
		var routeConfig = {
			controller: 'myctrl',
			templateUrl: './partials/hostctrl.html',
			
		};

		$routeProvider
			.when('/hostgroup', routeConfig)
			.when('/hostgroup/:id',routeConfig)
			.otherwise({
				redirectTo: '/hostgroup'
			});
	}]);
