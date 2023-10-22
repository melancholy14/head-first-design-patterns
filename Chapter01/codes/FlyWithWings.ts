import FlyBehavior from "./FlyBehavior";

class FlyWithWings implements FlyBehavior {
    fly() {
        console.log('날고 있어요!!');
    }
}

export default FlyWithWings;