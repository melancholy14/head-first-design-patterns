import MenuItem from "./MenuItem";

class DinerMenu {
    MAX_ITEMS: number = 6;
    numberOfItems: number = 0;
    menuItems: MenuItem[] = [];

    constructor() {
        this.menuItems = [];

        this.addItem('채식주의자용 BLT', '통밀 위에 콩고기 베이컨, 상추, 토마토를 얹은 메뉴', true, 2.99);

        this.addItem('BLT', '통밀 위에 베이컨, 상추, 토마토를 얹은 메뉴', false, 2.99);

        this.addItem('오늘의 스프', '감자 샐러드를 곁들인 오늘의 스프', false, 3.29);

        this.addItem('핫도그', '사워크라우트, 갖은 양념, 양파, 치즈가 곁들여진 핫도그', false, 3.05);
    }

    addItem(name: string, description: string, vegetarian: boolean, price: number) {
        const menuItem = new MenuItem(name, description, vegetarian, price);

        if (this.numberOfItems >= this.MAX_ITEMS) {
            console.error('죄송합니다. 메뉴가 꽉 찼습니다. 더 이상 추가할 수 없습니다.');
        } else {
            this.menuItems[this.numberOfItems] = menuItem;
            this.numberOfItems += 1;
        }
    }

    getMenuItems() {
        return this.menuItems;
    }
}

export default DinerMenu;
