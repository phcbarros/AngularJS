import controller from './child.controller';

const ChildComponent2 = {
    bindings: {
        user: '<',
        onUpdate: '&'
    },
    template: `
        <input type="text" ng-model="$ctrl.user.name"/>
        <button type="button" ng-click="$ctrl.saveUser()">Update</button>
    `,
    controller
}

export default ChildComponent2;