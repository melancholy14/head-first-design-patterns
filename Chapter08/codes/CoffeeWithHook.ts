import CaffeineBeverageWithHook from "./CaffeineBeverageWithHook";

class CoffeeWithHook extends CaffeineBeverageWithHook {
    brew() {
        console.log('필터로 커피를 우려내는 중');
    }

    addCondiments() {
        console.log('설탕과 우유를 추가하는 중');
    }

    customerWantsCondiments() {
        console.log('커피에 우유와 설탕을 넣을까요? (y/n)');

        const answer = this.getUserInput();

        return answer.toLowerCase().startsWith('y');
    }

    getUserInput() {
        // TODO 샌드박스에서 구현할 때는 유저 인풋 받도록 수정 필요
        return 'y';
    }
}

export default CoffeeWithHook;
