

class MoonMareState {
    #maresStates;

    constructor(){}

    initMoonMaresStates(models){
        this.#maresStates = models;
    }

    toggleAll(){
        this.#maresStates.forEach(mare => {
            mare.visible = !mare.visible;
        });
    }
}

const moonMaresStates = new MoonMareState();

export{
    moonMaresStates
}