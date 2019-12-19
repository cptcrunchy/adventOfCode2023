import { readFileSync } from 'fs'
import  { getPuzzle } from '../utils/index'

const rawInput = getPuzzle(readFileSync, "dayFourteenPuzzle")
const testInput = getPuzzle(readFileSync, "test")

const parse = (rawInput: string) => {
    const chemicals = rawInput
    .split("\r\n")
    .map( (formula: string) => formula.split(" => ").reverse())
    .map(([chemical, sub]) => {
        const [chemQty, chemName] = chemical.split(" ")
        const substrates = sub
        .split(', ')
        .map( (substrate: string) => substrate.split(" ").reverse())
        .map( ([name, qty]) => [name, +qty])
        
        return [chemName, { chemAmount: +chemQty, substrates }]
    })

    return Object.fromEntries(chemicals)
}

const getReactionCount = (reaction: any, input: any) => {
    const sub = reaction.substrates
    let nestCount = 0
    
    if ( sub.length === 1 && sub[0][0] === "ORE")
        nestCount = 1
    else{
        nestCount = 1 + Math.max(...sub.map(([name]) => getReactionCount(input[name], input)))
    }
    return nestCount
}

const getReactionsAndMaxReactionChain = (inputs: any): (Map<number, string[]> | number)[] => {
    const depths: Map<number, string[]> = new Map()

    for(let key in inputs) {
        const depth = getReactionCount(inputs[key], inputs)
        const reactions = depths.get(depth)
        
        depths.set(depth, reactions === undefined ? [key] : [...reactions,key])
    }

    const maxDepth = Math.max(...depths.keys())

    return [depths, maxDepth]
}

const calculateOre = (chemicals: any, reactions: any, maxChain: any) => {
    let fuel = chemicals.FUEL

    
    for(let i = maxChain - 1; i > 0; i--){
               
        const fuelMaps = fuel.substrates
            .map( ([name, qty]) => {
                if(reactions.get(i)?.includes(name)){
                    return chemicals[name].substrates.map( ([n, q]) => {
                        let parentQty = chemicals[name].chemAmount
                        return [n, q * Math.ceil(qty / parentQty)]
                    })
                }
                return [[name, qty]]
            }).flat()
            
            
            const ores = new Array
            
            fuelMaps.forEach( (fuelMap: [string, number]) => {
                const [name, qty] = fuelMap
                const idx = ores.findIndex( (x: any) => x[0] === name)
            
                if( idx === -1){
                    ores.push(fuelMap)
                } else {
                    ores[idx][1] += qty
                }
            })       
        
        fuel.substrates = ores
    }

    return fuel.substrates.flat()[1]
}

const calcuateFuel = (chemicals: any, reactions: any) => (units: number) => {
    chemicals.FUEL.substrates = reactions.map( ([name, qty]) => [name, qty * units])
}

const getOreCount = (rawPuzzle: string) => {
    const chemicals = parse(rawPuzzle)
    const [reactions, maxChain] = getReactionsAndMaxReactionChain(chemicals)
    
   return calculateOre(chemicals, reactions, maxChain)

}

const getFuelCount = (rawPuzzle: string) => {
    const chemicals = parse(rawPuzzle)
    const substrates = chemicals.FUEL.substrates
    const [reactions, maxChain] = getReactionsAndMaxReactionChain(chemicals)

    const calcFuel = calcuateFuel(chemicals, substrates)

    let MAXORE = 1000000000000

    const perFuelUnit = calculateOre(chemicals, reactions, maxChain)
    
    let min = Math.floor(MAXORE / perFuelUnit)
    let max = 2 * min

    let i = 0

    let fuelUnits = 0
    while(true){
        
        fuelUnits = Math.round( (min + max) / 2)//?
        
        calcFuel(fuelUnits)
        const totalOre = calculateOre(chemicals, reactions, maxChain)

        if(totalOre === MAXORE) { return fuelUnits}

        calcFuel(fuelUnits + 1)
        const totalOrePlusOne = calculateOre(chemicals, reactions, maxChain)

        if(totalOre < MAXORE && totalOrePlusOne > MAXORE) { return fuelUnits}

        if(totalOre < MAXORE) {
            min = fuelUnits
        } else {
            max = fuelUnits
        }

        i++
    }

}

getOreCount(rawInput)//?
getFuelCount(rawInput)//?