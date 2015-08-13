/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
angular.module('ListaTelefonica').directive('uiDate', function($filter){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			
			var _formatDate = function(date){
				
				if(!date) return date;
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
				//console.log('parseador');
				if(value.length === 10){
					var arrayDate = value.split('/');
					return new Date(arrayDate[2], parseInt(arrayDate[1]) - 1, arrayDate[0]).getTime();	
				}
			});
			
			//$formatters = Array de funções executadas sempre que o valor do modelo mude
			//As funções são chamadas na ordem inversa
			ctrl.$formatters.push(function(value){
				//console.log('formatador');
				//$filter(tipo)(value, mascara);
				return $filter('date') (value,'dd/MM/yyyy');
			});


			//$validators
			//Uma lista de validações que são aplicadadas sempre que o valor do modelo muda
			//O valor da chave dentro do objeto refere-se ao nome do validador enquanto a função refere-se a operação de validação
			//A operação de validação dentro do objeto deve retornar true ou false dependendo da resposta da validação
			
			//validação somente para teste de entendimento do $validators
			ctrl.$validators.validDateDay = function(modelValue, viewValue ){
				
				//console.log('validador Dia', modelValue, viewValue);
			
				var value = viewValue, //(modelValue || viewValue)
					arrayDate;
						
				if (!value) return false;
			
				if(viewValue.length === 10){
					arrayDate = viewValue.split('/');
										
					if (parseInt(arrayDate[0]) > 31)
						return false;
						
					return true;
				}
				
				return false;
			};
			
			//validação somente para teste de entendimento do $validators
			ctrl.$validators.validDateMonth = function(modelValue, viewValue ){
				
				//console.log('validador Mês', modelValue, viewValue);
			
				var value = viewValue, //(modelValue || viewValue)
					arrayDate;
						
				if (!value) return false;
			
				if(viewValue.length === 10){
					arrayDate = viewValue.split('/');
										
					if (parseInt(arrayDate[1])-1 > 11)
						return false;
						
					return true;
				}
				
				return false;
			};
			
			//validação somente para teste de entendimento do $validators
			ctrl.$validators.validDateYear = function(modelValue, viewValue ){
				
				//console.log('validador Ano', modelValue, viewValue);
			
				var value = viewValue, //(modelValue || viewValue)
					arrayDate, anoAtual;
						
				if (!value) return false;
			
				if(viewValue.length === 10){
					arrayDate = viewValue.split('/');
					anoAtual = new Date().getFullYear();
					
					if(parseInt(arrayDate[2]) > anoAtual)
						return false;
						
					return true;
				}
				
				return false;
			};


		}
	}
});