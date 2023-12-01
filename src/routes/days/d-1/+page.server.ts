import {sampleOne, sampleTwo } from "./sample";
import puzzleInput from "./puzzle";


function partOneCalibrationValue(data: string[]) {
	return data
    .map(line => line.replace(/[^\d]/g, ''))
    .map(line => ~~(line[0] + [...line].pop()))
    .reduce((prev, curr) => prev + curr)
}

function partTwoCalibrationValue(data: string[]) {
	const numbersChart = /(\d|twone|sevenine|oneight|threeight|nineight|fiveight|eighthree|eightwo|one|two|three|four|five|six|seven|eight|nine)/gms
	return data.map(row => row.match(numbersChart))  
	.map(row => row.flatMap(v => (
		{ 'twone': [2, 1], 'sevenine': [7, 9], 'oneight': [1, 8],
			'threeight': [3, 8], 'nineight': [9, 8], 'fiveight': [5, 8],
			'eighthree': [8, 3], 'eightwo': [8, 2],
			one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
			'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
		}[v])))  
		.map(nums => +[nums[0], nums[nums.length - 1]].join(''))  
		.reduce((a, b) => a + b, 0)
}


export const load = () => {
	const rows = puzzleInput.split('\n');
	const result = partOneCalibrationValue(rows);
	const result2 = partTwoCalibrationValue(rows);
	console.log(result);
	console.log(result2);

	return { result, result2 };
}

