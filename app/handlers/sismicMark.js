



class SismicMarkState {
    #sismicMark;
    constructor(){
    }

    initStateSismicMarks(models){
        this.#sismicMark = models; 
    }

    hiddenAll(){
        this.#sismicMark.forEach(mark => {
            mark.visible = false
        });
    }

    showSismicMark(indexSismicMark){
        this.hiddenAll();
        this.#sismicMark[indexSismicMark].visible = true;
    }

    toggleAllSismicMark(){
        this.#sismicMark.forEach(mark => {
            mark.visible = !mark.visible
        })
    }
}

const sismicMarkState = new SismicMarkState()

export {
    sismicMarkState
}