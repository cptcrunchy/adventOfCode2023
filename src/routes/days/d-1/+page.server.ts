import {sampleOne } from "./sample";
import puzzleInput from "./puzzle";


function partOneCalibrationValue(data: string[]) {
	return data
    .map(line => line.replace(/[^\d]/g, ''))
    .map(line => ~~(line[0] + [...line].pop()))
    .reduce((prev, curr) => prev + curr)
}

export const load = () => {
	const rows = puzzleInput.split('\n');
	const result = partOneCalibrationValue(rows);
	console.log(result);

	return { rows };
}

