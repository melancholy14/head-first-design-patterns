import Command from "./Command";
import GarageDoor from "./GarageDoor";

class GarageDoorOpenCommand implements Command {
    garageDoor?: GarageDoor;

    constructor(garageDoor: GarageDoor){
        this.garageDoor = garageDoor;
    }

    execute() {
        this.garageDoor?.up();
    }

    undo() {
        this.garageDoor?.down();   
    }
}

export default GarageDoorOpenCommand;
