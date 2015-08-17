angular.module('ListaTelefonica').config(['$routeProvider', function($routeProvider){
	
	$routeProvider.when('/contatos', {
		templateUrl: 'view/contatosLista.html',
		controller: 'ListaContatoCtrl',
		resolve: { //resolvendo dependências
			contatos: function(ContatoAPI){
				return ContatoAPI.getContatos();
			}
		}
	})
	.when('/novocontato', {
		templateUrl: 'view/novoContato.html',
		controller: 'NovoContatoCtrl',
		resolve: {
			operadoras: function(OperadoraAPI){
				return OperadoraAPI.getOperadoras();
			}
		}
	})
	.when('/detalhes/:id', {
		templateUrl: 'view/contatoDetalhes.html',
		controller: 'DetalhesContatoCtrl',
		resolve: { 
			contato: function(ContatoAPI, $route){
				return ContatoAPI.getContato($route.current.params.id); //$route.current.params.id peg o id do contato da a rota atual
			}
		}
	})
	.otherwise({
		redirectTo: '/contatos'
	});
	
}]);