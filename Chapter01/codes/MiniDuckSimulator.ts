import MallardDuck from "./MallardDuck";

function MiniDuckSimulator() {
    const mallard = new MallardDuck();

    mallard.performQuack();
    mallard.performFly();
}

MiniDuckSimulator();