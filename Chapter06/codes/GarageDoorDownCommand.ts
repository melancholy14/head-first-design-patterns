import Command from "./Command";
import GarageDoor from "./GarageDoor";

class GarageDoorDownCommand implements Command {
    garageDoor?: GarageDoor;

    constructor(garageDoor: GarageDoor){
        this.garageDoor = garageDoor;
    }

    execute() {
        this.garageDoor?.down();
    }
}

export default GarageDoorDownCommand;
