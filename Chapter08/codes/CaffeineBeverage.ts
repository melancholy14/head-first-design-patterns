abstract class CaffeineBeverage {
    prepareRecipe() {       // Javascript에는 final 선언이 존재하지 않음.
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
    }

    boilWater() {
        console.log('물 끓이는 중');
    }

    abstract brew(): void;
    
    pourInCup() {
        console.log('컵에 따르는 중');
    }
    
    abstract addCondiments(): void;
}

export default CaffeineBeverage;
