import FlyRocketPowered from "./FlyRocketPowered";
import MallardDuck from "./MallardDuck";
import ModelDuck from "./ModelDuck";

function MiniDuckSimulator() {
    const mallard = new MallardDuck();

    // mallard.display();
    mallard.performQuack();
    mallard.performFly();

    const model = new ModelDuck();
    
    // model.display();
    model.performFly();
    // 동적으로 로켓 추진 기능을 부여
    model.setFlyBehavior(new FlyRocketPowered());
    model.performFly();
}

MiniDuckSimulator();