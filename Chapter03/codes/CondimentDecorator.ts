import Beverage from "./Beverage";

class CondimentDecorator extends Beverage {
    beverage: Beverage = new Beverage();
}

export default CondimentDecorator;