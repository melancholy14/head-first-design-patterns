import MallardDuck from "./MallardDuck";
import TurkeyAdapter from "./TurkeyAdapter";
import WildTurkey from "./WildTurkey";

function DuckTestDrive() {
    const duck = new MallardDuck();
    const turkey = new WildTurkey();
    const turkeyAdapter = new TurkeyAdapter(turkey);

    console.log('칠면조가 말하길');
    turkey.gobble();
    turkey.fly();

    console.log('오리가 말하길');
    duck.quack();
    duck.fly();

    console.log('칠면조 어댑터가 말하길');
    turkeyAdapter.quack();
    turkeyAdapter.fly();
}

DuckTestDrive();