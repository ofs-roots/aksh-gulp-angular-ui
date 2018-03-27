describe('Controller Test cases', function() {
    var _scope, _controller,_httpBackend,_restCalls;
    beforeEach(angular.mock.module('ngRoute'));
    beforeEach(angular.mock.module('myApp'));
    beforeEach(inject(function($q, _myFactory_){ //Mock our factory and spy on methods
            d = $q.defer();
            myFactory = _myFactory_;
            spyOn(myFactory, 'fetchServerData').and.returnValue(d.promise);
        }));
    beforeEach(inject(function($controller, $rootScope) {
      _controller = $controller;
      _rootScope = $rootScope;
      _scope = $rootScope.$new();
       _controller('testCtrl', {
       _restCalls: restCalls, 
        $scope: _scope 
      });
      // _rootScope.apply();
    }));

   
    it('Scope data validation', function() {
      console.log(_scope.greeting);
    });
    it('Adding two numbers', function(){
      _scope.addTwoNumbers(5,2);
      expect(_scope.result).toBe(7);
      console.log(_scope.result);
    });


});