angular.module('myApp')
	.config(['$routeProvider',function ($routeProvider) {
		 // 'use strict';

		var routeConfig = {
			controller: 'myctrl',
			templateUrl: './partials/hostctrl.html',
			// resolve: {
			// 	store: ['todoStorage', function (todoStorage) {
			// 		// Get the correct module (API or localStorage).
			// 		return todoStorage;
			// 	}]
			// }
		};

		$routeProvider
			.when('/hostgroup', routeConfig)
			.otherwise({
				redirectTo: '/hostgroup'
			});
	}]);
