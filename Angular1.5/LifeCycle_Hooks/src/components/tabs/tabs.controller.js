class TabsController {
    $onInit() {
        this.tabs = [];
    }

    addTab(tab) {
        this.tabs.push(tab);
    }

    selectTab(index) {
        this.tabs.forEach((tab) => {
            tab.selected = false;
        });

        this.tabs[index].selected = true;
    }

    $postLink() {
        console.log('$postLink');
        let selected = this.selected || 0;
        this.selectTab(selected);
    }
}

export default TabsController;