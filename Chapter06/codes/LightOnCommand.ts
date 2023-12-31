import Command from "./Command";
import Light from "./Light";

class LightOnCommand implements Command {
    light?: Light;
    
    constructor(light: Light) {
        this.light = light;
    }

    execute() {
        this.light?.on();
    }

    undo() {
        this.light?.off();   
    }
}

export default LightOnCommand;
