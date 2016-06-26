class TabController {
    $onInit() {
        this.tab = {
            label: this.label,
            selected: false
        };
    
        this.tabs.addTab(this.tab);
    }
        
}

export default TabController;