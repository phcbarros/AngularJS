angular.module('myApp')
	.controller('toDoController', ['$scope', toDoController]);
	
function toDoController($scope){
		
	var init = function(){
		$scope.tarefas = [];	
	};
	
	$scope.add = function(event, tarefa){
		if(event.keyCode === 13){
			$scope.tarefas.push(angular.copy(tarefa));
			delete tarefa.nome;	
		}
	};
	
	init();
};