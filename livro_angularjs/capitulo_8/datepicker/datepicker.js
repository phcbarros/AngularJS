angular.module('myApp.directives', []);
angular.module('myApp.directives').directive('datepicker', function(){
	return{
		restrict: 'A', //tipo da diretiva é um atributo
		require: '?ngModel', //o elemento precisa ter a diretiva ngModel
		scope: { //isola o scope
			select: "&" //usado para acessar uma função do controller
		},
		link: function(scope, element, attrs, ngModel){
			
			if(!ngModel) return;
			
			var optionsObj = {};
			optionsObj.dateFormat = 'dd/mm/yy';
			
			var updateModel = function(dateTxt){
				scope.$apply(function(){
					//avisa o angular js para atualizar o modelo (two-way binding)
					ngModel.$setViewValue(dateTxt); //$setViewValue = atualiza a view
				});
			}
			
			optionsObj.onSelect = function(dateTxt, picker){
				updateModel(dateTxt);
				
				if(scope.select){
					scope.$apply(function(){
						scope.select({date: dateTxt});
					});
				}
			}
			
			//$render = chamado para renderizar a view
			ngModel.$render = function(){
				//$viewValue = atual string na view
				element.datepicker('setDate', ngModel.$viewValue || '');
			}
			
			//aplica o datepicker no elemento
			element.datepicker(optionsObj);
		}	
	};
});