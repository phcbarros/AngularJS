import angular from 'angular';

const AutoFocus = ($timeout) => ({
    restrict: 'A',
    link($scope, $element, $attrs) {
        $scope.$watch($attrs.autofocus, (newValue, oldValue) => {
            if(!newValue) return;

            $timeout(() => $element[0].focus());
        });
    }
});


// class AutoFocus {
//   constructor() {
//     this.restrict = 'A';
//   }
//   link($scope, $element, $attrs) {
//     $scope.$watch($attrs.autofocus, (newValue, oldValue) => {
//       if (!newValue) {
//         return;
//       }
//       $timeout(() => $element[0].focus());
//     });
//   }
// }

AutoFocus.$inject = ['$timeout'];

export default AutoFocus;