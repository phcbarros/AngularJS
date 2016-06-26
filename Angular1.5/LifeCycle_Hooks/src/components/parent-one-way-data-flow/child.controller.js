class ChildController2 {
    $onChanges(changes) {
        if (changes.user) {
            this.user = angular.copy(this.user);
        }
    }

    saveUser() {
        this.onUpdate({
            $event: {
                user: this.user
            }
        });
    }
}

export default ChildController2;