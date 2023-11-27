class CeilingFan {
    HIGH = 3;
    MEDIUM = 2;
    LOW = 1;
    OFF = 0;

    private speed = this.OFF;
    
    high() {
        this.speed = this.HIGH;
        console.log('선풍기 속도가 HIGH로 설정되었습니다');
    }

    medium() {
        this.speed = this.MEDIUM;
        console.log('선풍기 속도가 MEDIUM으로 설정되었습니다');
    }

    low() {
        this.speed = this.LOW;
        console.log('선풍기 속도가 LOW로 설정되었습니다');
    }

    off() {
        this.speed = this.OFF;
        console.log('선풍기가 꺼졌습니다');
    }

    getSpeed(){
        return this.speed;
    }
}

export default CeilingFan;
