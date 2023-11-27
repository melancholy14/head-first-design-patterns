class Light {
    private location?: string;

    constructor(space?: string) {
        this.location = space;
    }

    on() {
        console.log(`${this.location ? `${this.location} ` : ''}조명이 켜졌습니다`);
    }

    off() {
        console.log(`${this.location ? `${this.location} ` : ''}조명이 꺼졌습니다`);
    }
}

export default Light;
