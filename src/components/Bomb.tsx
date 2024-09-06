import { useState, useEffect } from "react";
import Timer from "./Timer";
import Wires from "./Wires";
import { getInstructionsForCode, Instruction, TimeCondition } from "../logic/Instruction";
import SwitchPanel from "./SwitchPanel";
import FusePanel from "./FusePanel";
import '../styles/Bomb.css'
import { generateCode } from "../utils/generate";
import ElectronicPanel from "./ElectronicPanel";
import PushButton from "./PushButton";
type Props = {
  onDefuse: () => void;
  onExplode: () => void;
};

function Bomb({ onDefuse, onExplode }: Props) {
  const [code, setCode] = useState(1)
  const [previousCodes, setPreviousCodes] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);
  const [failure, setFailure] = useState(0);
  const [success, setSuccess] = useState(0);
  const [startTime, setStartTime] = useState<number>(0)

  const maxSuccess = 3;
  const maxFailure = 5;

  const wires = ["red", "blue", "green", "black", "pink"]
  const fuses = ["F1", "F2", "F3"]
  const eComps = ["C1", "C2", "T1", "T2"]
  const switches = ["SB1", "SB2"]
  const [cutWires, setCutWires] = useState<string[]>([]);
  const [pulledFuses, setPulledFuses] = useState<string[]>([]);
  const [pulledEComps, setPulledEComps] = useState<string[]>([]);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({
    SB1: true,
    SB2: false,
  });

  const [isPressed, setIsPressed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);

  // Function to generate a new code different from the previous one
  const generateNewCode = () => {
    let newCode;
    do {
      newCode = generateCode()
    } while (previousCodes.includes(newCode))

    setPreviousCodes(prev => [...prev, newCode])
    setCode(newCode) // Set the new code
    setCurrentStep(0)
  };

  const instructions: Instruction[] = code !== null ? getInstructionsForCode(code) : [];

  // Helper to check if time conditions are met
  const checkTimeCondition = (timeCondition: TimeCondition | undefined) => {
    if (timeCondition?.type === 'withIn' && timeLeft <= startTime - timeCondition.value) {
      return false;
    }
    if (timeCondition?.type === 'at' && !timeLeft.toString().includes(timeCondition.value.toString())) {
      console.log(timeLeft, timeCondition.value);
      return false;
    }
    return true;
  };

  const handleSuccess = () => {
    console.log(currentStep, instructions.length);

    if (currentStep === instructions.length) {
      setSuccess(prev => prev + 1);
      if (success + 1 === maxSuccess) {
        onDefuse(); // Successfully defused
      } else {
        generateNewCode()
      }
    }
  };

  const handleFailure = () => {
    setFailure(prev => prev + 1);
    if (failure + 1 >= maxFailure) {
      onExplode(); // Bomb exploded
    } else {
      generateNewCode()
    }
  }

  const validateStep = (condition: boolean) => {
    if (condition) {
      setCurrentStep(prev => prev + 1);
      handleSuccess();
    } else {
      handleFailure();
    }
  };

  const autoSkip = () => {
    console.log(currentStep)
    const instruction = instructions[currentStep];
    if (!instruction) return; // No instruction at this step

    // Check wires
    if (instruction.action === "cut" && instruction.wireColor && cutWires.includes(instruction.wireColor)) {
      console.log('is already cut skip to next step');
      setCurrentStep(prev => prev + 1);
      return;
    }

    // Check fuses
    if (instruction.action === "pull" && instruction.fuseName && pulledFuses.includes(instruction.fuseName)) {
      console.log('is already pulled skip to next step');
      setCurrentStep(prev => prev + 1);
      return;
    }
    // Check switches
    const switchName = instruction.switchName;
    if (switchName) {
      if (
        (instruction.action === "turnOn" && switchStates[switchName]) ||
        (instruction.action === "turnOff" && !switchStates[switchName])

      ) {
        console.log('switch is already skip to next step');
        setCurrentStep(prev => prev + 1);
        return;
      }
    }
  };

  useEffect(() => {

    console.log(instructions[currentStep]);
    setStartTime(timeLeft)
    autoSkip()
    handleSuccess()
    console.log('code', code);

  }, [currentStep]);

  // current instruction has time withIn
  useEffect(() => {
    const timeCondition = instructions[currentStep].condition?.time
    if (timeCondition && timeCondition.type === 'withIn') {
      if (!checkTimeCondition(timeCondition)) {
        handleFailure()
      }
    }
  }, [timeLeft])


  const handleWireCut = (wireColor: string) => {
    if (cutWires.includes(wireColor)) return

    setCutWires(prev => [...prev, wireColor])

    const instruction = instructions[currentStep]
    const valid = instruction?.action === "cut" && wireColor === instruction.wireColor
    validateStep(valid && checkTimeCondition(instruction.condition?.time))
  }

  const handleFusePull = (fuseName: string) => {
    if (pulledFuses.includes(fuseName)) return

    setPulledFuses(prev => [...prev, fuseName])

    const instruction = instructions[currentStep]
    const valid = instruction?.action === "pull" && fuseName === instruction.fuseName;
    validateStep(valid && checkTimeCondition(instruction.condition?.time));
  }

  const handleECompPull = (eCompName: string) => {
    if (pulledEComps.includes(eCompName)) return;

    setPulledEComps(prev => [...prev, eCompName]);

    const instruction = instructions[currentStep];
    const valid = instruction?.action === "pull" && eCompName === instruction.eCompName;
    validateStep(valid && checkTimeCondition(instruction.condition?.time));
  }

  const handleSwitchButton = (switchName: string) => {

    setSwitchStates(prev => ({ ...prev, [switchName]: !prev[switchName] }))

    const instruction = instructions[currentStep]
    const valid = instruction?.switchName === switchName && (
      (instruction.action === "turnOn" && !switchStates[switchName]) ||
      (instruction.action === "turnOff" && switchStates[switchName])
    )
    validateStep(valid && checkTimeCondition(instruction.condition?.time));
  }

  const handleButtonPressed = () => {
    const instruction = instructions[currentStep]
    const timeCondition = instruction.condition?.time
    if (instruction.action === "press") {
      validateStep(checkTimeCondition(timeCondition))
    } else if (instruction.action === "hold") {
      setStartTime(timeLeft)
    } else {
      console.log("What the funk is this?");
    }
  }

  const handleButtonReleased = () => {
    const instruction = instructions[currentStep]
    const timeCondition = instruction.condition?.time
    if (timeCondition && timeCondition.type === 'at') {
      validateStep(checkTimeCondition(timeCondition))
    } else {
      validateStep(true)
    }
  }
  return (
    <>
      <div className="code">Code: {code}</div>
      <div className="success">Success: {success}</div>
      <div className="failure">Failure: {failure}</div>
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <Wires
        wires={wires}
        cutWires={cutWires}
        onWireCut={handleWireCut} />
      <SwitchPanel
        switches={switches}
        switchStates={switchStates}
        onSwitchToggle={handleSwitchButton}
      />
      <FusePanel
        fuses={fuses}
        pulledFuses={pulledFuses}
        onFusePull={handleFusePull}
      />
      <ElectronicPanel
        eComps={eComps}
        pulledEComps={pulledEComps}
        onECompPull={handleECompPull}
      />

      <PushButton
        onPress={handleButtonPressed}
        onRelease={handleButtonReleased}
        onHold={() => { }}
      />
    </>


  );
}

export default Bomb
