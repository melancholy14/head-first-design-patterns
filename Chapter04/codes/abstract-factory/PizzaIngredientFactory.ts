import Cheese from "./Cheese";
import Clams from "./Clams";
import Dough from "./Dough";
import Pepperoni from "./Pepperoni";
import Sauce from "./Sauce";
import Veggies from "./Veggies";

interface PizzaIngredientFactory {
    createDough(): Dough;
    createSauce(): Sauce;
    createCheese(): Cheese;
    createVeggies(): Veggies[];
    createPepperoni(): Pepperoni;
    createClams(): Clams;
}

export default PizzaIngredientFactory;
