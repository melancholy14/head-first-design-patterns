import ChicagoPizzaStore from "./ChicagoPizzaStore";
import NYPizzaStore from "./NYPizzaStore";

function PizzaTestDrive() {
    const nyStore = new NYPizzaStore();
    const chicagoStore = new ChicagoPizzaStore();

    let pizza;
    pizza = nyStore.orderPizza("cheese");
    console.log(`에단이 주문한 ${pizza?.getName()}`);

    console.log('\n');
    
    pizza = chicagoStore.orderPizza("cheese");
    console.log(`조엘이 주문한 ${pizza?.getName()}`);
}

PizzaTestDrive();