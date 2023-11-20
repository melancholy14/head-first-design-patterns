import Command from "./Command";

class SimpleRemoteControl {
    slot: Command | undefined = undefined;

    constructor() {}

    setCommand(command: Command) {
        this.slot = command;
    }

    buttonWasPressed() {
        this.slot?.execute();
    }
}

export default SimpleRemoteControl;
