angular.module("starter")
    .controller("MyCtrl1", ["$scope", "notifyFactory", myCtrl1])
    .controller("MyCtrl2", ["$scope", "notifyFactory", myCtrl2])
    .controller("MyCtrl3", ["$scope", "notifyFactory",  myCtrl3])
    .controller("MyCtrl4", ["$scope", "$rootScope", "notifyFactory", myCtrl4])
    .controller("MyCtrl5", ["$scope", "$rootScope", "notifyFactory", myCtrl5]);

function myCtrl1($scope, notifyFactory) {

    var onClear = function(e, data){
        delete $scope.nome;
    };
    
    notifyFactory.on("myCtrl5.clear", onClear);
    
    var onChageName = function(e, data) {
        $scope.nome = data;
        $scope.$digest(); //atualiza somente o escopo atual
    };
    
    //Listener para o evento myCtrl2.changename que é disparado pelo MyCtrl2
    notifyFactory.on("myCtrl2.changename", onChageName);
}

function myCtrl2($scope, notifyFactory) {
    $scope.nome = "Paulo";
    
    var cbSetTimeout = function setTimeoutMyCtrl2() {
        $scope.nome = "Paulo Barros";
        notifyFactory.broadcast("myCtrl2.changename", $scope.nome);
        $scope.$digest(); //atualiza somente o escopo atual
    };
    
    $scope.trocarNome = function () {
        setTimeout(cbSetTimeout, 0);
    };
    
    var onClear = function(e, data){
        $scope.nome = "Paulo";
    };
    
    notifyFactory.on("myCtrl5.clear", onClear);
}

function myCtrl3($scope, notifyFactory) {

    var onClear = function(e, data){
        delete $scope.nome;
    };
    
    notifyFactory.on("myCtrl5.clear", onClear);
    
    var onChangeName = function (e, data) {
        $scope.nome = data;
    };
    
    //Listener para o evento myCtrl4.changename que é disparado pelo MyCtrl4
    notifyFactory.on("myCtrl4.changename", onChangeName);
}

function myCtrl4($scope, $rootScope, notifyFactory) {
    $scope.nome = "Angelina";
    
    var cbSetTimeout = function() {
        $scope.nome = "Angelina Jolie";
        notifyFactory.broadcast("myCtrl4.changename", $scope.nome);
        $scope.$apply(); //atualiza todos os escopos disparando os $watchers a partir de $rootScope
    };
    
    $scope.trocarNome = function () {
        setTimeout(cbSetTimeout, 0);
    };
    
    var onClear = function(e, data){
        $scope.nome = "Angelina";
    };
    
    notifyFactory.on("myCtrl5.clear", onClear);
}

function myCtrl5($scope, $rootScope, notifyFactory) {   
     $scope.limpar = function(){
        notifyFactory.broadcast("myCtrl5.clear");
    };
}