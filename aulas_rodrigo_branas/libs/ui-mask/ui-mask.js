angular.module('uiMask',[]);

//Hour 00:00
angular.module('uiMask').directive('uiMaskHour', function(config, $filter){
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
				return $filter('date')(value, 'HH:mm');
			});
		}
	};
});

//CEP 00000-000
angular.module('uiMask').directive('uiMaskCep', function(config){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			element.bind('keyup', function(){
				ctrl.$setViewValue(_formatCep(ctrl.$viewValue));
				ctrl.$render();
			});
			
			//99999-999
			var _formatCep = function(cep){
				
				if(!cep) return cep;
				cep = cep.replace(config.regexOnlyNumber,'');
				
				if (cep.length > 5)
					cep = cep.substring(0,5) + '-' + cep.substring(5,8);
								
				return cep;
			};
		}
	};
});

//CNPJ 00.000.000/0000-00
angular.module('uiMask').directive('uiMaskCnpj', function(config){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			element.bind('keyup', function(){
				ctrl.$setViewValue(_formatCnpj(ctrl.$viewValue));
				ctrl.$render();
			});
			
			//XX.XXX.XXX/XXXX-XX
			var _formatCnpj = function(cnpj){
				
				if(!cnpj) return cnpj;
				cnpj = cnpj.replace(config.regexOnlyNumber,'');
				
				if(cnpj.length > 2)
					cnpj = cnpj.substring(0,2) + '.' + cnpj.substring(2)
				
				if(cnpj.length > 6)
					cnpj = cnpj.substring(0,6) + '.' + cnpj.substring(6)
					
				if(cnpj.length > 10)
					cnpj = cnpj.substring(0,10) + '/' + cnpj.substring(10)
					
				if(cnpj.length > 15)
					cnpj = cnpj.substring(0,15) + '-' + cnpj.substring(15,17)

				return cnpj;
			};
		}
	}
});

//CPF 000.000.000-00
angular.module('uiMask').directive('uiMaskCpf', function(){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			
			//XXX.XXXX.XXX-XX
			var _formatCpf = function(cpf){
			
				if(!cpf) return cpf;
				cpf = cpf.replace(/[^0-9]+/g,'');

				if(cpf.length > 3)
					cpf = cpf.substring(0,3) + '.' + cpf.substring(3);
				
				if(cpf.length > 7)
					cpf = cpf.substring(0,7) + '.' + cpf.substring(7);;
				 
				if(cpf.length > 11)
					cpf = cpf.substring(0,11) + '-' + cpf.substring(11,13);

				return cpf;
			};
			
			element.bind('keyup', function(){
				ctrl.$setViewValue(_formatCpf(ctrl.$viewValue));
				ctrl.$render();
			});
		}
	}
});

//Phone (00)(0)0000-0000
angular.module('uiMask').directive('uiMaskPhone', function(){
	return{
		require: 'ngModel', //cria um vínculo com outra diretiva recebendo o seu controller como parâmetro na função link
		link: function(scope, element, attrs, ctrl){
			//(xx)xxxxx-xxxx
			var _formatPhone = function(phone){
				
				if(!phone) return phone;
				phone = phone.replace(/[^0-9]+/g, ''); //retira o que não for número
				
				if(phone.length > 2)
					phone = "(" + phone.substring(0,2) +")" + phone.substring(2);
							
				if(phone.length > 8)
					phone = phone.substring(0,8) + "-" + phone.substring(8,13)
					
				if(phone.length === 14){
					phone = phone.replace('-','');
					console.log(phone, phone.length)
					phone = phone.substring(0,9) + "-" + phone.substring(9,13)
				}
				return phone;
			};
			
			element.bind('keyup', function(){
				ctrl.$setViewValue(_formatPhone(ctrl.$viewValue)); //atualiza o valor da string na view
				ctrl.$render(); //renderiza na tela
			});
		}	
	};
});

//R$ 0,00
angular.module('uiMask').directive('uiMaskCurrency', function($filter){
	return {
		require: 'ngModel',
		scope:{
			evento: '@'	
		},
		link: function(scope, element, attrs, ctrl){
			
			//usado no evento blur
			var _formatBlur = function(value){
				if(!value) return value;
				
				value = value.replace(/[^0-9\.,]+/g, ''); //limpa o campo antes de formatar
				value = value.replace(/,/g,'.'); //troca vírgula por ponto						
				
				return $filter('currency')(value);	
			};
			
			//usado no evento keyup
			var _formatKeyup = function(value){
				
				if(!value) return value;
				value = value.replace(/[^0-9\.,]+/g, ''); //limpa o campo antes de formatar
				value = value.replace(/,/g,'.'); //troca vírgula por ponto
				
				var numeroDecimal = value.match(/\./g);
				
				if(numeroDecimal && numeroDecimal.length > 1)
					value =  value.replace('.',''); //retira o primeiro ponto
									
				if(/^\d{1,}\.\d{3,}$/.test(value)){
					var arr = value.split('.')
					value = arr[0] + arr[1].substring(0,1) + ',' + arr[1].substring(1);
				}
					
				value = value.replace(/\./g,','); //troca ponto por vírgula						
								
				return "R$" + value;	
			};
			
			//faz a chamada de acordo com o evento
			var fn = function(event, funcFormat){
				element.bind(event, function(){
					ctrl.$setViewValue(funcFormat(ctrl.$viewValue));
					ctrl.$render();
				});
			};
			
			switch (scope.evento.toLowerCase()) {
				case 'blur':
					fn('blur', _formatBlur);
					break;
				case 'keyup':
					fn('keyup', _formatKeyup);
					break;
				default:
					fn('keyup', _formatKeyup);
					break;
			}
						
			ctrl.$parsers.push(function(value){
						
				if(value.match(/,/g))
					value = value.replace(/,/g,'.'); //troca vírgula por ponto	
							
				return value.replace(/[R$]/g,'') || 0; 
			});
			
			ctrl.$formatters.push(function(value){
				return $filter('currency')(value);
			});
			
		}
	};
});