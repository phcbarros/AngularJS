/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
angular.module('ListaTelefonica').directive('uiDate', function($filter){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			
			var _formatDate = function(date){
				date = date.replace(/[^0-9]+/g, ''); //limpa o campo antes de formatar
				
				if(date.length > 2)
					date = date.substring(0,2) + '/' + date.substring(2);
				
				if(date.length > 5)
					date = date.substring(0,5) + '/' + date.substring(5,9);
					
				return date;
			};
			
			element.bind('keyup', function(){
				//$viewValue = atual string na view
				//$setViewValue = atualiza a view
				//$$render = chamado para renderizar a view
				ctrl.$setViewValue(_formatDate(ctrl.$viewValue));
				ctrl.$render();
			});
			
			//$parsers = Array de funções executadas sempre que o controle lê o valor do DOM
			//As funções são chamadas na ordem que foram adicionadas
			ctrl.$parsers.push(function(value){
				if(value.length === 10){
					var arrayDate = value.split('/');
					return new Date(arrayDate[2], parseInt(arrayDate[1]) - 1, arrayDate[0]).getTime();	
				}
			});
			
			//$formatters = Array de funções executadas sempre que o valor do modelo mude
			//As funções são chamadas na ordem inversa
			ctrl.$formatters.push(function(value){
				//$filter(tipo)(value, mascara);
				return $filter('date') (value,'dd/MM/yyyy');
			});

		}
	}
});