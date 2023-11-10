import Pizza from "./Pizza";

abstract class PizzaStore {
    orderPizza(type: string) {
        const pizza = this.createPizza(type);

        if (!pizza) {
            return null;
        }

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }

    protected abstract createPizza(type: string): Pizza | null;
}

export default PizzaStore;
