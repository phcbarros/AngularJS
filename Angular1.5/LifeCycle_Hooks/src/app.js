import angular from 'angular';
import "babel-polyfill";
import AppComponent from './app.component';
import Components from './components/hello-world';

const root = angular
    .module('app', [
        Components
    ])
    .component('appComponent', AppComponent);

export default root;