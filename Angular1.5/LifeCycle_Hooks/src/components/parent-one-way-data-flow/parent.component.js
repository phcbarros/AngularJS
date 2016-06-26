import controller from './parent.controller';

const ParentComponent2 = {
    template: `
        <h3>Componente usando One-Way Dataflow + Events</h3>
        <div>
            <pre>Object Parent {{ $ctrl.user | json }}</pre>
        </div>
        <a href="" ng-click="$ctrl.changeUser()">
           Change user (this will call $onChanges in child)
        </a>
        <br/>
        <child-component2 user="$ctrl.user" on-update="$ctrl.updateUser($event)"></child-component2>
        <hr/>
    `,
    controller
}

export default ParentComponent2;