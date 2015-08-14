//configuração do SerialGenerator
angular.module('ListaTelefonica').config(function(SerialGeneratorProvider){
	SerialGeneratorProvider.setLength(10);
});