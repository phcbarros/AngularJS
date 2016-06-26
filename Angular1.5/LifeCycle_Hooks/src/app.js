import angular from 'angular';
import "babel-polyfill";
import AppComponent from './app.component';
import HelloWorldComponent from './components/hello-world';
import TabsComponent from './components/tabs';

const root = angular
    .module('app', [
        HelloWorldComponent,
        TabsComponent
    ])
    .component('appComponent', AppComponent);

export default root;