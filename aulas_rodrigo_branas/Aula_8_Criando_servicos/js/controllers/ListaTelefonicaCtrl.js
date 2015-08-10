angular.module('ListaTelefonica').controller('ListaTelefonicaCtrl',
	['$scope', '$http', 'ContatoAPI', 'OperadoraAPI', 'SerialGenerator', function($scope, $http, ContatoAPI, OperadoraAPI, SerialGenerator){
		
	$scope.app = "Lista Telefônica";	
	$scope.contatos = [];	
	$scope.operadoras = [];
	
	console.log(SerialGenerator.generate())
	
	var carregarContatos = function(){
		ContatoAPI.getContatos().success(function(data){			
			$scope.contatos = data;
			$scope.direcaoOrdenacao = true;
			$scope.ordenarPor('nome');
		});
	}
			
	var carregarOperadoras = function(){
		OperadoraAPI.getOperadoras().success(function(data){
			$scope.operadoras = data;
		});
	}
	
	$scope.adicionarContato = function(contato){
		contato.serial = SerialGenerator.generate();
		contato.data = new Date();
		ContatoAPI.postContato(contato).success(function(data){
			$scope.contatos.push(data); 
			delete $scope.contato; //apaga o objeto do escopo
			$scope.contatoForm.$setPristine(); //seta o form para pristine	
		});
	};
		
	$scope.removerContato = function(contatos){
		//$scope.contatos = contatos.filter(function(contato){
		//	return !contato.selecionado;
		//});	
		
		contatos.forEach(function(contato){
			if(contato.selecionado){
				$http.delete('http://localhost:3000/contatos/' + contato.id).success(function(data){
					carregarContatos();
				});
			}
		});	
	};
	
	$scope.isContatoSelecionado =  function(contatos){
		return contatos.some(function(contato){
			return contato.selecionado;
		});
	};
	
	//ordeção dos itens na tabela
	$scope.ordenarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;		
		$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;	
	};
			
	carregarContatos();
	carregarOperadoras();
}]);