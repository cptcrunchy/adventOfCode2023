import fs from 'fs';
import { parse } from './parse'
import { getCoordinates, directionInstructions } from './manhattan'

const file = fs.readFileSync('./data/dayThreePuzzle.txt','utf8');

const solution = (lines: string[]) => {
    const grid = new Map< string, Set<number> >()
    let wires = getCoordinates(lines)
    wires.forEach( (wire, idx) => {
        // Set the current starting position
        const currentPosition = { x: 0, y: 0 };
        wire.forEach( ({direction, distance}) => {
            const [prop, delta] = directionInstructions[direction];
            for(let i = 0; i < distance; i++){
                currentPosition[prop] += delta;
                const key = [currentPosition.x, currentPosition.y].join(",");
    
                if(!grid.has(key)){
                    grid.set(key, new Set([idx]))
                }else if(!grid.get(key)!.has(idx)) {
                    grid.get(key)!.add(idx)
                }
            }
        })
    })

    return [...grid.keys()]
    .filter(key => grid.get(key)!.size === 2)
    .map( key => 
        key
        .split(',')
        .map(Number)
        .map(x => Math.abs(x))
        .reduce((a,b) => a + b)
    ).sort( (a,b) => a - b)[0]
}

solution(parse(file))//?