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

const updatePostion = (moon: Moon, axis: Axis) => moon[axis] += moon[axis + 3]
const calcPE = (moon: Moon) =>  Math.abs(moon[0]) + Math.abs(moon[1]) + Math.abs(moon[2])
const calcKE = (moon: Moon) =>  Math.abs(moon[3]) + Math.abs(moon[4]) + Math.abs(moon[5])

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

const calcTotE = (timeSteps: number) => {
    const satellites = rawInput("dayTwelvePuzzle")
    for(let timeCounter = 0; timeCounter < timeSteps; timeCounter++)
    {
        moonSteps(satellites)
    }
    return satellites.reduce( (total, m) =>  total + (calcPE(m) * calcKE(m)), 0)
}

calcTotE(1000)//?