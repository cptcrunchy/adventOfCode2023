import fs from 'fs';
import { getGraph } from './getGraph';
import { alg , Graph }  from 'graphlib';

const file = fs.readFileSync('./data/daySixPuzzle.txt','utf8');
const graph: Graph = getGraph(file)

const countOrbits = (node: Graph): number => {
    return Object.values(alg.dijkstra(node, "COM")).reduce(
         (sum: number, {distance}) => sum + distance, 0
    )
}

const solution1 = countOrbits(graph)

solution1//?