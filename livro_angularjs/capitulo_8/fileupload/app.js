angular.module('myApp', ['myApp.directives']).controller('MainCtrl', function($scope){
	$scope.uploadFinished = function(e, data){
		console.log('uploado finalizado');
	}
});