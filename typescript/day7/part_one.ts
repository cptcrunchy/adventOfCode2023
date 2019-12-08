import { getPuzzle } from '../utils/readFile';
import { parse } from '../day2/parse';
import { Instruction } from '../utils/instruction.enum';
import { permutation } from '../utils/permutations.function';
import { readFileSync } from 'fs';

const PHASES = [0,1,2,3,4]

const ampCircuit = (inputs: number[], program: string) => {
    const p = parse(program);
    let signal = 0;
    for (let ip = 0; ip < p.length; ) {
      const [i, p1, p2, l] = p.slice(ip, ip + 4);

      const [spm, fpm] = i > 1100 ? [1, 1] :
                         i > 1000 ? [1, 0] :
                         i >  100 ? [0, 1] : [0, 0];
      const a = fpm ? p1 : p[p1];
      const b = spm ? p2 : p[p2];
      const opCode = i % 100;
    
        switch(opCode) {
            case Instruction.ADD: 
                p[l] = a + b
                ip = ip + 4
                break
            case Instruction.MUL:
                p[l] = a * b
                ip = ip + 4
                break
            case Instruction.IN:
                p[p1] = inputs.shift() as number
                ip = ip + 2
                break
            case Instruction.OUT:
                signal = a
                ip = ip + 2
                break
            case Instruction.JIT:
                ip = a !== 0 ? b : ip + 3
                break
            case Instruction.JIF:
                ip = a === 0 ? b : ip + 3;
                break
            case Instruction.LT:
                p[l] = a < b ? 1 : 0;
                ip = ip + 4;
                break
            case Instruction.EQ:
                p[l] = a === b ? 1 : 0;
                ip = ip + 4;
                break
            case Instruction.HALT:
            default:
                signal = 0
                break
        }
    }
    return signal;
}

const getHighestSignal = (data: string) => {
    const program = getPuzzle(readFileSync, data)
    const p = permutation(PHASES)

    return p.reduce( (acc, signal) => {
        const ampA = ampCircuit([signal[0], 0], program)
        const ampB = ampCircuit([signal[1], ampA], program)
        const ampC = ampCircuit([signal[2], ampB], program)
        const ampD = ampCircuit([signal[3], ampC], program)
        const ampE = ampCircuit([signal[4], ampD], program)
        return ampE > acc ? ampE : acc
    }, 0)
}

getHighestSignal("daySevenPuzzle")//?
