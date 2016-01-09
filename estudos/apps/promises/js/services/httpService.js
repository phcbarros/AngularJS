angular.module("starter")
    .service("httpService", ["$q", httpService]);
    
 function httpService($q){
     this.get = function(url){
        var defer = $q.defer();
        var req = new XMLHttpRequest();
        
        req.open("GET", url, true);
        
        req.onload = function onloadRequest(){
            if(req.status === 200){
                defer.resolve(req.response);   
            }
            else{
                defer.reject(Error(req.statusText));
            }
        };
        
        req.onerror = function(){
            defer.reject(Error("Error de conexão"));
        };
        
        req.send();
        
        return defer.promise;
     };
 }