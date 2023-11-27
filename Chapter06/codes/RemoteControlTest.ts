import SimpleRemoteControl from "./SimpleRemoteControl";
import Light from "./Light";
import LightOnCommand from "./LightOnCommand";
import GarageDoor from "./GarageDoor";
import GarageDoorOpenCommand from "./GarageDoorOpenCommand";

function RemoteControlTest() {
    const remote = new SimpleRemoteControl();
    const light = new Light();
    const lightOn = new LightOnCommand(light);

    remote.setCommand(lightOn);
    remote.buttonWasPressed();

    const garageDoor = new GarageDoor();
    const garageDoorOpen = new GarageDoorOpenCommand(garageDoor);

    remote.setCommand(garageDoorOpen);
    remote.buttonWasPressed();
}

RemoteControlTest();
