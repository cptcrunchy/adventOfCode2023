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

function partTwo(schematic: string[]) {
	let gearRatio = 0;
	const adjacentGears = [];
	const gears = [];
	for (let i = 0; i < schematic.length; i++) {
		const lines = schematic[i].replace(/\./g, " ");
		for (const match of lines.matchAll(/\*/g)) {
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
				const positions = [
					[i - 1, j - 1],
					[i - 1, j],
					[i - 1, j + 1],
					[i, j - 1],
					[i, j],
					[i, j + 1],
					[i + 1, j - 1],
					[i + 1, j],
					[i + 1, j + 1]
				];

				const gearLocations = [];
				for (let k = 0; k < adjacent.length; k++) {
					if ((/\d/.test(adjacent[k]) && (!/\d/.test(adjacent[k - 1] ?? "") || k % 3 == 0))) gearLocations.push(positions[k]);
				}
				if (gearLocations.length == 2) adjacentGears.push(...gearLocations);
			}
		}
	}
	for (const idx of adjacentGears) {
		const [i, j] = idx;
		const line = schematic[i];
		const partNumbers = ['','','',line[j], '','',''];
		if (/\d/.test(line[j - 1] ?? "")) partNumbers[2] = line[j - 1];
		if (partNumbers[2] != "" && /\d/.test(line[j - 2] ?? "")) partNumbers[1] = line[j - 2];
    if (partNumbers[1] != "" && /\d/.test(line[j - 3] ?? "")) partNumbers[0] = line[j - 3];
    if (/\d/.test(line[j + 1] ?? "")) partNumbers[4] = line[j + 1];
    if (partNumbers[4] != "" && /\d/.test(line[j + 2] ?? "")) partNumbers[5] = line[j + 2];
    if (partNumbers[5] != "" && /\d/.test(line[j + 3] ?? "")) partNumbers[6] = line[j + 3];
		gears.push(partNumbers.join(''));
	}
	gearRatio = gears.reduce((acc, cur, i, arr) => acc + (i % 2 == 0 ? parseInt(cur) * parseInt(arr[i + 1]) : 0), 0);
	return gearRatio;
}

export const load = () => {
	const lines = puzzleInput.split('\n');
	const result = partOne(lines);
	const result2 = partTwo(lines);
	//console.log(result);
	console.log(result2);

	return { result, result2 };
}

