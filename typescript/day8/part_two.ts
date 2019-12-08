import { readFileSync } from 'fs';
import { getPuzzle } from '../utils/readFile';
import { parse } from '../utils/parse.function';


enum COLORS {
    BLACK,
    WHITE,
    TRANSPARENT,
}

const ascii = (n: number) => {
    switch (n) {
        case COLORS.BLACK:
            return ' ';
        case COLORS.WHITE:
            return '#';
        case COLORS.TRANSPARENT:
        default:
            return '_';
    }
}

const getImage = (input: string) => {
    const width = 25
    const height = 6
    const chunk = height * width
    const layers: number[][] = []
    const pixelLines: number[][] = []
    const lines = parse(input, '')

    for( let i = 0; i < lines.length; i+= chunk){
        let line = lines.slice(i, i + chunk)
        layers.push(line)
    }

    const mergedLayers = layers.slice(1).reduce( (a, v) => {
        for(let i = 0; i <= v.length; i++) {
            if (a[i] === COLORS.TRANSPARENT) {
				a[i] = v[i];
			}
        }
        return a
    },layers[0])

    for (let i = 0; i < mergedLayers.length; i += width) {
        let mergedPixel = mergedLayers.slice(i, i + width)
		pixelLines.push(mergedPixel);
    }
    
    return ('\n' + pixelLines.map( l => l.map(ascii).join('') + '\n').join(''))
                            
}

getImage(getPuzzle(readFileSync,"dayEightPuzzle"))//?