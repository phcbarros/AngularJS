import "babel-polyfill";
import controller from './hello-world.controller';

const HelloWorldComponent = {
    controller,
    template: `
        <div class="hello-world">
            <h1>Hello World {{$ctrl.name}}</h1>
        </div>
    `
}

export default HelloWorldComponent;