import angular from 'angular';
import HelloWorldComponent from './hello-world.component';

const helloWorld = angular
    .module('app.helloWorld', [])
    .component('helloWorld', HelloWorldComponent)
    .name;

export default helloWorld;