import CeilingFan from "./CeilingFan";
import Command from "./Command";

class CeilingFanOnCommand implements Command {
    ceilingFan?: CeilingFan;

    constructor(ceilingFan: CeilingFan) {
        this.ceilingFan = ceilingFan;
    }

    execute() {
        this.ceilingFan?.on();
    };
}

export default CeilingFanOnCommand;