import CeilingFan from "./CeilingFan";
import Command from "./Command";

class CeilingFanOffCommand implements Command {
    ceilingFan?: CeilingFan;

    constructor(ceilingFan: CeilingFan) {
        this.ceilingFan = ceilingFan;
    }

    execute() {
        this.ceilingFan?.off();
    };
}

export default CeilingFanOffCommand;