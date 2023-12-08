import Coffee from "./Coffee";
import Tea from "./Tea";

function BeverageTestDrive() {
    const tea = new Tea();
    const coffee = new Coffee();

    console.log('홍차 준비 중...');
    tea.prepareRecipe();

    console.log('\n');

    console.log('커피 준비 중...');
    coffee.prepareRecipe();
}

BeverageTestDrive();