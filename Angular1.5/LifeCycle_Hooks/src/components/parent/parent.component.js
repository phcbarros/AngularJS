import controller from './parent.controller';

const ParentComponent = {
    template: `
        <h3>Componente usando $onChanges</h3>
        <div>
            <pre>Parent Objetct: {{ $ctrl.user | json }}</pre>
            <a href="" ng-click="$ctrl.changeUser()">
                Change user (this will call $onChanges in child)
            </a>
            <child-component user="$ctrl.user"></child-component>
        </div>
    ` ,
    controller
}

export default ParentComponent;