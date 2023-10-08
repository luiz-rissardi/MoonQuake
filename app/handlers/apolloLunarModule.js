

class ApolloLunarModuleState{

    #apollosLunarModules;
    #apolloLabels;
    constructor(){
    }

    initStateApolloLunarModule(models){
        this.#apollosLunarModules = models;
    }

    initLabelsApolloModules(models){
        this.#apolloLabels = models
    }

    toggleAll(){
        [...this.#apolloLabels, ...this.#apollosLunarModules].forEach(el =>[
            el.visible = !el.visible
        ])
    }
}

const apolloLunarModuleState = new ApolloLunarModuleState();

export{
    apolloLunarModuleState
}