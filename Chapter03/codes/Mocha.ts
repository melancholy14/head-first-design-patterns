import Beverage from "./Beverage";
import CondimentDecorator from "./CondimentDecorator";

class Mocha extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super();

        this.beverage = beverage;
    }

    getDescription() {
        return `${this.beverage.getDescription()}, 모카`;
    }

    cost() {
        return this.beverage.cost() + .20;
    }
}

export default Mocha;