import DinerMenu from "./DinerMenu";
import PancakeHouseMenu from "./PancakeHouseMenu";
import Waitress from "./Waitress";

function MenuTestDrive() {
    const pancakeHouseMenu = new PancakeHouseMenu();
    const dinerMenu = new DinerMenu();

    const waitress = new Waitress(pancakeHouseMenu, dinerMenu);

    waitress.printMenu();
}

MenuTestDrive();