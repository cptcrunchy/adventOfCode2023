import {sampleOne } from "./sample";
import puzzleInput from "./puzzle";

function partOne(schematic: string[]) {
	let result = 0;
	for (let i = 0; i < schematic.length; i++) {
		const lines = schematic[i].replace(/\./g, " ");
		for (const match of lines.matchAll(/\d+/g)) {
			for (let j = match.index; j <match.index + match[0].length; j++) {
				// find all the numbers adject to a symbol
				const adjacent = [
					(schematic[i - 1] ?? '')[j - 1] ?? '.',
					(schematic[i - 1] ?? '')[j] ?? '.',
					(schematic[i - 1] ?? '')[j + 1] ?? '.',
					(schematic[i] ?? '')[j - 1] ?? '.',
					(schematic[i] ?? '')[j] ?? '.',
					(schematic[i] ?? '')[j + 1] ?? '.',
					(schematic[i + 1] ?? '')[j - 1] ?? '.',
					(schematic[i + 1] ?? '')[j] ?? '.',
					(schematic[i + 1] ?? '')[j + 1] ?? '.'
				];
				if (adjacent.some(x => /[^0-9.]/.test(x))) {
					result += parseInt(match[0]);
					break;
				}
			}
		}
	}
	return result;
}

function partTwo(data: string[]) {

}

export const load = () => {
	const lines = puzzleInput.split('\n');
	const result = partOne(lines);
	// const result2 = partTwo(lines);
	console.log(result);
	//console.log(result2);

	return { result };
}

