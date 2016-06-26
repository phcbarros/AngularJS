import controller from './tabs.controller';

const TabsComponent = {
    bindings: {
        selected: '@'
    },
    transclude: true,
    template: `
        <div class="tabs">
            <ul class="tabs__list">
                <li ng-repeat="tab in $ctrl.tabs track by $index">
                    <a href="" 
                        ng-bind="tab.label"
                        ng-click="$ctrl.selectTab($index)"></a>
                </li>
            </ul>
            <div class="tabs__content" ng-transclude></div>
        </div>
    `,
    controller
};

export default TabsComponent;