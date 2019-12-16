import { readFileSync } from 'fs'
import { getPuzzle } from '../utils/readFile'
import { subtract } from 'ramda'

const rawInput = getPuzzle(readFileSync, "dayFourteenPuzzle")

const parse = (rawInput: string) =>
    rawInput
    .split("\r\n")
    .map( (formula: string) => formula.split(" => ").reverse())
    .map(([chemical, sub]) => {
        const [chemQty, chemName] = chemical.split(" ")
        const substrates = sub
                .split(', ')
                .map( (substrate: string) => substrate.split(" ").reverse())
                .map( ([name, qty]) => [name, +qty])

        return [ chemName, { chemAmount: +chemQty, substrates }]
    })




const calcDepth = (reaction: any, input: any) => {
    const sub = reaction.substrates
    let nestCount = 0
    
    if ( sub.length === 1 && sub[0][0] === "ORE")
        nestCount = 1
    else{
        nestCount = 1 + Math.max(...sub.map(([name]) => calcDepth(input[name], input)))
    }
    return nestCount
}



// chemicals.FUEL

const chemicals = Object.fromEntries(parse(rawInput))

const test = { MPGLV: { chemAmount: 8, substrates: [ [ 'TQGT', 11 ], [ 'NGFV', 9 ], [ 'QZBXB', 4 ] ] } }
calcDepth(chemicals.MPGLV, chemicals)

console.log(chemicals)