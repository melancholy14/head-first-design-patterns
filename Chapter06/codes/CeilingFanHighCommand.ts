import CeilingFan from "./CeilingFan";
import Command from "./Command";

class CeilingFanHighCommand implements Command {
  ceilingFan?: CeilingFan;
  prevSpeed?: number;

  constructor(ceilingFan: CeilingFan) {
    this.ceilingFan = ceilingFan;
  }

  execute() {
    this.prevSpeed = this.ceilingFan?.getSpeed();
    this.ceilingFan?.high();
  }

  undo() {
    switch (this.prevSpeed) {
      case this.ceilingFan?.OFF:
        this.ceilingFan?.off();
        break;

      case this.ceilingFan?.LOW:
        this.ceilingFan?.low();
        break;

      case this.ceilingFan?.MEDIUM:
        this.ceilingFan?.medium();
        break;

      case this.ceilingFan?.HIGH:
        this.ceilingFan?.high();
        break;
    }
  }
}

export default CeilingFanHighCommand;
