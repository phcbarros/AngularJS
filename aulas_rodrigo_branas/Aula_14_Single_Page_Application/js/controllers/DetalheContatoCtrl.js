angular.module('ListaTelefonica').controller('DetalhesContatoCtrl',['$scope',  'contato', '$filter', function($scope, contato, $filter){
	
	var aplicarFiltro = function(contato){
		contato.nome = $filter('name')(contato.nome);
		$scope.contato = contato;
	} ;
	
	aplicarFiltro(contato.data);
}]);