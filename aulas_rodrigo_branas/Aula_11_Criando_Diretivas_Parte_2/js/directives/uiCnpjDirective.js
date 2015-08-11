/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
angular.module('ListaTelefonica').directive('uiCnpj', function(config){
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