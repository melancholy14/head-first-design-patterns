import StreamingPlayer from "./StreamingPlayer";

class Amplifier {
    player?: StreamingPlayer;
    volume?: number;

    on() {
        console.log('앰프가 켜졌습니다.');
    }

    setStreamingPlayer(player: StreamingPlayer) {
        this.player = player;

        console.log('앰프를 스트리밍 플레이어와 연결합니다.');
    }

    setSurroundSound() {
        console.log('앰프를 서라운드 모드로 설정합니다. (5.1채널)');
    }

    setVolume(volume: number) {
        this.volume = volume;

        console.log(`앰프 볼륨을 ${this.volume}(으)로 설정합니다.`);
    }

    off() {
        console.log('앰프가 꺼졌습니다.');
    }
}

export default Amplifier;
