class RemoteControlWithLambda {
    onCommands: (() => void)[] = [];
    offCommands: (() => void)[] = [];
    
    private slotIndexes = [0, 1, 2, 3, 4, 5, 6];

    constructor() {}

    setCommand(slot: number, onCommand: () => void, offCommand: () => void) {
        this.onCommands[slot] = onCommand;
        this.offCommands[slot] = offCommand;
    }

    onButtonWasPushed(slot: number) {
        this.onCommands[slot]?.();
    }

    offButtonWasPushed(slot: number) {
        this.offCommands[slot]?.();
    }

    toString() {
        let string = '----- 리모컨 -----\n';

        this.slotIndexes.forEach((index) => {
            string += `[slot ${index}] ${this.onCommands[index]?.constructor.name ?? ''} ${this.offCommands[index]?.constructor.name ?? ''}\n`;
        });

        string += '-----------------';

        return string;
    }
}

export default RemoteControlWithLambda;
