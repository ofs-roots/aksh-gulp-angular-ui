describe('Controller Test cases', function() {
    var _scope, _controller;
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function($controller, $rootScope) {
      _controller = $controller;
      _rootScope = $rootScope;
      _scope = $rootScope.$new();
      _controller('myctrl', { 
        $scope: _scope 
      });
     // _rootScope.apply();
    }));
    it('Scope data validation', function() {
      console.log(_scope.greeting);
    });
});