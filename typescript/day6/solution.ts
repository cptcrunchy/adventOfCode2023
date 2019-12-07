import { getPuzzle } from '../utils/readFile';
import { getGraph } from './getGraph';
import { alg , Graph }  from 'graphlib';

const file = getPuzzle("daySixPuzzle");
const graph: Graph = getGraph(file)

const countOrbits = (node: Graph): number => {
    return Object.values(alg.dijkstra(node, "COM")).reduce(
         (sum: number, {distance}) => sum + distance, 0
    )
}

const countOrbitTransfer = (node: Graph): number => {
    return alg.dijkstra(node, "YOU", null, node.nodeEdges.bind(node)).SAN.distance
}

const solution1 = countOrbits(graph)
solution1//?
const YOUSAN = 2// This is the sum of edges between YOU and the object YOU orbit and the object  between SANTA and the object SANTA orbits
const solution2 = countOrbitTransfer(graph) - YOUSAN
solution2//?
