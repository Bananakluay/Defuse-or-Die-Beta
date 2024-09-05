import { useState, useEffect } from "react";
import Timer from "./Timer";
import Wires from "./Wires";
import { getInstructionsForCode, Instruction } from "../logic/Instruction";
import SwitchPanel from "./SwitchPanel";
import FusePanel from "./FusePanel";
import '../styles/Bomb.css';
import { generateCode } from "../utils/generate";
import { checkTimeCondition } from "../utils/timeCondition";
import ElectronicPanel from "./ElectronicPanel";
import PushButton from "./PushButton";

type Props = {
  onDefuse: () => void;
  onExplode: () => void;
};

function Bomb({ onDefuse, onExplode }: Props) {
  const [code, setCode] = useState(150);
  const [previousCode, setPreviousCode] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(300);
  const [currentStep, setCurrentStep] = useState(0)
  const [failure, setFailure] = useState(0)
  const [success, setSuccess] = useState(0)
  const [startTime, setStartTime] = useState<number>(0)

  const maxSuccess = 2
  const maxFailure = 3

  // Function to generate a new code different from the previous one
  const generateNewCode = () => {
    let newCode;
    do {
      newCode = generateCode();
    } while (newCode === previousCode);
    setPreviousCode(code); // Update previous code
    setCode(newCode); // Set new code
  };

  // Bomb components and their states
  const [wires, setWires] = useState<string[]>(["red", "blue", "green", "yellow", "pink"]);
  const [fuses] = useState<string[]>(["F1", "F2", "F3"])
  const [eComps] = useState<string[]>(["C1", "C2", "T1", "T2"])
  const [switches] = useState<string[]>(["SB1", "SB2"]);

  const [cutWires, setCutWires] = useState<string[]>([]);
  const [pulledFuses, setPulledFuses] = useState<string[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [pulledEComps, setPulledEComps] = useState<string[]>([]);


  const [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({
    SB1: true,
    SB2: false,
  });

  // Success condition check
  const checkSuccess = () => {
    if (currentStep === instructions.length) {
      setSuccess(prev => prev + 1);
      if (success + 1 === maxSuccess) {
        onDefuse();
      } {
        generateNewCode()
        setCurrentStep(0)
      }
    }
  };

  // Failure condition check
  const checkFailure = () => {
    setFailure(prev => prev + 1);
    if (failure + 1 >= maxFailure) {
      onExplode();
    } else {
      generateNewCode()
    }
  };
  // Update start time and check current state when the step changes
  useEffect(() => {
    setStartTime(timeLeft);
    console.log(currentStep, instructions.length);
    console.log(instructions[currentStep]);

    checkCurrentState();
    checkSuccess()
  }, [currentStep]);

  const instructions: Instruction[] = getInstructionsForCode(code) || [];


  const handleWireCut = (wireColor: string) => {
    if (!cutWires.includes(wireColor)) {
      const currentInstruction = instructions[currentStep];

      if (currentInstruction?.action === "cut" && currentInstruction.wireColor === wireColor) {
        if (currentInstruction.condition?.time) {
          const { type, value } = currentInstruction.condition.time;
          if (!checkTimeCondition(startTime, timeLeft, value, currentInstruction.condition.time)) {
            console.log('Failed: Time constraint not met.');
            checkFailure();
            return; // Exit function to prevent further processing
          }
        }

        setCutWires(prev => [...prev, wireColor]);
        setCurrentStep(prev => prev + 1);
        checkSuccess();
      } else {
        checkFailure();
      }
    }
  };

  // Handle fuse pull
  const handleFusePull = (fuse: string) => {
    if (!pulledFuses.includes(fuse)) {
      setPulledFuses(prev => [...prev, fuse]);
      const currentInstruction = instructions[currentStep];

      if (currentInstruction?.action === "pull" && currentInstruction.fuse === fuse) {
        if (currentInstruction.condition?.time) {
          const { type, value } = currentInstruction.condition.time;
          if (!checkTimeCondition(startTime, timeLeft, value, currentInstruction.condition.time)) {
            console.log('Failed: Time constraint not met.');
            checkFailure();
            return; // Exit function to prevent further processing
          }
        }

        setCurrentStep(prev => prev + 1);
        checkSuccess();
      } else {
        checkFailure();
      }
    }
  };

  // Handle Electronic component pull
  const handleECompPull = (eComp: string) => {
    if (!pulledFuses.includes(eComp)) {
      setPulledFuses(prev => [...prev, eComp]);
      const currentInstruction = instructions[currentStep];

      if (currentInstruction?.action === "pull" && currentInstruction.eCompName === eComp) {
        if (currentInstruction.condition?.time) {
          const { type, value } = currentInstruction.condition.time;
          if (!checkTimeCondition(startTime, timeLeft, value, currentInstruction.condition.time)) {
            console.log('Failed: Time constraint not met.');
            checkFailure();
            return; // Exit function to prevent further processing
          }
        }

        setCurrentStep(prev => prev + 1);
        checkSuccess();
      } else {
        checkFailure();
      }
    }
  };


  const handleButtonPressed = () => {
    const currentInstruction = instructions[currentStep];
    
    console.log("hello");
    
    if (currentInstruction.action === "press") {
      setIsPressed(true);
      setStartTime(timeLeft);

      if (currentInstruction.condition?.time) {
        const { value } = currentInstruction.condition.time;
        if (!checkTimeCondition(startTime, timeLeft, value, currentInstruction.condition.time)) {
          console.log('Failed: Time constraint not met.');
          checkFailure();
          return;
        }
      }
      setCurrentStep(prev => prev + 1);
      checkSuccess();
    } else if (currentInstruction.action === "hold") {
      setIsHolding(true);

      if (currentInstruction.condition?.time) {
        const { value } = currentInstruction.condition.time;
        if (!checkTimeCondition(startTime, timeLeft, value, currentInstruction.condition.time)) {
          console.log('Failed: Time constraint not met.');
          checkFailure();
          return;
        }
      }
    }
  };

  const handleButtonRelease = () => {
    if (isHolding) {
      const currentInstruction = instructions[currentStep];
      if (currentInstruction.condition?.time) {
        const { value } = currentInstruction.condition.time;
        if (checkTimeCondition(startTime, timeLeft, value, currentInstruction.condition.time)) {
          setIsHolding(false);
          setCurrentStep(prev => prev + 1);
          checkSuccess();
        } else {
          checkFailure();
        }
      }
    }
  };
  // Handle switch toggle
  const handleSwitchButton = (switchName: string) => {
    setSwitchStates(prev => ({ ...prev, [switchName]: !prev[switchName] }));
    const currentInstruction = instructions[currentStep];

    if (currentInstruction?.switchName === switchName) {
      if (
        (currentInstruction.action === "turnOn" && !switchStates[switchName]) ||
        (currentInstruction.action === "turnOff" && switchStates[switchName])
      ) {
        if (currentInstruction.condition?.time) {
          const { type, value } = currentInstruction.condition.time;
          if (!checkTimeCondition(startTime, timeLeft, value, currentInstruction.condition.time)) {
            console.log('Failed: Time constraint not met.');
            checkFailure();
            return; // Exit function to prevent further processing
          }
        }

        setCurrentStep(prev => prev + 1);
        checkSuccess();
      } else {
        checkFailure();
      }
    }
  };


  // Check if the current game state meets the instruction for the current step
  const checkCurrentState = () => {
    const instruction = instructions[currentStep];
    if (!instruction) return;

    switch (instruction.action) {
      case "cut":
        if (instruction.wireColor && cutWires.includes(instruction.wireColor)) {
          setCurrentStep((prev) => prev + 1);
        }
        break;
      case "pull":
        if (instruction.fuse && pulledFuses.includes(instruction.fuse)) {
          setCurrentStep((prev) => prev + 1);
        }
        break;
      case "turnOn":
      case "turnOff":
        if (
          instruction.switchName &&
          switchStates[instruction.switchName] === (instruction.action === "turnOn")
        ) {
          setCurrentStep((prev) => prev + 1);
        }
        break;
    }
  };


  return (
    <>
      <div className="code">Code: {code}</div>
      <div className="success">Success: {success}</div>
      <div className="failure">Failure: {failure}</div>
      <Timer timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      <Wires wires={wires} cutWires={cutWires} onWireCut={handleWireCut} />
      <SwitchPanel switches={switches} switchStates={switchStates} onSwitchToggle={handleSwitchButton} />
      <FusePanel fuses={fuses} pulledFuses={pulledFuses} onFusePull={handleFusePull} />
      <ElectronicPanel eComps={eComps} pulledEComps={pulledEComps} onECompPull={handleECompPull} />
      <PushButton onPress={handleButtonPressed} onRelease={handleButtonRelease} />
    </>
  );
}

export default Bomb;
