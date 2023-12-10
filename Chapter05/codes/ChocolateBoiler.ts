class ChocolateBoiler {
    private empty: boolean;
    private boiled: boolean;

    private static uniqueInstance: ChocolateBoiler;

    private constructor() {
        this.empty = true;
        this.boiled = false;
    }

    static getInstance() {
        if (!this.uniqueInstance) {
            this.uniqueInstance = new ChocolateBoiler();
        }

        return this.uniqueInstance;
    }

    isEmpty() {
        return this.empty;
    }

    isBoiled() {
        return this.boiled;
    }

    fill() {
        if (this.isEmpty()) {
            this.empty = false;
            this.boiled = false;

            console.log('보일러에 우유와 초콜릿을 혼합한 재료를 넣음');
        }
    }

    drain() {
        if(!this.isEmpty() && this.isBoiled()) {
            console.log('끓인 재료를 다음 단계로 넘김');

            this.empty = true;
        }
    }

    boil() {
        if(!this.isEmpty() && !this.isBoiled()) {
            console.log('재료를 끓임');

            this.boiled = true;
        }
    }
}