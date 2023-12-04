import Amplifier from "./Amplifier";
import PopcornPopper from "./PopcornPopper";
import Projector from "./Projector";
import StreamingPlayer from "./StreamingPlayer";
import TheaterLights from "./TheaterLights";
import Screen from "./Screen";

class HomeTheaterFacade {
    amp?: Amplifier;
    player?: StreamingPlayer;
    projector?: Projector;
    lights?: TheaterLights;
    screen?: Screen;
    popper?: PopcornPopper;

    constructor(amp: Amplifier, player: StreamingPlayer, projector: Projector, screen: Screen, lights: TheaterLights, popper: PopcornPopper) {
        this.amp = amp;
        this.player = player;
        this.projector = projector;
        this.screen = screen;
        this.lights = lights;
        this.popper = popper;
    }

    watchMovie(movie: string) {
        console.log('영화 볼 준비 중...');

        this.popper?.on();
        this.popper?.pop();

        this.lights?.dim(10);

        this.screen?.down();

        this.projector?.on();
        this.projector?.wideScreenMode();

        this.amp?.on();
        this.amp?.setStreamingPlayer(this.player || new StreamingPlayer());
        this.amp?.setSurroundSound();
        this.amp?.setVolume(5);

        this.player?.on();
        this.player?.play(movie);
    }

    endMovie() {
        console.log('홈시어터를 끄는 중...');

        this.popper?.off();

        this.lights?.on();

        this.screen?.up();

        this.projector?.off();

        this.amp?.off();

        this.player?.stop();
        this.player?.off();
    }
}

export default HomeTheaterFacade;
