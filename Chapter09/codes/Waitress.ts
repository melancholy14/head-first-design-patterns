import DinerMenu from "./DinerMenu";
import PancakeHouseMenu from "./PancakeHouseMenu";

class Waitress {
    pancakeHouseMenu: PancakeHouseMenu | null = null;
    dinerMenu: DinerMenu | null = null;

    constructor(pancakeHouseMenu: PancakeHouseMenu, dinerMenu: DinerMenu) {
        this.pancakeHouseMenu = pancakeHouseMenu;
        this.dinerMenu = dinerMenu;
    }

    printMenu() {
        console.log('메뉴');
        console.log('-------');

        const breakfastItems = this.pancakeHouseMenu?.getMenuItems();

        if (breakfastItems) {
            console.log('아침 메뉴');

            for(let i = 0; i < breakfastItems?.length; i += 1) {
                const menuItem = breakfastItems[i];
                console.log(`${menuItem.getName()}, ${menuItem.getPrice()} -- ${menuItem.getDescription()}`);
            }
        }
        
        const lunchItems = this.dinerMenu?.getMenuItems();

        if (lunchItems) {
            for(let i = 0; i < lunchItems?.length; i += 1) {
                const menuItem = lunchItems[i];
                console.log(`${menuItem.getName()}, ${menuItem.getPrice()} -- ${menuItem.getDescription()}`);
            }
        }
    }
}

export default Waitress;
