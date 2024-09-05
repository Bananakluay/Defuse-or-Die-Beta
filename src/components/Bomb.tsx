import { useState, useEffect } from "react";
import Timer from "./Timer";
import Wires from "./Wires";
import { getInstructionsForCode, Instruction } from "../logic/Instruction";
import SwitchPanel from "./SwitchPanel";

type Props = {
  onDefuse: () => void;
  onExplode: () => void;
};

function Bomb({ onDefuse, onExplode }: Props) {
  const [code, setCode] = useState(150);
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);
  const [failure, setFailure] = useState(0);
  const [success, setSuccess] = useState(0);
  const maxSuccess = 3;
  const maxFailure = 3;

  // Bomb components
  const [wires, setWires] = useState<string[]>(["red", "blue", "green"]);
  const [fuses, setFuses] = useState<string[]>(["F1", "F2", "F3"]);
  const [switches, setSwitches] = useState<string[]>(["SB1", "SB2"]);

  const [cutWires, setCutWires] = useState<string[]>([]);
  const [pulledFuses, setPulledFuses] = useState<string[]>([]);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({
    SB1: true,
    SB2: false,
  });

  const instructions: Instruction[] = code !== null ? getInstructionsForCode(code) : [];

  const checkCurrentState = () => {
    console.log(currentStep)
    const instruction = instructions[currentStep];
    if (!instruction) return; // No instruction at this step

    // Check wires
    if (instruction.action === "cut" && instruction.wireColor && cutWires.includes(instruction.wireColor)) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Check fuses
    if (instruction.action === "pull" && instruction.fuse && pulledFuses.includes(instruction.fuse)) {
      setCurrentStep(currentStep + 1);
      return;
    }

    // Check switches
    const switchName = instruction.switchName;
    if (switchName) {
      if (
        (instruction.action === "turnOnSwitch" && switchStates[switchName]) ||
        (instruction.action === "turnOffSwitch" && !switchStates[switchName])
      ) {
        setCurrentStep(currentStep + 1);
        return;
      }
    }
  };

  useEffect(() => {
    checkCurrentState();
  }, [currentStep]);

  const checkSuccess = () => {
    if (currentStep === instructions.length - 1) {
      setSuccess(prev => prev + 1);
      if (success + 1 === maxSuccess) {
        onDefuse(); // Successfully defused
      }
    }
  };

  useEffect(() => {
    checkSuccess()
  }, [currentStep])

  const checkFailure = () => {
    setFailure(prev => prev + 1);
    if (failure + 1 >= maxFailure) {
      onExplode(); // Bomb exploded
    }
  };

  const handleWireCut = (wireColor: string) => {
    if (cutWires.includes(wireColor)) {
      return;
    }
    setCutWires(prev => [...prev, wireColor]);
    if (instructions[currentStep]?.action === "cut" && wireColor === instructions[currentStep].wireColor) {
      setCurrentStep(prev => prev + 1);
      checkSuccess();
    } else {
      checkFailure();
    }
  };

  const handleFusePull = (fuse: string) => {
    setPulledFuses(prev => [...prev, fuse]);
    if (instructions[currentStep]?.action === "pull" && fuse === instructions[currentStep].fuse) {
      if (pulledFuses.includes(fuse)) {
        return;
      }
      setCurrentStep(prev => prev + 1);
      checkSuccess();
    } else {
      checkFailure();
    }
  };

  const handleSwitchButton = (switchName: string) => {
    const instruction = instructions[currentStep];
    // Toggle the switch state every time the button is pressed
    setSwitchStates(prev => ({ ...prev, [switchName]: !prev[switchName] }));

    // Check if the current step matches the instruction
    if (instruction?.switchName === switchName) {
      if (
        (instruction.action === "turnOnSwitch" && !switchStates[switchName]) ||
        (instruction.action === "turnOffSwitch" && switchStates[switchName])
      ) {
        // If the action is correct, move to the next step
        setCurrentStep(prev => prev + 1);
        checkSuccess();
      } else {
        // If the action is incorrect, check failure
        checkFailure();
      }
    } else {
      // If the switch name doesn't match the current instruction, still toggle the switch
      checkFailure();
    }
  };

  return (
    <>
      <div className="code">Code: {code}</div>
      <div className="success">Success: {success}</div>
      <div className="failure">Failure: {failure}</div>
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <Wires wires={wires} onWireCut={handleWireCut} />
      <SwitchPanel
        switches={switches}
        switchStates={switchStates}
        onSwitchToggle={handleSwitchButton}
      />
    </>
  );
}

export default Bomb;
