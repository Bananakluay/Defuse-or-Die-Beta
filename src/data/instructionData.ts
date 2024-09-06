import { Instruction } from "../logic/Instruction";

export const instructionData: Record<number, Instruction[]> = {
  1: [
    { action: 'press', pushButtonName: 'push_button' }
  ],
  3: [
    { action: 'pull', eCompName: 'com_capacitor1' }
  ],
  4: [
    { action: 'keyPress', keyNum: '1' },
    { action: 'keyPress', keyNum: '0' },
    { action: 'keyPress', keyNum: '1' },
    { action: 'turnOn', switchName: 'swtich_button_2', condition: { time: { type: 'at', value: 1 } } }
  ],
  6: [
    { action: 'pull', eCompName: 'com_resister2' }
  ],
  9: [
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'press', pushButtonName: 'push_button' }
  ],
  25: [
    { action: 'pull', fuseName: 'fuse_2' },
    { action: 'press', pushButtonName: 'push_button', condition: { time: { type: 'withIn', value: 9 } } }
  ],
  37: [
    { action: 'cut', wireColor: 'red' },
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'turnOn', switchName: 'swtich_button_1' }
  ],
  46: [
    { action: 'pull', batteryName: 'battery_1' },
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'press', pushButtonName: 'push_button' }
  ],
  59: [
    { action: 'pull', eCompName: 'com_transistor_brown' },
    { action: 'keyPress', keyNum: '1' },
    { action: 'keyPress', keyNum: '9' },
    { action: 'keyPress', keyNum: '1' },
    { action: 'turnOff', switchName: 'swtich_button_2', condition: { time: { type: 'at', value: 0 } } }
  ],
  78: [
    { action: 'keyPress', keyNum: '0' },
    { action: 'keyPress', keyNum: '1' },
    { action: 'keyPress', keyNum: '0' },
    { action: 'keyPress', keyNum: '6' },
    { action: 'press', pushButtonName: 'push_button' }
  ],
  93: [
    { action: 'pull', eCompName: 'com_transistor_blue' },
    { action: 'press', pushButtonName: 'push_button', condition: { time: { type: 'withIn', value: 8 } } }
  ],
  112: [
    { action: 'pull', eCompName: 'chip-main' },
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'cut', wireColor: 'yellow' }
  ],
  200: [// wrong
    { action: 'press', pushButtonName: 'push_button', },
    { action: 'press', pushButtonName: 'push_button', },
    { action: 'pull', eCompName: 'com_capacitor2', condition: { serial: { endsWith: 'A' } } },
    { action: 'keyPress', keyNum: '6', condition: { serial: { notEndsWith: 'A' } } },
    { action: 'keyPress', keyNum: '0' },
    { action: 'keyPress', keyNum: '9' },
    { action: 'turnOff', switchName: 'swtich_button_1' }
  ],
  375: [
    { action: 'pull', fuseName: 'fuse_3' },
    { action: 'cut', wireColor: 'blue', condition: { time: { type: 'withIn', value: 5 } } },
    { action: 'press', pushButtonName: 'push_button' }
  ],
  692: [
    { action: 'keyPress', keyNum: '2' },
    { action: 'keyPress', keyNum: '5' },
    { action: 'keyPress', keyNum: '4' },
    { action: 'keyPress', keyNum: '7' },
    { action: 'pull', eCompName: 'com_transistor_black' },
    { action: 'press', pushButtonName: 'push_button', condition: { time: { type: 'at', value: 8 } } }
  ],
  823: [
    { action: 'pull', eCompName: 'chip-small' },
    { action: 'keyPress', keyNum: '8' },
    { action: 'keyPress', keyNum: '8' },
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'turnOn', switchName: 'swtich_button_1' }
  ],
  1124: [
    { action: 'pull', batteryName: 'battery_2' },
    { action: 'cut', wireColor: 'pink', condition: { time: { type: 'at', value: 5 } } },
    { action: 'hold', pushButtonName: 'push_button', condition: { time: { type: 'at', value: 2 } } },
    { action: 'keyPress', keyNum: '4' },
    { action: 'keyPress', keyNum: '5' },
    { action: 'keyPress', keyNum: '9' },
    { action: 'turnOff', switchName: 'swtich_button_2' }
  ],
  3333: [
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'keyPress', keyNum: '5' },
    { action: 'keyPress', keyNum: '3' },
    { action: 'keyPress', keyNum: '2' },
    { action: 'keyPress', keyNum: '2' },
    { action: 'pull', fuseName: 'fuse_1', condition: { serial: { endsWith: 'B' } } },
    { action: 'turnOff', switchName: 'swtich_button_1', condition: { serial: { notEndsWith: 'B' } } },
    { action: 'cut', wireColor: 'green', condition: { time: { type: 'withIn', value: 4 } } },
    { action: 'press', pushButtonName: 'push_button' }
  ],
  5423: [
    { action: 'pull', eCompName: 'com_capacitor3' },
    { action: 'keyPress', keyNum: '2' },
    { action: 'keyPress', keyNum: '3' },
    { action: 'keyPress', keyNum: '4' },
    { action: 'keyPress', keyNum: '5' },
    { action: 'turnOn', switchName: 'swtich_button_1' },
    { action: 'cut', wireColor: 'yellow' },
    { action: 'press', pushButtonName: 'push_button' }
  ],
  6584: [
    { action: 'keyPress', keyNum: '2' },
    { action: 'keyPress', keyNum: '5' },
    { action: 'keyPress', keyNum: '8' },
    { action: 'keyPress', keyNum: '0' },
    { action: 'pull', eCompName: 'chip-big', condition: { time: { type: 'withIn', value: 5 } } },
    { action: 'keyPress', keyNum: '1' },
    { action: 'turnOff', switchName: 'swtich_button_1' },
    { action: 'press', pushButtonName: 'push_button', condition: { time: { type: 'at', value: 8 } } }
  ],
  8796: [
    { action: 'pull', eCompName: 'C1' },
    { action: 'press', pushButtonName: 'push_button' },
    { action: 'cut', wireColor: 'red', condition: { time: { type: 'at', value: 2 } } },
    { action: 'hold', pushButtonName: 'push_button', condition: { time: { type: 'at', value: 9 } } },
    { action: 'turnOff', switchName: 'swtich_button_2' }
  ]
};
