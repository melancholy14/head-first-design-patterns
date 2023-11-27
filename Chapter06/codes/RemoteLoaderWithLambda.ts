import RemoteControl from "./RemoteControlWithLambda";
import Light from "./Light";
import CeilingFan from "./CeilingFan";
import GarageDoor from "./GarageDoor";
import Stereo from "./Stereo";

function RemoteLoaderWithLambda() {
    const remoteControl = new RemoteControl();

    const livingRoomLight = new Light('거실');
    const kitchenLight = new Light('주방');
    const ceilingFan = new CeilingFan();
    const garageDoor = new GarageDoor();
    const stereo = new Stereo();

    remoteControl.setCommand(0, livingRoomLight.on, livingRoomLight.off);
    remoteControl.setCommand(1, kitchenLight.on, kitchenLight.off);
    remoteControl.setCommand(2, ceilingFan.on, ceilingFan.off);
    remoteControl.setCommand(3, garageDoor.up, garageDoor.down);
    remoteControl.setCommand(4, () => {
        stereo.on();
        stereo.setCD();
        stereo.setVolume(7);
    }, stereo.off);

    console.log(remoteControl.toString());

    remoteControl.onButtonWasPushed(0);
    remoteControl.offButtonWasPushed(0);
    remoteControl.onButtonWasPushed(1);
    remoteControl.offButtonWasPushed(1);
    remoteControl.onButtonWasPushed(2);
    remoteControl.offButtonWasPushed(2);
    remoteControl.onButtonWasPushed(3);
    remoteControl.offButtonWasPushed(3);
    remoteControl.onButtonWasPushed(4);
    remoteControl.offButtonWasPushed(4);
}

RemoteLoaderWithLambda();