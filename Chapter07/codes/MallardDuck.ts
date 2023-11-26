import Duck from "./Duck";

class MallardDuck implements Duck {
    quack() {
        console.log('꽥');
    }

    fly() {
        console.log('날고 있어요!!');
    }
}

export default MallardDuck;
