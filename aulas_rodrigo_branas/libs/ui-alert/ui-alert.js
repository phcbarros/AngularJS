angular.module('uiAlert', []);

angular.module('uiAlert').run(function($templateCache){
	$templateCache.put('view/alert.tpl.html', '<div class="ui-alert"><div class="ui-alert-title">{{title}}</div><div class="ui-alert-message" ng-transclude></div></div>');
});

angular.module('uiAlert').directive('uiAlert', function(){
	return {
		templateUrl: 'view/alert.tpl.html',
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