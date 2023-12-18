class MenuItem {
    name: string = '';
    description: string = '';
    vegetarian: boolean = false;
    price: number = 0;

    constructor (name: string, description: string, vegetarian: boolean, price: number) {
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getPrice() {
        return this.price;
    }

    isVegetarian() {
        return this.vegetarian;
    }
}

export default MenuItem;
