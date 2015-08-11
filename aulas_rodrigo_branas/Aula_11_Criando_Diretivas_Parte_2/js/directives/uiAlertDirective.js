/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
angular.module('ListaTelefonica').directive('uiAlert', function(){
	return {
		templateUrl: 'view/alert.html',
		replace: true, //substitui o elemento pela conteudo do template
		restrict: 'AE', //restringe o modo de utilização da diretiva	ao atributo, elemento, classe e comentário, default atributo
		scope:{
			title: '@'
		}, 
		transclude: true //é possivel encapsular elementos dentro de uma diretiva
	}
	
	//scope permite isolar o scpope aumentando o grau de reusabilidade,
	//@ vincula um atributo a uma propriedade do scope da diretiva
	//= cria um vínculo bi-direcional entre uma propriedade do scope do template
	// a uma propriedade do scope da diretiva
});