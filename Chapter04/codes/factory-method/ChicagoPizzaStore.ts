import ChicagoStyleCheesePizza from "./ChicagoStyleCheesePizza";
import PizzaStore from "./PizzaStore";

class ChicagoPizzaStore extends PizzaStore {
    createPizza (type: string) {
        if (type === 'cheese') {
            return new ChicagoStyleCheesePizza();
        }

        return null;
    }
}

export default ChicagoPizzaStore;
