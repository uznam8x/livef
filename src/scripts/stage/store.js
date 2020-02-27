import Liner from "./components/liner";
let instance;
class Store {
    
    constructor(stage) {
        if (instance) return instance;
        this.stage = stage;
        this.liner = new Liner(stage);
        instance = this;
    }
}

export default Store;