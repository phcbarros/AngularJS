import angular from 'angular';
import "babel-polyfill";
import HelloWorldComponent from './hello-world.component';

const helloWorld = angular
    .module('helloWorld', [])
    .component('helloWorld', HelloWorldComponent)
    .name;

export default helloWorld;