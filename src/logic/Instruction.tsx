
// BombInstructions.ts
export type Instruction = {
  action: 'cut' | 'pressButton' | 'pull' | 'turnOnSwitch' | 'turnOffSwitch';
  wireColor?: string;
  fuse?: string;
  switchName?: string;
};

const instructionsByCode: Record<number, Instruction[]> = {
  150: [
    //{ action: 'turnOnSwitch', switchName: 'SB1' },
    { action: 'cut', wireColor: 'red' },
    { action: 'cut', wireColor: 'blue' },
    { action: 'turnOnSwitch', switchName: 'SB1' },
    { action: 'pull', switchName: 'F1' },

  ],
  220: [
    {action: "turnOffSwitch", switchName: "SB1"},
    { action: 'cut', wireColor: 'red' },
    { action: 'cut',  wireColor:'yellow'}
  ]
};

export const getInstructionsForCode = (code: number): Instruction[] => {
  return instructionsByCode[code] || [];
};
