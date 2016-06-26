const AppComponent = {
    template: `
        <hello-world></hello-world>
        <tabs selected='1'>
            <tab label='Tab 1'>
                <p>Conteúdo da Aba 1</p>
                <parent-component></parent-component>
            </tab>
            <tab label='Tab 2'>
                <p>Conteúdo da Aba 2</p>
                <parent-component2></parent-component2>
            </tab>
            <tab label='Tab 3'>Conteúdo da Aba 3</tab>
        <tabs>
    `
}

export default AppComponent;