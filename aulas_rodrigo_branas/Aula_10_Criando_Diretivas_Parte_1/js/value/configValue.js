//usando o value para criar objeto de configuração
//a diferença entre o value e constant é que constant pode ser usado em provider devido ao seu ciclo de vida
angular.module('ListaTelefonica').constant('config', {
	baseUrl: "http://localhost:3000"
});