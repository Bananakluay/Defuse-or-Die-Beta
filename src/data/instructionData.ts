import { Instruction } from "../logic/Instruction";

export const instructionData: Record<number, Instruction[]> = {
  1: [
    { action: 'press', pushButtonName: 'PB' }
  ],
  3: [
    { action: 'pull', eCompName: 'C1' }
  ],
  4: [
    { action: 'keyPress', keyNum: '101' },
    { action: 'turnOn', switchName: 'SB2', condition: { time: { at: 1 } } }
  ],
  6: [
    { action: 'pull', eCompName: 'C2' }
  ],
  9: [
    { action: 'press', pushButtonName: 'PB' },
    { action: 'press', pushButtonName: 'PB' }
  ],
  25: [
    { action: 'pull', fuseName: 'Fuse 2' },
    { action: 'press', pushButtonName: 'PB', condition: { time: { within: 9 } } }
  ],
  37: [
    { action: 'cut', wireColor: 'red' },
    { action: 'press', pushButtonName: 'PB' },
    { action: 'turnOn', switchName: 'SB1' }
  ],
  46: [
    { action: 'pull', batteryName: 'Battery 1' },
    { action: 'press', pushButtonName: 'PB', count: 4 }
  ],
  59: [
    { action: 'pull', eCompName: 'com_transistor_brown' },
    { action: 'keyPress', keyNum: '173' },
    { action: 'turnOff', switchName: 'SB2', condition: { time: { at: 0 } } }
  ],
  78: [
    { action: 'keyPress', keyNum: '0106' },
    { action: 'press', pushButtonName: 'PB' }
  ],
  93: [
    { action: 'pull', eCompName: 'com_transistor_blue' },
    { action: 'press', pushButtonName: 'PB', condition: { time: { within: 8 } } }
  ],
  112: [
    { action: 'pull', eCompName: 'chip-main' },
    { action: 'press', pushButtonName: 'PB' },
    { action: 'cut', wireColor: 'yellow' }
  ],
  200: [
    { action: 'press', pushButtonName: 'PB', count: 2 },
    { action: 'pull', eCompName: 'com_capacitor2', condition: { serial: { endsWith: 'A' } } },
    { action: 'keyPress', keyNum: '19101', condition: { serial: { notEndsWith: 'A' } } },
    { action: 'keyPress', keyNum: '01101' },
    { action: 'turnOff', switchName: 'SB1' }
  ],
  375: [
    { action: 'pull', fuseName: 'Fuse 3' },
    { action: 'cut', wireColor: 'blue', condition: { time: { within: 5 } } },
    { action: 'press', pushButtonName: 'PB' }
  ],
  692: [
    { action: 'keyPress', keyNum: '2547' },
    { action: 'pull', eCompName: 'com_transistor_black' },
    { action: 'press', pushButtonName: 'PB', condition: { time: { at: 8 } } }
  ],
  823: [
    { action: 'pull', eCompName: 'chip-small' },
    { action: 'keyPress', keyNum: '8462' },
    { action: 'press', pushButtonName: 'PB' },
    { action: 'turnOn', switchName: 'SB1' }
  ],
  1124: [
    { action: 'pull', batteryName: 'Battery 2' },
    { action: 'cut', wireColor: 'pink', condition: { time: { at: 5 } } },
    { action: 'press', pushButtonName: 'PB', count: 2 },
    { action: 'keyPress', keyNum: '458' },
    { action: 'turnOff', switchName: 'SB2' }
  ],
  3333: [
    { action: 'press', pushButtonName: 'PB' },
    { action: 'keyPress', keyNum: '5322' },
    { action: 'pull', fuseName: 'Fuse 1', condition: { serial: { endsWith: 'B' } } },
    { action: 'turnOff', switchName: 'SB1', condition: { serial: { notEndsWith: 'B' } } },
    { action: 'cut', wireColor: 'green', condition: { time: { within: 4 } } },
    { action: 'keyPress', keyNum: '2235' },
    { action: 'press', pushButtonName: 'PB' }
  ],
  5423: [
    { action: 'pull', eCompName: 'com_capacitor3' },
    { action: 'keyPress', keyNum: '2345' },
    { action: 'turnOn', switchName: 'SB1' },
    { action: 'cut', wireColor: 'yellow' },
    { action: 'press', pushButtonName: 'PB' }
  ],
  6584: [
    { action: 'keyPress', keyNum: '2580' },
    { action: 'pull', eCompName: 'chip-big', condition: { time: { within: 5 } } },
    { action: 'keyPress', keyNum: '1' },
    { action: 'turnOff', switchName: 'SB1' },
    { action: 'press', pushButtonName: 'PB', count: 2 }
  ],
  8796: [
    { action: 'pull', eCompName: 'C1' },
    { action: 'press', pushButtonName: 'PB', count: 3 },
    { action: 'cut', wireColor: 'red', condition: { time: { at: 2 } } },
    { action: 'press', pushButtonName: 'PB', count: 4 },
    { action: 'turnOff', switchName: 'SB2' }
  ]
};
