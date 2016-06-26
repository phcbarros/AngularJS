import angular from 'angular';
import TabComponent from './tab.component';
import TabsComponent from './tabs.component';

const Tabs = angular
    .module('app.tabs', [])
    .component('tabs', TabsComponent)
    .component('tab', TabComponent)
    .name;

export default Tabs;