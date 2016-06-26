import angular from 'angular';
import AppComponent from './app.component';
import HelloWorldComponent from './components/hello-world';
import TabsComponent from './components/tabs';
import ParentComponent from './components/parent';
import ParentComponent2 from './components/parent-one-way-data-flow';
import Directives from './components/autofocus';

const root = angular
    .module('app', [
        HelloWorldComponent,
        TabsComponent,
        ParentComponent,
        ParentComponent2,
        Directives
    ])
    .component('appComponent', AppComponent);

export default root;