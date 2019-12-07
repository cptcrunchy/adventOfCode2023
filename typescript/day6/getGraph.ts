import { Graph } from '@dagrejs/graphlib';

export const getGraph = (input: string) =>
    input
    .split("\n")
    .reduce( (node, edge) => 
        node.setEdge(...(edge.split(")") as [string, string]) ), new Graph())