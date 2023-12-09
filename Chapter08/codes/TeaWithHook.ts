import CaffeineBeverageWithHook from "./CaffeineBeverageWithHook";

class TeaWithHook extends CaffeineBeverageWithHook {
    brew() {
        console.log('찻잎을 우려내는 중');
    }

    addCondiments() {
        console.log('레몬을 추가하는 중');
    }

    customerWantsCondiments() {
        console.log('차에 레몬을 넣을까요? (y/n)');

        const answer = this.getUserInput();

        return answer.toLowerCase().startsWith('y');
    }

    getUserInput() {
        // TODO 샌드박스에서 구현할 때는 유저 인풋 받도록 수정 필요
        return 'y';
    }
}

export default TeaWithHook;
