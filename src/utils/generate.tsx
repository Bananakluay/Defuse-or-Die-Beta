import { instructionData } from "../data/instructionData";

export function generateCode(): number {
  const codes = Object.keys(instructionData).map(Number); // Get an array of the codes as numbers
  const randomIndex = Math.floor(Math.random() * codes.length); // Randomly select an index
  return codes[randomIndex]; // Return the code at that index
}

export function generateSerialNumber(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Digits and uppercase letters

  // Helper function to generate two-character blocks
  function getRandomBlock() {
    let block = '';
    for (let i = 0; i < 2; i++) {
      block += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return block;
  }

  // Generate four blocks and join them with dashes
  const serialNumber = `${getRandomBlock()}-${getRandomBlock()}-${getRandomBlock()}-${getRandomBlock()}`;

  return serialNumber;
}
