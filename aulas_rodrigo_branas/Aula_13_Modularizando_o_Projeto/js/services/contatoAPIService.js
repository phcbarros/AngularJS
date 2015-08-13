//usando o padrão factory 
angular.module("ListaTelefonica").factory("ContatoAPI", function($http, config){

	var _getContatos = function(){
		return $http.get(config.baseUrl + '/contatos', {cache: true});
	}
	
	var _postContato = function(contato){
		return $http.post(config.baseUrl + '/contatos', contato);
	}
	
	var _deleteContato = function(id){
		return $http.delete(config.baseUrl + '/contatos/' + id);
	}
	
	return {
		getContatos: _getContatos,
		postContato: _postContato,
		deleteContato: _deleteContato
	}
	
});