/// <reference path="../../../typings/angularjs/angular.d.ts"/>
angular.module('myUiAccordion', []); //criação do módulo myUiAccordion

//run = Usado para registrar tarefas que devem ser executadas no carregamento do módulo
angular.module('myUiAccordion').run(function($templateCache){
	//$templateCache é usado para carregar o template pela primeira vez quando carrega-se a tela, nas vezes seguinte o template estará no cache
	$templateCache.put('view/accordion.tpl.html', '<div class="ui-accordion-title" ng-click="open()">{{title}}</div><div class="ui-accordion-content" ng-show="isOpened" ng-transclude></div>');
});

//responsável pela comunicação entre as diretivas
angular.module('myUiAccordion').directive('uiAccordions', function(){
	return {
		restrict: 'E',
		controller: function($scope, $element, $attrs){
			var accordions = [];
			
			this.restisterAccordion = function(accordion){
				accordions.push(accordion);
			}
			
			this.closeAll = function(){
				accordions.forEach(function(accordion){
					accordion.isOpened = false;
				});
			}
		}
	}
});

//diretiva que irá conter os dados
angular.module('myUiAccordion').directive('uiAccordion', function(){
	return {
		require: '^uiAccordions',
		restrict: 'E',
		templateUrl: 'view/accordion.tpl.html',
		transclude: true,
		scope: {
			title: '@'
		},
		link: function(scope, element, attrs, ctrl){
			
			ctrl.restisterAccordion(scope);
			
			scope.open = function(){
				var isOpened = !scope.isOpened
				ctrl.closeAll();
				scope.isOpened = isOpened;
			}
		}
	};	
});