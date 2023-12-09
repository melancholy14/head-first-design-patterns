import NYPizzaStore from "./NYPizzaStore";

function PizzaTestDrive() {
    const nyStore = new NYPizzaStore();

    let pizza;
    pizza = nyStore.orderPizza("cheese");
    console.log(`에단이 주문한 ${pizza?.getName()}`);

    console.log('\n');
    
    pizza = nyStore.orderPizza("clam");
    console.log(`조엘이 주문한 ${pizza?.getName()}`);
}

PizzaTestDrive();