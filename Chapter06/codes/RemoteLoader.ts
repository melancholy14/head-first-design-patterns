import RemoteControl from "./RemoteControl";
import Light from "./Light";
import CeilingFan from "./CeilingFan";
import GarageDoor from "./GarageDoor";
import Stereo from "./Stereo";
import LightOnCommand from "./LightOnCommand"
import LightOffCommand from "./LightOffCommand";
import CeilingFanOnCommand from "./CeilingFanOnCommand";
import CeilingFanOffCommand from "./CeilingFanOffCommand";
import GarageDoorOpenCommand from "./GarageDoorOpenCommand";
import GarageDoorDownCommand from "./GarageDoorDownCommand";
import StereoOnWithCDCommand from "./StereoOnWithCDCommand";
import StereoOffCommand from "./StereoOffCommand";

function RemoteLoader() {
    const remoteControl = new RemoteControl();

    const livingRoomLight = new Light('거실');
    const kitchenLight = new Light('주방');
    const ceilingFan = new CeilingFan();
    const garageDoor = new GarageDoor();
    const stereo = new Stereo();

    const livingRoomLightOn = new LightOnCommand(livingRoomLight);
    const livingRoomLightOff = new LightOffCommand(livingRoomLight);

    const kitchenLightOn = new LightOnCommand(kitchenLight);
    const kitchenLightOff = new LightOffCommand(kitchenLight);

    const ceilingFanOn = new CeilingFanOnCommand(ceilingFan);
    const ceilingFanOff = new CeilingFanOffCommand(ceilingFan);

    const garageDoorUp = new GarageDoorOpenCommand(garageDoor);
    const garageDoorDown = new GarageDoorDownCommand(garageDoor);

    const stereoOnWithCD = new StereoOnWithCDCommand(stereo);
    const stereoOff = new StereoOffCommand(stereo);

    remoteControl.setCommand(0, livingRoomLightOn, livingRoomLightOff);
    remoteControl.setCommand(1, kitchenLightOn, kitchenLightOff);
    remoteControl.setCommand(2, ceilingFanOn, ceilingFanOff);
    remoteControl.setCommand(3, garageDoorUp, garageDoorDown);
    remoteControl.setCommand(4, stereoOnWithCD, stereoOff);

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

RemoteLoader();