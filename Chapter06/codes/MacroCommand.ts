import Command from "./Command";

class MacroCommand implements Command {
    commands: Command[] = [];

    constructor(commands: Command[]) {
        this.commands = commands;
    }

    execute() {
        for(const command of this.commands) {
            command.execute();
        }
    }

    undo() {
        const reversedCommands = [...this.commands].reverse();
        for(const command of reversedCommands) {
            command.undo();
        }
    }
}

export default MacroCommand;
