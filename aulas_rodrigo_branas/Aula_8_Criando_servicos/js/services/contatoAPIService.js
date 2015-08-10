//usando o padrão factory 
angular.module("ListaTelefonica").factory("ContatoAPI", function($http, config){
	
	var _getContatos = function(){
		return $http.get(config.baseUrl + '/contatos');
	}
	
	var _postContato = function(contato){
		return $http.post(config.baseUrl + '/contatos', contato);
	}
	
	return {
		getContatos: _getContatos,
		postContato: _postContato
	}
	
});