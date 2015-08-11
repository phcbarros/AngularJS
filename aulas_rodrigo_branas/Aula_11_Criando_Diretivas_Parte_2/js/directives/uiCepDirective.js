angular.module('ListaTelefonica').directive('uiCep', function(config){
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