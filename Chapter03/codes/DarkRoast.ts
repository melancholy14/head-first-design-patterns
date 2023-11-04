import Beverage from "./Beverage";

class DarkRoast extends Beverage {
    constructor() {
        super();

        this.description = "다크 로스트 커피";
    }

    cost() {
        return .99;
    }
}

export default DarkRoast;
