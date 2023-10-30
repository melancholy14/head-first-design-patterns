import Beverage from "./Beverage";
import CondimentDecorator from "./CondimentDecorator";

class Soy extends CondimentDecorator {
    constructor(beverage: Beverage) {
        super();

        this.beverage = beverage;
    }

    getDescription() {
        return `${this.beverage.getDescription()}, 두유`;
    }

    cost() {
        return this.beverage.cost() + .15;
    }
}

export default Soy;