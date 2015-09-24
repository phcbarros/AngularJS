angular.module('myApp')
	.controller('toDoController', ['$scope', toDoController]);
	
function toDoController($scope){
		
	$scope.add = function(tarefa){
		$scope.tarefas.push(angular.copy(tarefa));
		delete tarefa.nome;	
	};
	
	var init = function(){
		$scope.tarefas = [];	
	};
	
	init();
};