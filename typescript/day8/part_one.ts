import { readFileSync } from 'fs';
import { getPuzzle } from '../utils/readFile';
import { parse } from '../utils/parse.function';

const sifCheckSum = (input: string) => {
    const chunk = 6 * 25
    const layers: number[][] = []
    const lines = parse(input, '')

    for( let i = 0; i < lines.length; i+= chunk){
        let line = lines.slice(i, i + chunk)
        layers.push(line)
    }

    const fewest0Line = layers.map( layer =>
        [layer, layer.filter(n => n === 0).length])
        .reduce( (acc, val) => (val[1] < acc[1] ? val : acc), [[], Infinity] as [number[], number])[0] as number[]

    const ones = fewest0Line.filter( (n: number) => n === 1).length
    const twos = fewest0Line.filter( (n: number) => n === 2).length

    return ones * twos
}

sifCheckSum(getPuzzle(readFileSync,"dayEightPuzzle"))//?