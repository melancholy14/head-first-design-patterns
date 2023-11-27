import RemoteControl from "./RemoteControl";
import Light from "./Light";
import CeilingFan from "./CeilingFan";
import Stereo from "./Stereo";
import LightOnCommand from "./LightOnCommand"
import LightOffCommand from "./LightOffCommand";
import CeilingFanOnCommand from "./CeilingFanOnCommand";
import CeilingFanOffCommand from "./CeilingFanOffCommand";
import StereoOnWithCDCommand from "./StereoOnWithCDCommand";
import StereoOffCommand from "./StereoOffCommand";
import MacroCommand from "./MacroCommand";

function RemoteLoaderWithMacro() {
    const remoteControl = new RemoteControl();

    const livingRoomLight = new Light('거실');
    const ceilingFan = new CeilingFan();
    const stereo = new Stereo();

    const livingRoomLightOn = new LightOnCommand(livingRoomLight);
    const livingRoomLightOff = new LightOffCommand(livingRoomLight);

    const ceilingFanOn = new CeilingFanOnCommand(ceilingFan);
    const ceilingFanOff = new CeilingFanOffCommand(ceilingFan);

    const stereoOnWithCD = new StereoOnWithCDCommand(stereo);
    const stereoOff = new StereoOffCommand(stereo);

    const partyOn = [livingRoomLightOn, stereoOnWithCD, ceilingFanOn];
    const partyOff = [livingRoomLightOff, stereoOff, ceilingFanOff];

    const partyOnMacro = new MacroCommand(partyOn);
    const partyOffMacro = new MacroCommand(partyOff);

    remoteControl.setCommand(0, partyOnMacro, partyOffMacro);

    console.log(remoteControl.toString());

    console.log('\n--- 매크로 ON ---');
    remoteControl.onButtonWasPushed(0);

    console.log('\n--- 매크로 OFF ---');
    remoteControl.offButtonWasPushed(0);
}

RemoteLoaderWithMacro();