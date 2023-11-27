class StreamingPlayer {
    movie?: string;

    on() {
        console.log('스트리밍 플레이어가 켜졌습니다.');
    }

    play(movie: string) {
        this.movie = movie;

        console.log(`스트리밍 플레이어에서 "${this.movie}"를 재생합니다.`);
    }

    stop() {
        console.log(`스트리밍 플레이어에서 "${this.movie}" 재생을 종료합니다.`);
    }

    off() {
        console.log('스트리밍 플레이어가 꺼졌습니다.');
    }
}

export default StreamingPlayer;
