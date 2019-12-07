import fs from 'fs';
import { last_ } from "@arrows/array"
import { parse } from '../day2/parse';
import { getValue } from './recompute';

enum OPCODES {
	ADD = 1,
	MULTIPLY,
	INPUT,
  OUTPUT,
  JUMP_IF_TRUE,
  JUMP_IF_FALSE,
  LESS_THAN,
  EQUALS,
	HALT = 99,
}
enum Instructions {
	ADD = 4,
	MULTIPLY = 4,
	INPUT = 2,
  OUTPUT = 2,
  JUMP_IF_TRUE = 3,
  JUMP_IF_FALSE = 3,
  LESS_THAN = 4,
  EQUALS = 4,
}

const file = fs.readFileSync('./data/dayFivePuzzle.txt','utf8');

const OBD = (source: string, inputs: number[]): number[] => {
    
    const program: number[] = parse(source);

    const outputs: number[] = [];

    let pointer: number = 0;

    while (true) {

        const init = String(program[pointer]).padStart(5, "0")
        const opcode = +init.substr(3)
        if (opcode === OPCODES.HALT) { break }
        

        const params = init.substr(0, 3).split("").reverse().map(Number)
        const dx1 = getValue(program, params, pointer, 0)
        const dx2 = getValue(program, params, pointer, 1)
        let shouldJump = true;
    
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
          case OPCODES.JUMP_IF_TRUE: {
              pointer = dx1 !== 0 ? dx2 : pointer
              shouldJump = dx1 === 0
              break
          }
          case OPCODES.JUMP_IF_FALSE: {
              pointer = dx1 === 0 ? dx2: pointer
              shouldJump = dx1 !== 0
              break
          }
          case OPCODES.LESS_THAN: {
              program[program[pointer + 3]] = dx1 < dx2 ? 1 : 0
              break
          }
          case OPCODES.EQUALS: {
              program[program[pointer + 3]] = dx1 === dx2 ? 1 : 0
              break
          }
        }

        if(shouldJump){
            pointer += Instructions[OPCODES[opcode]]
        }
    }

    return outputs
}

const partOne = last_(OBD(file, [1]))
partOne//?
const partTwo = last_(OBD(file, [5]))
partTwo//?
