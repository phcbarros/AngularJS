angular.module('ListaTelefonica').controller('ListaTelefonicaCtrl',
	['$scope', '$http', 'ContatoAPI', 'OperadoraAPI', 'SerialGenerator', function($scope, $http, ContatoAPI, OperadoraAPI, SerialGenerator){
		
	$scope.app = "Lista Telefônica";	
	$scope.contatos = [];	
	$scope.operadoras = [];
	
	var carregarContatos = function(){
		ContatoAPI.getContatos().success(function(data){			
			$scope.contatos = data;
			$scope.direcaoOrdenacao = true;
			$scope.ordenarPor('nome');
		}).error(function(error){
			$scope.error = "Não foi possível carregar os dados!";
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
		
		contatos.forEach(function(contato, index){
			if(contato.selecionado){			
				ContatoAPI.deleteContato(contato.id).success(function(data){
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
	
	//ordenação dos itens na tabela
	$scope.ordenarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;		
		$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;	
	};
			
	carregarContatos();
	carregarOperadoras();
}]);