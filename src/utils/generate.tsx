import { instructionData } from "../logic/instructionData";

export function generateCode(): number {
  const codes = Object.keys(instructionData).map(Number); // Get an array of the codes as numbers
  const randomIndex = Math.floor(Math.random() * codes.length); // Randomly select an index
  return codes[randomIndex]; // Return the code at that index
}
