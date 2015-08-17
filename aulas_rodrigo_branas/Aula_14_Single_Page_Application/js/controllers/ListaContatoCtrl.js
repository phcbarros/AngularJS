angular.module('ListaTelefonica').controller('ListaContatoCtrl',
	['$scope', '$http', 'contatos', 'SerialGenerator', 'ContatoAPI', 
		function($scope, $http, contatos, SerialGenerator, ContatoAPI){
		
	$scope.app = "Lista Telefônica";	
	$scope.contatos = [];
	
	var carregarContatos = function(){
		$scope.contatos = contatos.data;
		$scope.direcaoOrdenacao = true;
		$scope.ordenarPor('nome');
	}
					
	$scope.isContatoSelecionado =  function(contatos){
		return contatos.some(function(contato){
			return contato.selecionado;
		});
	};
	
	$scope.removerContato = function(contatos){
		 
		contatos.forEach(function(contato, index){
			if(contato.selecionado){		
				ContatoAPI.deleteContato(contato.id).success(function(){
					//ContatoAPI.getContatos().success(function(data){
					//	$scope.contatos = data;
					//});
					$scope.contatos = contatos.filter(function(contato){
						return !contato.selecionado;
					 });
				});
			}
		});	
	};
	
	//ordenação dos itens na tabela
	$scope.ordenarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;		
		$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;	
	};
		
	carregarContatos();
}]);