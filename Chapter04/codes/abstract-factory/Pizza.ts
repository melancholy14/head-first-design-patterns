import Cheese from "./Cheese";
import Clams from "./Clams";
import Dough from "./Dough";
import Pepperoni from "./Pepperoni";
import Sauce from "./Sauce";
import Veggies from "./Veggies";

abstract class Pizza {
    name: string = '';
    
    dough?: Dough;
    sauce?: Sauce;
    veggies?: Veggies[] = [];
    cheese?: Cheese;
    pepperoni?: Pepperoni;
    clam?: Clams;

    abstract prepare(): void;   // 구현 클래스에서 피자를 만드는 데 필요한 재료들을 가져오도록 하기 위해 추상 메소드로 선언

    bake(){
        console.log('175도에서 25분 간 굽기');
    }

    cut(){
        console.log('피자를 사선으로 자르기');
    }

    box(){
        console.log('상자에 피자 담기');
    }

    setName(name: string){
        this.name = name;
    }

    getName(){
        return this.name;
    }
}

export default Pizza;
