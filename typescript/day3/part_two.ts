import fs from 'fs';
import { parse } from './parse'
import { getCoordinates, directionInstructions } from './manhattan'

const file = fs.readFileSync('./data/dayThreePuzzle.txt','utf8');

const solution = (lines: string[]) => {
    const grid = new Map<string, Map<number, number> >()
    let wires = getCoordinates(lines)
    wires.forEach( (wire, idx) => {
        // Set the current starting position
        const currentPosition = { x: 0, y: 0 };
        // Init step counter
        let steps = 0;
        wire.forEach( ({direction, distance}) => {
            const [prop, delta] = directionInstructions[direction];
            for(let i = 0; i < distance; i++){
                steps++;
                currentPosition[prop] += delta;
                const key = [currentPosition.x, currentPosition.y].join(",");
    
                if(!grid.has(key)){
                    grid.set(key, new Map([[idx, steps]]))
                }else if(!grid.get(key)!.has(idx)) {
                    grid.get(key)!.set(idx, steps)
                }
            }
        })
    })

    return [...grid.keys()]
    .filter(key => grid.get(key)!.size === 2)
    .map( key => grid.get(key)!.get(0)! + grid.get(key)!.get(1)!)   
    .sort( (a,b) => a - b)[0]
}

solution(parse(file))//?