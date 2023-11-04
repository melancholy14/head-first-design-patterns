import Beverage from "./Beverage";
import CondimentDecorator from "./CondimentDecorator";

class Whip extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super();

        this.beverage = beverage;
    }

    getDescription() {
        return `${this.beverage.getDescription()}, 휘핑크림`;
    }

    cost() {
        return this.beverage.cost() + .10;
    }
}

export default Whip;