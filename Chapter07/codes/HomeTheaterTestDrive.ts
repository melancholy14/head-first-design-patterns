import Amplifier from "./Amplifier";
import PopcornPopper from "./PopcornPopper";
import Projector from "./Projector";
import StreamingPlayer from "./StreamingPlayer";
import TheaterLights from "./TheaterLights";
import Screen from "./Screen";
import HomeTheaterFacade from "./HomeTheaterFacade";

function HomeTheaterTestDrive() {
    const amp = new Amplifier();
    const player = new StreamingPlayer();
    const projector = new Projector();
    const screen = new Screen();
    const lights = new TheaterLights();
    const popper = new PopcornPopper();

    const homeTheater = new HomeTheaterFacade(amp, player, projector, screen, lights, popper);

    homeTheater.watchMovie('인디아나 존스: 레이더스');
    homeTheater.endMovie();
}

HomeTheaterTestDrive();