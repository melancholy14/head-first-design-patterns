class Stereo {
    private volume: number = 0;

    on() {
        console.log('오디오가 켜졌습니다');
    }

    off() {
        console.log('오디오가 꺼졌습니다');
    }

    setCD() {
        console.log('오디오에서 CD가 재생됩니다');
    }

    setDVD() {
        console.log('오디오에서 DVD가 재생됩니다');
    }

    setRadio() {
        console.log('오디오에서 라디오가 재생됩니다');
    }

    setVolume(volume: number) {
        this.volume = volume;

        console.log(`오디오의 볼륨이 ${this.volume}로 설정되었습니다`);
    }
}

export default Stereo;
