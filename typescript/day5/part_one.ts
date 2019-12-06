import fs from 'fs';
import { last_ } from "@arrows/array"
import { parse } from '../day2/parse';
import { getValue } from './recompute';

enum OPCODES {
	ADD = 1,
	MULTIPLY,
	INPUT,
	OUTPUT,
	HALT = 99,
}
enum Instructions {
	ADD = 4,
	MULTIPLY = 4,
	INPUT = 2,
	OUTPUT = 2,
}

const file = fs.readFileSync('./data/dayFivePuzzle.txt','utf8');

const OBD = (source: string, inputs: number[]): number[] => {
    
    const program: number[] = parse(source);

    const outputs: number[] = [];

    let pointer: number = 0;

    while (true) {

        const init = String(program[pointer]).padStart(5, "0")
        const opcode = +init.substr(3)
        if (opcode === OPCODES.HALT) break
        

        const params = init.substr(0, 3).split("").reverse().map(Number)
        const dx1 = getValue(program, params, pointer, 0)
        const dx2 = getValue(program, params, pointer, 1)
    
        switch (opcode) {
          case OPCODES.ADD: {
            program[program[pointer + 3]] = dx1 + dx2
            break
          }
          case OPCODES.MULTIPLY: {
            program[program[pointer + 3]] = dx1 * dx2
            break
          }
          case OPCODES.INPUT: {
            program[program[pointer + 1]] = inputs.shift()
            break
          }
          case OPCODES.OUTPUT: {
            outputs.push(dx1)
            break
          }
        }
          pointer += Instructions[OPCODES[opcode]]
      }

        return outputs
    }

const resultA = last_(OBD(file, [1]))
resultA//?
