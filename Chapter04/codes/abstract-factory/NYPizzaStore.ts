import PizzaStore from "./PizzaStore";
import NYPizzaIngredientFactory from "./NYPizzaIngredientFactory";
import CheesePizza from "./CheesePizza";
import ClamPizza from "./ClamPizza";

class NYPizzaStore extends PizzaStore {
    protected createPizza (type: string) {
        const pizzaIngredientFactory = new NYPizzaIngredientFactory();

        switch(type) {
            case 'cheese': {
                const pizza = new CheesePizza(pizzaIngredientFactory);
                pizza.setName('뉴욕 스타일 치즈 피자');
    
                return pizza;
            }
            case 'clam': {
                const pizza = new ClamPizza(pizzaIngredientFactory);
                pizza.setName('뉴욕 스타일 조개 피자');
    
                return pizza;
            }
        }

        return null;
    }
}

export default NYPizzaStore;
