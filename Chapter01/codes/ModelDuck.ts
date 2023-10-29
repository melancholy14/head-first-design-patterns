import Duck from "./Duck";
import Quack from "./Quack";
import FlyNoWay from "./FlyNoWay";

class ModelDuck extends Duck {
    constructor() {
        super();

        this.flyBehavior = new FlyNoWay();
        this.quackBehavior = new Quack();
    }

    display() {
        console.log('저는 모형 오리입니다.');
    }
}

export default ModelDuck;
