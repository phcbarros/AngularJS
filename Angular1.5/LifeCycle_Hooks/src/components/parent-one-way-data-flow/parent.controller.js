class ParentController2 {
    $onInit() {
        this.user = {
            name: 'Paulo Barros',
            age: 28
        };
    }

    changeUser() {
        this.user = {
            name: 'Ian Muller',
            age: 21
        };
    }

    updateUser($event) {
        this.user = $event.user;
    }
}

export default ParentController2;