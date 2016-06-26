import controller from './child.component';

const ChildComponent = {
    bindings: {
        user: '<'
    },
    template: `
       <input type="text" ng-model="$ctrl.user.name">
    `,
    controller
};

export default ChildComponent;