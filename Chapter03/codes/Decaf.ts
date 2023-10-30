import Beverage from "./Beverage";

class Decaf extends Beverage {
    constructor() {
        super();

        this.description = "디카페인 커피";
    }

    cost() {
        return 1.05;
    }
}

export default Decaf;
