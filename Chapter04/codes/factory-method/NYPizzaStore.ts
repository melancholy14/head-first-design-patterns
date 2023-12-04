import NYStyleCheesePizza from "./NYStyleCheesePizza";
import PizzaStore from "./PizzaStore";

class NYPizzaStore extends PizzaStore {
    createPizza (type: string) {
        if (type === 'cheese') {
            return new NYStyleCheesePizza();
        }

        return null;
    }
}

export default NYPizzaStore;
