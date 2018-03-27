

// describe('Service Test cases', function() {
// 	var _httpBackend,_restCalls;
// 	var response = {
//                     "id":1,
//                     "parentid":0,
//                     "name":"InsideHost",
//                     "hostbaseline":false,
//                     "suppress_excluded_service":false,
//                     "inverse_suppression":true,
//                     "host_trap":false,
//                     "send_to_cta":true,
//                     "description":"sd",
//                     "children":null
//                      }
//       var result={};
//     beforeEach(angular.mock.module('ngRoute'));
//     beforeEach(angular.mock.module('myApp'));
//  beforeEach(inject(function($httpBackend,restCalls){
//       _httpBackend = $httpBackend;
//       _restCalls = restCalls;
//       spyOn(myFactory, 'getFlattenTree').and.returnValue(response);
//     }))

//   it('should get hostgroup json',function(){
      
//       // _httpBackend.expect('GET','http://localhost:8080/jerseyrest/rest/hostgroup/flatten').respond(response);
//       _restCalls.getFlattenTree().then(function(responseData){
//         result = responseData;
//       });
//       // _httpBackend.flush();
//       expect(result).toEqual(response);
//     })
// });