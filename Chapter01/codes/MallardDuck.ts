import Duck from "./Duck";
import FlyWithWings from "./FlyWithWings";
import Quack from "./Quack";

class MallardDuck extends Duck {
    constructor() {
        super();

        this.quackBehavior = new Quack();
        this.flyBehavior = new FlyWithWings();
    }

    display() {
        console.log('저는 물오리입니다.');
    }
}

export default MallardDuck;
