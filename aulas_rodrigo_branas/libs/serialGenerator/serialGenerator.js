angular.module('mySerialGenerator', []); //criando o módulo mySerialGenerator

//meu serviço de geração de serial
angular.module('mySerialGenerator').provider('SerialGenerator', function(){

	var _length = 25;
	
	this.getLength = function(){
		return _length;
	}
	
	this.setLength = function(length){
		_length = length;
	}
	
	this.$get =  function(){
		return {
			generate: function(){
				var serial = '';
				while(serial.length <= _length){
					serial += String.fromCharCode(Math.floor(Math.random() * 50) + 10)
				}
				return serial;
			}
		}
	}
});