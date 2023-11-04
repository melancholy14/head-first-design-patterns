import Beverage from "./Beverage";

class HouseBlend extends Beverage {
    constructor() {
        super();

        this.description = "하우스 블렌드 커피";
    }

    cost() {
        return .89;
    }
}

export default HouseBlend;
