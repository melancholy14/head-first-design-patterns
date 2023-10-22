import FlyBehavior from "./FlyBehavior";
import QuackBehavior from "./QuackBehavior";

class Duck {
    flyBehavior: FlyBehavior | undefined;
    quackBehavior: QuackBehavior | undefined;

    constructor(){
        this.flyBehavior = undefined;
        this.quackBehavior = undefined;
    };

    display() {};

    performFly() {
        this.flyBehavior?.fly();
    };

    performQuack() {
        this.quackBehavior?.quack();
    };

    swim() {
        console.log('모든 오리는 물에 뜹니다. 가짜 오리도 뜨죠.');
    }

    // 동적으로 행동 지정할 수 있도록 세터 메소드 생성
    setFlyBehavior(fb: FlyBehavior) {
        this.flyBehavior = fb;
    }

    setQuackBehavior(qb: QuackBehavior) {
        this.quackBehavior = qb;
    }
}

export default Duck;
