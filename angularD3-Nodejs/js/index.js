angular.module('BlankApp', ['ngMaterial', 'nvd3ChartDirectives'])
    .config(function($mdThemingProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
	    $mdThemingProvider.theme('default')
            .primaryPalette('blue');
        $mdThemingProvider.theme('altTheme')
            .primaryPalette('teal');
    }).service('portalService', ['$http', function ($http) {
	var service ={};
   service.create = function() {
    return  $http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

                url: 'http://localhost:8081/createPortal' 
            })
   }
      service.update = function(portal) {
	  var urlvalue = 'http://localhost:8081/retrievePortal/'+portal[0].id ;
	  console.log(urlvalue);
      return  $http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

                url: urlvalue
            })
   }

      service.delete = function(portal) {
	  
	  var urlvalue = 'http://localhost:8081/deletePortal/'+portal[0].id ;
	  console.log(urlvalue);
       return  $http({
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },

                url: urlvalue
            })
   }

      return service;

}])
    .controller('AppCtrl', function($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleRight = buildToggler('right');

        $scope.isOpenRight = function() {
            return $mdSidenav('right').isOpen();
        };
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
        function buildDelayedToggler(navID) {
            return debounce(function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }

        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle()
                    .then(function() {
                        $log.debug("toggle " + navID + " is done");
                    });
            }
        }
    })
    .controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
        $scope.close = function() {
            $mdSidenav('right').close()
                .then(function() {
                    $log.debug("close RIGHT is done");
                });
        };
    })
    .controller('BasicDemoCtrl', function DemoCtrl($scope, $mdDialog, portalService) {




        $scope.xFunction = function() {
            return function(d) {
                return d.key;
            };
        }
        $scope.yFunction = function() {
            return function(d) {
                return d.y;
            };
        }

        $scope.descriptionFunction = function() {
            return function(d) {
                return d.key;
            }
        }


        $scope.portal = [];
        var originatorEv;
        $scope.portal = [];
        this.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        this.notificationsEnabled = true;
        this.toggleNotifications = function() {
            this.notificationsEnabled = !this.notificationsEnabled;
        };
        $scope.delete = function(index,portal) {
           	portalService.delete(portal).success(function(response) {
				  var index = $scope.portal.indexOf(portal);
				  $scope.portal.splice(index, 1);
 
            });
        }
		$scope.create = function() {
           	portalService.create().success(function(response) {
				response.data = $scope.exampleData;
				response.name= 'Portal';
				 $scope.portal.push(response);
            });
        }
        $scope.update = function(index,portal) {
            portalService.update(portal).success(function(response) {
				$scope.portal[index] = response;
				$scope.portal[index].data = $scope.exampleData;
            });

        }
$scope.exampleData = [{
    key: "One",
    y: 5
}, {
    key: "Two",
    y: 2
}, {
    key: "Three",
    y: 9
}, {
    key: "Four",
    y: 7
}, {
    key: "Five",
    y: 4
}, {
    key: "Six",
    y: 3
}, {
    key: "Seven",
    y: 9
}];


            originatorEv = null;
        

    });