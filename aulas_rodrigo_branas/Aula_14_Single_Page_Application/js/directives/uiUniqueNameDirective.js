angular.module('ListaTelefonica').directive('uiUniqueName', function($http, config, $q){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl){
			
			ctrl.$asyncValidators.uniqueName =  function(modelValue, viewValue){
				
				var value = modelValue || viewValue;
				
				return $http.get(config.baseUrl + '/contato/' + value)
					.then(function(data){
						 return $q.reject('existe');				
					}, function(){
						return true;
					});
			}
			
		}	
	};
});