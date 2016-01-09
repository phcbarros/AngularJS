angular.module("starter")
    .factory("notifyFactory", ["$rootScope", notifyFactory]);
    
function notifyFactory($rootScope){
    
    var _broadcast = function(event, data){
        $rootScope.$broadcast(event, data);
    };
    
    var _handler = function(event, cb){
        $rootScope.$on(event, cb);
    };
    
    return {
        broadcast: _broadcast,
        on: _handler,
    };
}