import angular from 'angular';
import AppComponent from './app.component';
import HelloWorldComponent from './components/hello-world';
import TabsComponent from './components/tabs';
import ParentComponent from './components/parent';
import ParentComponent2 from './components/parent-one-way-data-flow';

const root = angular
    .module('app', [
        HelloWorldComponent,
        TabsComponent,
        ParentComponent,
        ParentComponent2
    ])
    .component('appComponent', AppComponent);

export default root;