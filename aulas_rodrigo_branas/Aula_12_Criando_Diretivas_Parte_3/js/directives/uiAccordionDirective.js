/// <reference path="../../../../typings/angularjs/angular.d.ts"/>

//responsável pela comunicação entre as diretivas
angular.module('ListaTelefonica').directive('uiAccordions', function(){
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

angular.module('ListaTelefonica').directive('uiAccordion', function(){
	return {
		require: '^uiAccordions',
		restrict: 'E',
		templateUrl: 'view/accordion.html',
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