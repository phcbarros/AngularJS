angular.module("eventModel")
	.controller("fruitCtrl", fruitCtrl)
	.controller("deliveryCtrl", deliveryCtrl)
	.factory("logService", logService)
	.directive("fruit", fruit)
	.directive("fruitTracker", fruitTracker);

function fruitCtrl($scope, $rootScope){
	$scope.fruits = ["Banana", "Uva", "Jabuticaba", "Acerola"];
		
	$scope.deliver = function(fruit){
		$rootScope.$broadcast("delivery.request", fruit);
		delete $scope.fruit;
	};
		
};

function deliveryCtrl($scope, $timeout, logService){
	$scope.$on("delivery.request", function(e, data){
		$scope.received = true;
		$scope.delivery = data;
		logService.track("delivery.request", data);
		$timeout(function(){
			$scope.received = false;
			delete $scope.delivery;
		}, 1000);
	});
};
	
function fruit(){
	return {
		scope:{
			type: "=type"
		},
		template: "<button ng-click='eat()'>I want to eat some {{type}}!</button>",
		link: function(scope, element, attrs){
			scope.eat = function(){
				scope.$emit("fruit.order", scope.type, element);	
			};
		}
	};	
};

function fruitTracker(logService){
	return {
		link: function(scope, element, attrs){
			scope.$on("fruit.order", function(e, type){
				logService.track('fruit-eater', type);
			});
		}
	};	
};

function logService($log){
	
	var _track = function(eventType, message){
		$log.info(eventType, message)
	};
	
	return {
		track: _track
	};
};

