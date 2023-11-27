interface Command {
    execute: VoidFunction;
    undo: VoidFunction;
}

export default Command;
