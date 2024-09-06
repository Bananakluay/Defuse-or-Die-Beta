import { Instruction } from "../logic/Instruction";

export const instructionData: Record<number, Instruction[]> = {
  0: [
    { action: 'cut', wireColor: 'red' },
    {
      action: 'cut', wireColor: 'blue',
      condition: {
        time: { type: 'withIn', value: 5 }
      }
    },
    {
      action: 'turnOn', switchName: 'SB1',
      condition: {
        time: { type: 'at', value: 5 }
      }
    },
    {
      action: 'pull', fuseName: 'F1',
      condition: {
        time: { type: 'at', value: 5 }
      }
    },
    {
      action: 'turnOn', switchName: 'SB2',
      condition: {
        time: { type: 'at', value: 5 }
      }
    },
  ],
  1: [
    { action: 'cut', wireColor: 'red' },
    {
      action: 'hold', pushButtonName: "PB",
      condition: {
        time: { type: 'at', value: 5 }
      }
    }
  ],
  150: [
    { action: 'pull', fuseName: 'F1' },
    { action: 'keyPress', keyNum: '1' },
    { action: 'keyPress', keyNum: '5' },
    { action: 'keyPress', keyNum: '2' },
    { action: 'keyPress', keyNum: '1' }
  ],
  220: [
    { action: 'turnOff', switchName: 'SB1' },
    { action: 'cut', wireColor: 'red' },
    { action: 'cut', wireColor: 'green' }
  ],
  440: [
    { action: 'turnOn', switchName: 'SB2' },
    { action: 'cut', wireColor: 'pink' },
    { action: 'turnOn', switchName: 'SB1' }
  ],
  550: [
    { action: 'pull', fuseName: 'F3' },
    { action: 'cut', wireColor: 'white' },
    { action: 'turnOn', switchName: 'SB1' }
  ],
  660: [
    { action: 'pull', eCompName: 'C1' },
    { action: 'cut', wireColor: 'pink' }
  ],
  770: [
    { action: 'keyPress', keyNum: '1' }
  ]
};
