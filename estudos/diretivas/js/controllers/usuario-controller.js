'use strict';
angular.module('myApp')
	.controller('UsuarioController', ['$scope', usuarioController]);

function usuarioController($scope){
	
	var init = function(){
		$scope.usuarios = [
			{id: 1, nome: 'Maria da Silva', idade: 27, email:'mariasilva@contato.com.br', dataNascimento: '12/01/1987'},
			{id: 2, nome: 'João de Marco', idade: 35, email:'jdemarco@contato.com.br', dataNascimento: '27/02/1980'},
			{id: 3, nome: 'Evelin Mello', idade: 18, email:'evellin@contato.com.br', dataNascimento: '30/08/1997'},
			{id: 4, nome: 'Thor de Asgard', idade: 30, email:'thor@contato.com.br', dataNascimento: '10/05/1985'},
			{id: 5, nome: 'Tony S. Tark', idade: 27, email:'tonystark@contato.com.br', dataNascimento: '01/07/1987'},
		];	
	};
	
	$scope.update = function(user){
		var index =  $scope.usuarios.indexOfById(user.id);
		$scope.usuarios.splice(index,1,user); //substituindo o elemento no array
		console.log('atualizou', $scope.usuarios[index]);
	};
	
	init();
};

Array.prototype.indexOfById = function(id){
	var index = -1,
        i = 0,
        l = this.length;
		
    for (; l--; i++) {
        var item = this[i];
        if (item.id === parseInt(id)) {
            return index = i;
        }
    }
    return index;
};