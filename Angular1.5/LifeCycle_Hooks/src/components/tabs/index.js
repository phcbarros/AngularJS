import angular from 'angular';
import TabComponent from './tab.component';
import TabsComponent from './tabs.component';

const Tabs = angular
    .module('app.tabs', [])
    .component('tab', TabComponent)
    .component('tabs', TabsComponent)
    .name;

export default Tabs;