abstract class CaffeineBeverageWithHook {
    prepareRecipe() {       // Javascript에는 final 선언이 존재하지 않음.
        this.boilWater();
        this.brew();
        this.pourInCup();
        
        if(this.customerWantsCondiments()) {
            this.addCondiments();
        }
    }

    boilWater() {
        console.log('물 끓이는 중');
    }

    abstract brew(): void;
    
    pourInCup() {
        console.log('컵에 따르는 중');
    }
    
    abstract addCondiments(): void;

    customerWantsCondiments() { // 별 내용 없는 기본 메소드. 서브클래스에서 필요할 때 오버라이드하여 특정 로직을 구현할 수 있습니다.
        return true;
    }
}

export default CaffeineBeverageWithHook;
