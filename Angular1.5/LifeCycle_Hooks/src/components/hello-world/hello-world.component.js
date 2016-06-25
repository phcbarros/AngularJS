import "babel-polyfill";
import controller from './hello-world.controller';

const HelloWorldComponent = {
    controller,
    template: `
        Hello World {{$ctrl.name}}
    `
}

export default HelloWorldComponent;