import QuackBehavior from "./QuackBehavior";

class Squeak implements QuackBehavior {
    quack() {
        console.log('삑');
    }
}

export default Squeak;
