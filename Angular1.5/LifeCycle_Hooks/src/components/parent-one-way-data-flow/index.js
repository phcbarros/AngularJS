import angular from 'angular';
import ParentComponent2 from './parent.component';
import ChildComponent2 from './child.component';

const ParentChildComponent2 = angular
    .module('app.parentChildComponent2', [])
    .component('parentComponent2', ParentComponent2)
    .component('childComponent2', ChildComponent2)
    .name;

export default ParentChildComponent2;