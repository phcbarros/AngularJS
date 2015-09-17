angular.module('myApp', ['lazy-scroll'])
	.controller('testeController', function($scope){
		var start = 0,
			ending = start + 10,
			lastdata = 100,
			reachLast = false;
			
		$scope.loadmore = "Loading More Data..";
		$scope.testData = [];
		
		$scope.listData = function(){
			if(reachLast)
				return false;
			
			var list = [],
				i = start,
				l = ending;
			
			for(; l--; i++){
				list.push({id: i, nome: 'nome' + i });
			}
			
			start = i;
			ending = i + 10;
			
			$scope.testData = $scope.testData.concat(list);
			
			if(ending >= lastdata) {
				reachLast = true;
				$scope.loadmore = "Reached at bottom";
			}
			
		};
		
		$scope.listData();
		
	});