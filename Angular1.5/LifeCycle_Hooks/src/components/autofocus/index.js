import angular from 'angular';
import Autofocus from './autofocus.directive';

const AutoFocusDirective = angular
  .module('app.directives', [])
  .directive('autofocus', Autofocus)
  .name;

  export default AutoFocusDirective;