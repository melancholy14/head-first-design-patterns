import Command from "./Command";
import NoCommand from "./NoCommand";

class RemoteControl {
    onCommands: Command[] = [];
    offCommands: Command[] = [];
    undoCommand?: Command;
    
    private slotIndexes = [0, 1, 2, 3, 4, 5, 6];

    constructor() {
        this.onCommands = this.slotIndexes.map(() => new NoCommand());
        this.offCommands = this.slotIndexes.map(() => new NoCommand());
        this.undoCommand = new NoCommand();
    }

    setCommand(slot: number, onCommand: Command, offCommand: Command) {
        this.onCommands[slot] = onCommand;
        this.offCommands[slot] = offCommand;
    }

    onButtonWasPushed(slot: number) {
        this.onCommands[slot].execute();
        this.undoCommand = this.onCommands[slot];
    }

    offButtonWasPushed(slot: number) {
        this.offCommands[slot].execute();
        this.undoCommand = this.offCommands[slot];
    }

    undoButtonWasPushed() {
        this.undoCommand?.undo();
    }

    toString() {
        let string = '----- 리모컨 -----\n';

        this.slotIndexes.forEach((index) => {
            string += `[slot ${index}] ${this.onCommands[index].constructor.name} ${this.offCommands[index].constructor.name}\n`;
        });

        string += '-----------------';

        return string;
    }
}

export default RemoteControl;
