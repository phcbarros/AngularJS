angular.module("starter")
    .controller("MyCtrl", ["$scope", "httpService", myCtrl]);

function myCtrl($scope, httpService) {

    var sucessoListarFrutas = function (data) {
        console.log(data);
        $scope.frutas = data;
    };

    var falhaSucessoListarFrutas = function (err) {
        console.error(err);
    };

    $scope.listarFrutas = function () {
        var http = new HTTP();
        http.getJSON("frutas.json")
            .then(sucessoListarFrutas)
            .catch(falhaSucessoListarFrutas);
    };
    
    var sucessoListarFrutas2 = function (data) {
        console.log(data);
        $scope.frutas2 = data;
    };
    
    $scope.listarFrutas2 = function(){
        new HTTP().getJSON2("frutas.json")
            .then(sucessoListarFrutas2)
            .catch(falhaSucessoListarFrutas);
    };
    
    $scope.limpar = function(){
        delete $scope.frutas;  
        delete $scope.frutas2;
    };

}

var HTTP = function () {
};

HTTP.prototype.getJSON = function get(url) {
    var promise = new Promise(function promise(resolve, reject) {

        var req = new XMLHttpRequest();

        req.open("GET", url, true);

        req.onload = function onloadRequest() {
            if (req.status === 200) {
                resolve(JSON.parse(req.response));
            }
            else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function () {
            reject(Error("Error de conexão"));
        };

        req.send();
    });

    return promise;
};

HTTP.prototype.getJSON2 = function httpService(url) {
    
    var injector = angular.element(document.querySelector("body")).injector(),
        $q = injector.get("$q"),
        defer = $q.defer(),
        req = new XMLHttpRequest();

    req.open("GET", url, true);

    req.onload = function onloadRequest() {
        if (req.status === 200) {
            defer.resolve(JSON.parse(req.response));
        }
        else {
            defer.reject(Error(req.statusText));
        }
    };

    req.onerror = function () {
        defer.reject(Error("Error de conexão"));
    };

    req.send();

    return defer.promise;
}