angular.module('myApp')
	.directive('containerEditable', [createContainerEditable])
	.directive('editableInput', [createEditableInput]);
	
function createContainerEditable(){
	return {
		restrict: 'AE',
		controller: function($scope, $element, $attrs){
			var inputs = [];
			
			this.registerInput = function(input){
				inputs.push(input);
			};
			
			this.destroyAllEditableInput = function(){
				inputs.forEach(function(input){
					delete input.editable;
				});
			};
			
			this.destroyEditableInput = function(input){
				delete input.editable;
			};
			
		}
	};
};

function createEditableInput(){
	return {
		require: '^containerEditable',
		transclude: true,
		templateUrl: 'view/ui-table-editable.html',
		scope:{
			field: '@',
			user: '=',
			action: '&',
		},
		link: function(scope, element, attrs, ctrl){
			
			ctrl.registerInput(scope);
			
			scope.show = function(){
				return scope.editable === scope.field;	
			};
			
			scope.cancel = function(e, copy, user){
				e.stopPropagation();
				ctrl.destroyEditableInput(this);					
			};
			
			scope.update = function(e, copy){
				e.stopPropagation();
				ctrl.destroyEditableInput(this);
				scope.user = copy	
				scope.action({user: scope.user});		
			};
			
			element.on('click', function(e){
				e.stopPropagation();
				ctrl.destroyAllEditableInput();
				
				scope.$apply(function(){
					scope.copy = angular.copy(scope.user);
					scope.editable = scope.field;

					var dataType = typeof scope.user[scope.field];
					scope.type = dataType === 'string' ? 'text' : dataType;
				});
				
			});
			
		}
	};
};