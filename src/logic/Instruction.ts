import { instructionData } from '../data/instructionData.ts'

export type ActionType =
  'cut' |
  'press' |
  'hold' |
  'release' |
  'pull' |
  'turnOn' |
  'turnOff' |
  'keyPress';

export type TimeCondition = {
  type: 'withIn' | 'at';
  value: number;
}
export type Instruction = {
  action: ActionType;
  wireColor?: string;
  fuseName?: string;
  switchName?: string;
  eCompName?: string;
  pushButtonName?: string;
  keyNum?: string;
  condition?: {
    time: TimeCondition
    //other
  }
};

export const getInstructionsForCode = (code: number): Instruction[] => {
  return instructionData[code] || [];

};


