import Pizza from "./Pizza";
import PizzaIngredientFactory from "./PizzaIngredientFactory";

class CheesePizza extends Pizza {
    ingredientFactory: PizzaIngredientFactory;

    constructor(ingredientFactory: PizzaIngredientFactory) {
        super();

        this.ingredientFactory = ingredientFactory;
    }

    prepare() {
        console.log(`준비 중: ${this.name}`);

        console.log('도우를 돌리는 중...');
        this.dough = this.ingredientFactory.createDough();

        console.log('소스를 뿌리는 중...');
        this.sauce = this.ingredientFactory.createSauce();
        
        console.log('치즈를 올리는 중...');
        this.cheese = this.ingredientFactory.createCheese();
    }
}

export default CheesePizza;
