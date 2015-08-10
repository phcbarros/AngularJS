angular.module('ListaTelefonica').provider('SerialGenerator', function(config){
	
	var _length = 10;
	
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
				while(serial.length < _length){
					serial += String.fromCharCode(Math.floor(Math.random() * 127))
				}
				return serial;
			}
		}
	}
});