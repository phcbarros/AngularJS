//usando o padrao service onde é passado uma função construtora então usa-se o this

angular.module('ListaTelefonica').service('OperadoraAPI', function($http, config){
	this.getOperadoras = function(){
		return 	$http.get(config.baseUrl +'/operadoras');
	};
});