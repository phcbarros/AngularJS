#$scope

$scope.$emit dispara eventos para os seus ancestrais;

$scope.$broadcast dispara eventos para os seus filhos;

#$rootScope
$rootScope.$emit dispara o evento e todos que se increveram com $roootScope.$on são notificados;

$rootScope.$broadcast dipara o evento e todos que se inscreveram com $rootScope.$on e $scope.$on são notificados;
