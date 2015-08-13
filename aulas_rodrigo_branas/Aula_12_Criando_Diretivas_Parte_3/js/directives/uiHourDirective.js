angular.module('ListaTelefonica').directive('uiHour', function(config, $filter){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			
			element.bind('keyup', function(){
				//$viewValue = atual string na view
				//$setViewValue = atualiza a view
				//$$render = chamado para renderizar a view
				ctrl.$setViewValue(_formatHour(ctrl.$viewValue));
				ctrl.$render();
			});
			
			var _formatHour = function(hour){
				var h, m;
				
				if(!hour) return hour;
				hour = hour.replace(config.regexOnlyNumber, '');
				
				if(hour.length === 2){
					h = parseInt(hour.substring(0,2));
					if(h < 0 || h > 23) 
						return '';
				}
				
				if(hour.length > 2){		
					m = parseInt(hour.substring(2,4));
					
					if(m < 0 || m > 59) 
						return hour.substring(0,2) + ':';
					
					hour = hour.substring(0,2) + ':' + hour.substring(2,4);
				}
					
				return hour;
			}
			
			//$parsers = Array de funções executadas sempre que o controle lê o valor do DOM
			//As funções são chamadas na ordem que foram adicionadas
			ctrl.$parsers.push(function(value){
				
				if(value.length === 5){
					var arrayHour = value.split(":"),
						data = new Date();
					
					data.setHours(arrayHour[0]);
					data.setMinutes(arrayHour[1]);
					data.setSeconds(0);

					return data;	
				}
			});
			
			//$formatters = Array de funções executadas sempre que o valor do modelo muda
			//As funções são chamadas na ordem inversa
			ctrl.$formatters.push(function(value){
				console.log(value)
				return $filter('date')(value, 'HH:mm');
			});
		}
	};
});