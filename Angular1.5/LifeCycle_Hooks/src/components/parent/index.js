import angular from 'angular';
// import ChildComponent from './child.component';
// import ParentComponent from './parent.component';

const ParentComponent = {
    template: `
        <div>
            <h1>Componente usando $onChanges</h1>
            <div>
                <pre>Parent Objetct: {{ $ctrl.user | json }}</pre>
            </div>
            <a href="" ng-click="$ctrl.changeUser()">
                Change user (this will call $onChanges in child)
            </a>
            <br/>
            <child-component user="$ctrl.user"></child-component>
        </div>
        <hr/>
    ` ,
    controller: function () {
        this.$onInit = function () {
            this.user = {
                name: 'Paulo Barros',
                age: 28
            };
        };

        this.changeUser = function () {
            this.user = {
                name: 'Ian Muller',
                age: 21
            };
        };
    }
}

const ChildComponent = {
    bindings: {
        user: '<'
    },
    template: `
       <input type="text" ng-model="$ctrl.user.name">
    `,
    controller: function () {
        this.$onChanges = function (changes) {
            if (changes.user) {
                //this.user = angular.copy(changes.user.currentValue);
                this.user = angular.copy(this.user);
            }
        }
    }
}

const ParentChildComponent = angular
    .module('app.parentChildComponent', [])
    .component('childComponent', ChildComponent)
    .component('parentComponent', ParentComponent)
    .name;

export default ParentChildComponent;