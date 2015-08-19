angular.module('myApp',['myApp.directives']);

angular.module('myApp').controller('MainCtrl', function($scope){
	
	$scope.myText = 'Não selecionado';
	$scope.currentDate = '';
	$scope.updateMyText = function(date){
		$scope.myText = 'Selecionado';	
	};
});