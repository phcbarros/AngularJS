/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
angular.module('ListaTelefonica').directive('uiPhone', function(){
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