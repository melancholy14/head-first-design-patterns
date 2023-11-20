import Command from "./Command";
import GarageDoor from "./GarageDoor";

class GarageDoorOpenCommand implements Command {
    garageDoor: GarageDoor | undefined = undefined;

    constructor(garageDoor: GarageDoor){
        this.garageDoor = garageDoor;
    }

    execute() {
        this.garageDoor?.up();
    }
}

export default GarageDoorOpenCommand;
