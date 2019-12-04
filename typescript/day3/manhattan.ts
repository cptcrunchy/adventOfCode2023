type Direction = "L" | "R" | "U" | "D";
const directionInstructions: Record<Direction, ["x" | "y", number]> = {
    // x , y
    L: ["x", -1],
    R: ["x", 1],
    U: ["y", 1],
    D: ["y", -1]
  
}

const getCoordinates = (lines: string[]) => {
  return lines
  .map( (line:string) => 
    line.split(",")
    .map( (wire: string) =>
     ({ direction: wire[0] as Direction, distance: Number(wire.slice(1)) })
    ))
}

export {getCoordinates, directionInstructions }