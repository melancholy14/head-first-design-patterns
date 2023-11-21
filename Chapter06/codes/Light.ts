class Light {
    private space?: string;

    constructor(space?: string) {
        this.space = space;
    }

    on() {
        console.log(`${this.space ? `${this.space} ` : ''}조명이 켜졌습니다`);
    }

    off() {
        console.log(`${this.space ? `${this.space} ` : ''}조명이 꺼졌습니다`);
    }
}

export default Light;
