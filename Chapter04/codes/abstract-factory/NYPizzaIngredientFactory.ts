import PizzaIngredientFactory from "./PizzaIngredientFactory";
import MarinaraSauce from "./MarinaraSauce";
import ThinCrustDough from "./ThinCrustDough";
import ReggianoCheese from "./ReggianoCheese";
import Garlic from "./Garlic";
import Onion from "./Onion";
import Mushroom from "./Mushroom";
import RedPepper from "./RedPepper";
import SlicedPepperoni from "./SlicedPepperoni";
import FreshClams from "./FreshClams";

class NYPizzaIngredientFactory implements PizzaIngredientFactory {
    createDough() {
        return new ThinCrustDough();
    }

    createSauce() {
        return new MarinaraSauce();
    }

    createCheese() {
        return new ReggianoCheese();
    }

    createVeggies() {
        return [new Garlic(), new Onion(), new Mushroom(), new RedPepper()];
    }
    
    createPepperoni() {
        return new SlicedPepperoni();
    }

    createClams() {
        return new FreshClams();
    }
}

export default NYPizzaIngredientFactory;
