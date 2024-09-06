import { instructionData } from './instructionData.ts'

export type ActionType = 'cut' | 'press' | 'hold' | 'release' | 'pull' | 'turnOn' | 'turnOff';

export type TimeCondition = {
  type: 'before' | 'after' | 'at';
  value: number;
}
export type Instruction = {
  action: ActionType;
  wireColor?: string;
  fuseName?: string;
  switchName?: string;
  eCompName?: string;
  pushButtonName?: string;
  condition?: {
    time: TimeCondition
    //other
  }
};

export const getInstructionsForCode = (code: number): Instruction[] => {
  return instructionData[code] || [];

};


