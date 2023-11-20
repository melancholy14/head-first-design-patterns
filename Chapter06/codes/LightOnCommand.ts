import Command from "./Command";
import Light from "./Light";

class LightOnCommand implements Command {
    light: Light | undefined = undefined;
    
    constructor(light: Light) {
        this.light = light;
    }

    execute() {
        this.light?.on();
    }
}

export default LightOnCommand;
