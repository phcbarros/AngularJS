class ParentController {
    $onInit() {
        this.user = {
            name: 'Paulo Barros',
            age: 28
        };
    }

    changeUser() {
        this.user = {
            name:'Ian Muller',
            age: 21
        } 
    }
}

export default ParentController;