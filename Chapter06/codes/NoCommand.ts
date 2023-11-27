import Command from "./Command";

class NoCommand implements Command {
    constructor(){}

    execute() {}

    undo() {}
}

export default NoCommand;
