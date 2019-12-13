import { matchesToArray } from 'dotless'
import { getPuzzle } from '../utils/readFile';
import { readFileSync } from 'fs';

/*
Io 10, 15, 7
Europa 15, 10, 0
Ganymede 20, 12, 3
Callisto 0, -3, 13
*/
type Moon = number[];

enum Axis {x,y,z,}

const regex = /<x=([-\d]*),\sy=([-\d]*),\sz=([-\d]*)>/g
const rawInput = (puzzleName: string) => matchesToArray(getPuzzle(readFileSync, puzzleName), regex, match => [+match[1], +match[2], +match[3], 0 , 0, 0] )

const applyGravity = (moonA: Moon, moonB: Moon, ax: Axis) => {
    
    let gravity;
        
    if(moonA[ax] > moonB[ax]){
        gravity = -1
    }else if(moonA[ax] === moonB[ax]) {
        gravity = 0
    }else {
        gravity = 1
    }

    moonA[ax + 3] += gravity
    moonB[ax + 3] += gravity * -1
} 

const atInitPosition = (moonA: Moon, moonB: Moon, ax: Axis) => moonA[ax] === moonB[ax] && moonA[ax + 3] === moonB[ax + 3]
const updatePostion = (moon: Moon, axis: Axis) => moon[axis] += moon[axis + 3]

function moonSteps(moons: number[][]){
    for(let i = 0; i < moons.length; i++){
        for(let j = i + 1; j < moons.length; j++){
            let moonA = moons[i]; let moonB = moons[j]
            
            applyGravity(moonA, moonB, Axis.x)
            applyGravity(moonA, moonB, Axis.y)
            applyGravity(moonA, moonB, Axis.z)
        }
    }

    for(let i = 0; i < moons.length; i++){
        let moon = moons[i]
        updatePostion(moon, Axis.x);
        updatePostion(moon, Axis.y);
        updatePostion(moon, Axis.z);
    }
}

const greatestCommonDivisor = (a: number, b: number): number => !b ? a : greatestCommonDivisor(b, a % b)

const leastCommonMultiple = (a: number, b: number): number => (a * b) / greatestCommonDivisor(a,b)

const getCountToInitPosition = () => {
    const satellites = rawInput("dayTwelvePuzzle")
    const initialPos = rawInput("dayTwelvePuzzle")
    const areAxesReset = [ false, false, false]
    const axisNotReached = (axis: number) => areAxesReset[axis] === false
    const axes = [0,1,2] as Axis[]
    const stepsToInitPosition = [0,0,0]

    while(axes.some(axisNotReached)) {
        moonSteps(satellites)
        for(const axis of axes.filter(axisNotReached)) {
            stepsToInitPosition[axis]++;
            areAxesReset[axis] = satellites.every( (moon, moonIdx) => atInitPosition(moon, initialPos[moonIdx], axis))
        }
    }
    
    return stepsToInitPosition.reduce(leastCommonMultiple)

}


console.log(getCountToInitPosition())