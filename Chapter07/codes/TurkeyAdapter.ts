import Duck from "./Duck";
import Turkey from "./Turkey";

class TurkeyAdapter implements Duck {
    turkey?: Turkey;

    constructor(turkey: Turkey) {
        this.turkey = turkey;
    }

    quack() {
        this.turkey?.gobble();
    }

    fly() {
        for(let i = 0; i < 5 ; i += 1) {
            this.turkey?.fly();
        }
    }
}

export default TurkeyAdapter;
