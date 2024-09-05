import { Instruction } from "./Instruction";

export const instructionData: Record<number, Instruction[]> = {
  150: [
    { action: 'cut', wireColor: 'red' },
    {
      action: 'cut', wireColor: 'blue',
      condition: {
        time: { type: 'after', value: 5 }
      }
    },
    { action: 'turnOnSwitch', switchName: 'SB1' },
    { action: 'pull', fuse: 'F1' }
  ],
  220: [
    { action: 'turnOffSwitch', switchName: 'SB1' },
    { action: 'cut', wireColor: 'red' },
    { action: 'cut', wireColor: 'green' }
  ],
  330: [
    { action: 'cut', wireColor: 'yellow' },
    {
      action: 'pull', fuse: 'F2',
      condition: {
        time: { type: 'before', value: 30 }
      }
    },
    { action: 'turnOnSwitch', switchName: 'SB2' }
  ],
  440: [
    { action: 'turnOffSwitch', switchName: 'SB2' },
    { action: 'cut', wireColor: 'black' },
    {
      action: 'pressButton', switchName: 'SB1',
      condition: {
        time: { type: 'at', value: 10 }
      }
    }
  ],
  550: [
    { action: 'pull', fuse: 'F3' },
    {
      action: 'cut', wireColor: 'white',
      condition: {
        time: { type: 'after', value: 15 }
      }
    },
    { action: 'turnOnSwitch', switchName: 'SB1' }
  ]
};
