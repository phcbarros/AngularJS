angular.module('myApp', ['myApp.services']);
angular.module('myApp').controller('MainCtrl', function($scope, socket){
	
	$scope.message = '';
	$scope.messages = [];
	
	socket.on('new:msg', function(message){
		console.log("on", message)
		$scope.messages.push(message);
	});
	
	
	$scope.broadcast = function(){
		var msg = { date : Date.now(), message: $scope.message}
		socket.emit('broadcast:msg', msg );
		$scope.messages.push(msg);
		$scope.message = '';
	}
});

