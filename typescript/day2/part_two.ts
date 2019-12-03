import fs from 'fs';
import { parse } from './parse';
import { compute } from './compute';

const file = fs.readFileSync('./day2/puzzle.txt','utf8');

const getAddress = (input: string) => {
    const arr = parse(input)
    let noun = 0;
    let verb = 0;
    
    while (true) {
        if (compute(arr, noun, verb) === 19690720) {
			break;
		}
        noun += 1;
        
		if (noun >= 99) {
			noun = 0;
			verb++;
		}
    }

    return 100 * noun + verb
}

getAddress(file)//?

