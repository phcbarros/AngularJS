/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
angular.module('ListaTelefonica').directive('uiCpf', function(){
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