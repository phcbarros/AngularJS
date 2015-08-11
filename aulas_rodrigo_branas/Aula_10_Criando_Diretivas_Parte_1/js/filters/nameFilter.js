/// <reference path="../../../typings/angularjs/angular.d.ts"/>
angular.module("ListaTelefonica").filter('name', function(){
	
	return function(input){
		var listaDeNomes = input.split(' '), 
			listaDeNomesFormatada;
		
		listaDeNomesFormatada = listaDeNomes.map(function(nome){
			if(/^(da|de|dos)$/.test(nome.toLowerCase())) return nome.toLowerCase();
			return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
		});
		
		return listaDeNomesFormatada.join(' ');
	};
	
});