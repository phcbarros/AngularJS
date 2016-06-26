import controller from './tab.controller';

const TabComponent = {
    bindings: {
        label: '@'
    },
    transclude: true,
    require: {
        tabs: '^^tabs'
    },
    template: `
        <div class="tabs__content" ng-if="$ctrl.tab.selected">
            <div ng-transclude></div>
        </div>
    `,
    controller
};

export default TabComponent;