(function () {
    "use strict";

    angular.module("starter")
        .controller("ParentCtrl", ParentCtrl)
        .controller("Sibling1Ctrl", Sibling1Ctrl)
        .controller("Sibling2Ctrl", Sibling2Ctrl)
        .controller("ChildSibling2Ctrl", ChildSibling2Ctrl);

    ParentCtrl.$inject = ["$scope", "$rootScope"];
    Sibling1Ctrl.$inject = ["$scope", "$rootScope"];
    Sibling2Ctrl.$inject = ["$scope", "$rootScope"];
    ChildSibling2Ctrl.$inject = ["$scope", "$rootScope"];


    function ParentCtrl($scope, $rootScope) {

        //É notificado do evento do Sibling2Ctrl.$scope.$emit
        $scope.$on("Sibling2Ctrl.$scope.$emit", onSibling2Ctrl$emit);
        //É notificado do evento do ChildSibling2Ctrl.$scope.$emit
        $scope.$on("ChildSibling2Ctrl.$scope.$emit", onChildSibling2Ctrl$emit);
        //Não consegue ser notificado do evento Sibling2Ctrl.$scope.$broadcast
        $scope.$on("Sibling2Ctrl.$scope.$broadcast", onSibling2Ctrl$broacast);
        //dispara o evento com $scope.$broadcast, todos os filhos serão notificados
        $scope.scopeBroadcast = scopeBroadcast;
        //É notificado do evento do Sibling1Ctrl.$rootScope.$broadcast
        $rootScope.$on("Sibling1Ctrl.$rootScope.$broadcast", onSibling1CtrlRootScopeBroadcast);


        function onSibling2Ctrl$emit(e, data) {
            console.log("ParentCtrl:", data);
        }

        function onChildSibling2Ctrl$emit(e, data) {
            console.log("ParentCtrl:", data);
        }

        function onSibling2Ctrl$broacast(e, data) {
            console.log("ParentCtrl", data);
        }

        function scopeBroadcast() {
            $scope.$broadcast("ParenctCtrl.$scope.$broadcast", "Evento usando $scope.$broadcast do ParenctCtrl");
        }

        function onSibling1CtrlRootScopeBroadcast(e, data) {
            console.log("ParentCtrl", data);
        }
    }

    function Sibling1Ctrl($scope, $rootScope) {

        //Não consegue ser notificado do evento do Sibling2Ctrl.$scope.$emit
        $scope.$on("Sibling2Ctrl.$scope.$emit", onSibling2Ctrl$emit);
        //Não consegue ser notificado do evento do ChildSibling2Ctrl.$scope.$emit
        $scope.$on("ChildSibling2Ctrl.$scope.$emit", onChildSibling2Ctrl$emit);
        //É notificado do evento do ParenctCtrl.$scope.$broadcast
        $scope.$on("ParenctCtrl.$scope.$broadcast", onParenctCtrl$broadcast);
        //É notificado do evento do ChildSibling2Ctrl.$rootScope.$emit
        $rootScope.$on("ChildSibling2Ctrl.$rootScope.$emit", onChildSibling2CtrlRootScopeEmit);
        //dispara evento com Sibling1Ctrl.$rootScope.$broadcast, todos que se registraram com $scope.$on ou $rootScope.$on serão notificados
        $scope.rootScopeBroadcast = rootScopeBroadcast;


        function onSibling2Ctrl$emit(e, data) {
            console.log("Sibling1Ctrl:", data);
        }

        function onChildSibling2Ctrl$emit(e, data) {
            console.log("Sibling1Ctrl:", data);
        }

        function onParenctCtrl$broadcast(e, data) {
            console.log("Sibling1Ctrl:", data);
        }

        function onChildSibling2CtrlRootScopeEmit(e, data) {
            console.log("Sibling1Ctrl:", data);
        }

        function rootScopeBroadcast() {
            $rootScope.$broadcast("Sibling1Ctrl.$rootScope.$broadcast", "Evento usando $rootScope.$broadcast do Sibling1Ctrl")
        }

    }

    function Sibling2Ctrl($scope, $rootScope) {

        //dispara o evento com $scope.$emit, todos os antecessores serão notificados
        $scope.scopeEmit = scopeEmit;
        //É notificado do evento do ChildSibling2Ctrl.$scope.$emit
        $scope.$on("ChildSibling2Ctrl.$scope.$emit", onChildSibling2Ctrl$emit);
        //dispara evento com Sibling2Ctrl.$scope.$broadcast, todos filhos serão notificados
        $scope.scopeBroadcast = scopeBroadcast;
        //É notificado do evento do ParenctCtrl.$scope.$broadcast
        $scope.$on("ParenctCtrl.$scope.$broadcast", onParenctCtrl$broadcast);
        //É notificado do evento do Sibling1Ctrl.$rootScope.$broadcast
        $scope.$on("Sibling1Ctrl.$rootScope.$broadcast", onSibling1CtrlRootScopeBroadcast);


        function scopeEmit() {
            $scope.$emit("Sibling2Ctrl.$scope.$emit", "Evento usando $scope.$emit do Sibling2Ctrl");
        }

        function onChildSibling2Ctrl$emit(e, data) {
            console.log("Sibling2Ctrl:", data);
        }

        function scopeBroadcast() {
            $scope.$broadcast("Sibling2Ctrl.$scope.$broadcast", "Evento usando $scope.$broadcast do Sibling2Ctrl");
        }

        function onParenctCtrl$broadcast(e, data) {
            console.log("Sibling2Ctrl:", data);
        }

        function onSibling1CtrlRootScopeBroadcast(e, data) {
            console.log("Sibling2Ctrl:", data);
        }
    }

    function ChildSibling2Ctrl($scope, $rootScope) {

        //disparando evento com $scope.$emit, todos os antecessores serão notificados
        $scope.scopeEmit = scopeEmit;
        //Não consegue ser notificado do evento do Sibling2Ctrl.$scope.$emit
        $scope.$on("Sibling2Ctrl.$scope.$emit", onSibling2CtrlScopeEmit);
        //É notificado do evento Sibling2Ctrl
        $scope.$on("Sibling2Ctrl.$scope.$broadcast", onSibling2CtrlScopeBroacast);
        //É notificado do evento do ParenctCtrl.$broadcast
        $scope.$on("ParenctCtrl.$scope.$broadcast", onParenctCtrlScopeBroadcast);
        //Dispara o evento $rootScope.$emit, todos que estão registrados serão notificados
        $scope.rootScopeEmit = rootScopeEmit;
        //É notificado do evento ChildSibling2Ctrl.$rootScopeEmit, ou seja, é notificado do proprio evento disparado
        $rootScope.$on("ChildSibling2Ctrl.$rootScope.$emit", onChildSibling2CtrlRootScopeEmit);


        function scopeEmit() {
            $scope.$emit("ChildSibling2Ctrl.$scope.$emit", "Evento usando $scope.$emit do ChildSibling2Ctrl");
        }

        function onSibling2CtrlScopeEmit(e, data) {
            console.log("ChildSibling2Ctrl", data);
        }

        function onSibling2CtrlScopeBroacast(e, data) {
            console.log("ChildSibling2Ctrl", data);
        }

        function onParenctCtrlScopeBroadcast(e, data) {
            console.log("ChildSibling2Ctrl:", data);
        }

        function rootScopeEmit() {
            $rootScope.$emit("ChildSibling2Ctrl.$rootScope.$emit", "Evento usando $rootScope.$emit do ChildSibling2Ctrl");
        }

        function onChildSibling2CtrlRootScopeEmit(e, data) {
            console.log("ChildSibling2Ctrl:", data);
        }
    }

})();