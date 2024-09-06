import { useState, useEffect } from "react";
import Timer from "./Timer";
import Wires from "./Wires";
import { getInstructionsForCode, Instruction, TimeCondition } from "../logic/Instruction";
import SwitchPanel from "./SwitchPanel";
import FusePanel from "./FusePanel";
import '../styles/Bomb.css'
import { generateCode } from "../utils/generate";
import ElectronicPanel from "./ElectronicPanel";
type Props = {
  onDefuse: () => void;
  onExplode: () => void;
};

function Bomb({ onDefuse, onExplode }: Props) {
  const [code, setCode] = useState(0)
  const [previousCodes, setPreviousCodes] = useState<number[]>([code])
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentStep, setCurrentStep] = useState(0);
  const [failure, setFailure] = useState(0);
  const [success, setSuccess] = useState(0);
  const [startTime, setStartTime] = useState<number>(0)
  const maxSuccess = 3;
  const maxFailure = 5;

  // Bomb components
  const [wires] = useState<string[]>(["red", "blue", "green", "black", "pink"]);
  const [fuses] = useState<string[]>(["F1", "F2", "F3"]);
  const [eComps] = useState<string[]>(["C1", "C2", "T1", "T2"])
  const [switches] = useState<string[]>(["SB1", "SB2"]);

  const [cutWires, setCutWires] = useState<string[]>([]);
  const [pulledFuses, setPulledFuses] = useState<string[]>([]);
  const [pulledEComps] = useState<string[]>([]);
  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({
    SB1: true,
    SB2: false,
  });

  // Function to generate a new code different from the previous one
  const generateNewCode = () => {
    let newCode;
    do {
      newCode = generateCode();
    } while (previousCodes.includes(newCode));

    setPreviousCodes(prev => [...prev, newCode]); // Add the new code to previous codes
    setCode(newCode); // Set the new code
  };

  const instructions: Instruction[] = code !== null ? getInstructionsForCode(code) : [];

  const checkSuccess = () => {
    console.log(currentStep, instructions.length);

    if (currentStep === instructions.length) {
      setSuccess(prev => prev + 1);
      if (success + 1 === maxSuccess) {
        onDefuse(); // Successfully defused
      } else {
        generateNewCode()
        setCurrentStep(0)
      }
    }
  };

  const checkFailure = () => {
    setFailure(prev => prev + 1);
    if (failure + 1 >= maxFailure) {
      onExplode(); // Bomb exploded
    } else {
      generateNewCode()
      setCurrentStep(0)
    }
  };

  const checkCurrentState = () => {
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
    checkCurrentState()
    checkSuccess()
    console.log('code', code);

  }, [currentStep]);

  // current instruction has time withIn
  useEffect(() => {
    const timeCondition = instructions[currentStep].condition?.time
    if (timeCondition && timeCondition.type === 'withIn') {
      if (timeLeft <= startTime - timeCondition.value) {
        checkFailure()
      }
    }

  }, [timeLeft])

  const atTimeCondition = (timeCondition: TimeCondition) => {
    return timeLeft.toString().includes(timeCondition.value.toString())
  }


  const handleWireCut = (wireColor: string) => {
    if (cutWires.includes(wireColor)) {
      return;
    }
    setCutWires(prev => [...prev, wireColor]);

    const instruction = instructions[currentStep]
    if (instruction?.action === "cut" && wireColor === instruction.wireColor) {
      const timeCondition = instruction.condition?.time
      if (timeCondition?.type === 'at' && !atTimeCondition(timeCondition)) {
        checkFailure()
        return
      }
      setCurrentStep(prev => prev + 1);
      checkSuccess()
    } else {
      checkFailure()
    }
  }

  const handleFusePull = (fuseName: string) => {
    if (pulledFuses.includes(fuseName)) {
      return;
    }
    setPulledFuses(prev => [...prev, fuseName])

    const instruction = instructions[currentStep]
    if (instruction?.action === "pull" && fuseName === instruction.fuseName) {
      const timeCondition = instruction.condition?.time
      if (timeCondition?.type === 'at' && !atTimeCondition(timeCondition)) {
        checkFailure()
        return
      }

      setCurrentStep(prev => prev + 1)
      checkSuccess()
    } else {
      checkFailure()
    }
  };


  // Handle Electronic component pull
  const handleECompPull = (eCompName: string) => {
    if (pulledFuses.includes(eCompName)) {
      return;
    }
    setPulledFuses(prev => [...prev, eCompName]);

    const instruction = instructions[currentStep]
    if (instruction?.action === "pull" && eCompName === instruction.eCompName) {
      const timeCondition = instruction.condition?.time
      if (timeCondition?.type === 'at' && !atTimeCondition(timeCondition)) {
        checkFailure()
        return
      }
      setCurrentStep(prev => prev + 1);
      checkSuccess();
    } else {
      checkFailure();
    }
  }

  const handleSwitchButton = (switchName: string) => {

    setSwitchStates(prev => ({ ...prev, [switchName]: !prev[switchName] }))

    const instruction = instructions[currentStep]
    if (instruction?.switchName === switchName) {
      if (
        (instruction.action === "turnOn" && !switchStates[switchName]) ||
        (instruction.action === "turnOff" && switchStates[switchName])
      ) {
        const timeCondition = instruction.condition?.time
        if (timeCondition?.type === 'at' && !atTimeCondition(timeCondition)) {
          checkFailure()
          return
        }

        // If the action is correct, move to the next step
        setCurrentStep(prev => prev + 1)
        checkSuccess()
      } else {
        // If the action is incorrect, check failure
        checkFailure()
      }
    } else {
      // If the switch name doesn't match the current instruction, still toggle the switch
      checkFailure()
    }
  };

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
        onFusePull={handleFusePull} />
      <ElectronicPanel
        eComps={eComps}
        pulledEComps={pulledEComps}
        onECompPull={handleECompPull} />
    </>

  );
}

export default Bomb
