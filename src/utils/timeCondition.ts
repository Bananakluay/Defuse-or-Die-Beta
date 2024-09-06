import { TimeCondition } from '../logic/Instruction'
export function checkTimeCondition(startTime: number, timeLeft: number, value: number, type: TimeCondition["type"]) {

  switch (type) {
    case 'before':
      // Fail if the action was not completed before the time limit
      return timeLeft > startTime - value
    case 'after':
      // Fail if the action was completed too early (before waiting period is over)
      return startTime - timeLeft >= value
    case 'at':
      // Fail if the time is exactly at a specified point
      return timeLeft.toString().includes(value.toString())
    default:
      return true

  }
}



