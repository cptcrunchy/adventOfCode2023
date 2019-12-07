import fs from 'fs';

export const getPuzzle = (fileName: string): string => fs.readFileSync("./data/" + fileName + ".txt", 'utf8');