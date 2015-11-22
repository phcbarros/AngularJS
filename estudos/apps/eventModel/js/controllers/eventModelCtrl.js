angular.module("eventModel")
	.controller("fruitCtrl", fruitCtrl)
	.controller("deliveryCtrl", deliveryCtrl)
	.factory("logService", logService)
	.factory("notificationService", notificationService)
	.directive("fruit", fruit)
	.directive("fruitTracker", fruitTracker);

function fruitCtrl($scope, $rootScope, notificationService){
	$scope.fruits = ["Banana", "Uva", "Jabuticaba", "Acerola"];
	$scope.events = [];
	
	function clear(){
		delete $scope.fruit;
	};
	
	$scope.deliverBroadcast = function(fruit){
		$rootScope.$broadcast("delivery.request", fruit);
		clear();
	};
	
	$scope.deleveryNotificationService = function(fruit){
		notificationService.notify(fruit);
		clear();
	};
	
	//notificationService.load();
	// notificationService.subscribe(function(data){
	// 	$scope.events.push(data);
	// 	$scope.$apply();
	// });
		
};

function deliveryCtrl($scope, $timeout, logService, notificationService){
	
	//using $broadcast
	$scope.$on("delivery.request", function(e, data){
		exibirDados(data);
	});
	
	//using notificationService
	notificationService.subscribe(function(data){
		exibirDados(data);
	});
	
	var exibirDados = function(data){
		$scope.received = true;
		$scope.delivery = data;
		
		logService.track("delivery.request", data);
		
		$timeout(function(){
			$scope.received = false;
			delete $scope.delivery;
		}, 1000);
	}
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


function notificationService($rootScope){
	function notify(data){
		$rootScope.$emit("notificationService.update", data);	
	};
	
	function listen(fn){
		$rootScope.$on("notificationService.update", function(e, data){
			fn(data);	
		});
	};
	
	// Anything that might have a reason
   	// to emit events at later points in time
   	function load () {
    	setInterval(notify.bind(null, 'Something happened!'), 1000);
   	};
	
	return{
		subscribe: listen,
		notify: notify,
		load: load
	};
};