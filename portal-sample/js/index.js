angular.module('BlankApp', ['ngMaterial','nvd3ChartDirectives'])
.config(function($mdThemingProvider,$httpProvider) {

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
       

		
  $mdThemingProvider.theme('default')
    .primaryPalette('blue');
  $mdThemingProvider.theme('altTheme')
    .primaryPalette('teal');
})
.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleRight = buildToggler('right');
	
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
})
  .controller('BasicDemoCtrl', function DemoCtrl($scope,$mdDialog,$http) {
  
                
			function fetchData(serialNo){
			
			           return         $http({
                        method: 'GET',
						headers: {
   'Content-Type': 'application/json'
 },
					
						url: 'http://localhost:8081/'+ serialNo
                    }) }
 
 
 
 
 
    $scope.exampleData = [
                {
                    key: "One",
                    y: 5
                },
                {
                    key: "Two",
                    y: 2
                },
                {
                    key: "Three",
                    y: 9
                },
                {
                    key: "Four",
                    y: 7
                },
                {
                    key: "Five",
                    y: 4
                },
                {
                    key: "Six",
                    y: 3
                },
                {
                    key: "Seven",
                    y: 9
                }
            ];

            $scope.xFunction = function(){
                return function(d) {
                    return d.key;
                };
            }
            $scope.yFunction = function(){
                return function(d) {
                    return d.y;
                };
            }

            $scope.descriptionFunction = function(){
                return function(d){
                    return d.key;
                }
            }
			
			
   $scope.portal = [];
  var originatorEv;
  $scope.portal =[];
  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
  this.notificationsEnabled = true;
  this.toggleNotifications = function() {
    this.notificationsEnabled = !this.notificationsEnabled;
  };
   $scope.delete = function(index) {
   $scope.portal.splice(index,1);
   }
   
   $scope.update = function(index) {
    $scope.portal.splice(index,1);
	
	fetchData(index+1).success(function(response){
                           $scope.portal.push({name:'Portal '+(index+1),data:response
						});
                          
                        })
   }
  
  this.redial = function($event) {
	fetchData($scope.portal.length+1).success(function(response){
                           $scope.portal.push({name:'Portal '+($scope.portal.length+1),data:response
						});
                          
                        })
	
	
    originatorEv = null;
  };
  
});