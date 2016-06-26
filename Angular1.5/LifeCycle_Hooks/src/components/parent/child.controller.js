class ChildController {
    $onChanges(changes){
        if(changes.user) {
            this.user = angular.copy(changes.user.currentValue);
        }
    }
}

export default ChildController;