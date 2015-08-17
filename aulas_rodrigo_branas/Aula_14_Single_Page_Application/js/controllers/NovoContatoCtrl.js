angular.module('ListaTelefonica').controller('NovoContatoCtrl', ['$scope', 'operadoras', 'ContatoAPI', 'SerialGenerator', '$location', 
	function($scope, operadoras, ContatoAPI, SerialGenerator, $location){
	
	var carregarOperadoras = function(){
		$scope.operadoras = operadoras.data;
	}
	
	$scope.adicionarContato = function(contato){
		contato.serial = SerialGenerator.generate();
		contato.data = new Date();
		ContatoAPI.postContato(contato).success(function(data){
			delete $scope.contato; //apaga o objeto do escopo
			$scope.contatoForm.$setPristine(); //seta o form para pristine
			$location.path('/contatos');
		});
	};
	
	carregarOperadoras();
	
}]);
