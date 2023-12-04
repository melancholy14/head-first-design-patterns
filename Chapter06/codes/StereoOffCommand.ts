import Command from "./Command";
import Stereo from "./Stereo";

class StereoOffCommand implements Command {
    stereo?: Stereo;

    constructor(stereo: Stereo) {
        this.stereo = stereo;
    }

    execute() {
        this.stereo?.off();
    }

    undo() {
        this.stereo?.on();   
    }
}

export default StereoOffCommand;
