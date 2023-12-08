import CoffeeWithHook from "./CoffeeWithHook";
import TeaWithHook from "./TeaWithHook";

function BeverageTestDrive() {
    const tea = new TeaWithHook();
    const coffee = new CoffeeWithHook();

    console.log('홍차 준비 중...');
    tea.prepareRecipe();

    console.log('\n');

    console.log('커피 준비 중...');
    coffee.prepareRecipe();
}

BeverageTestDrive();