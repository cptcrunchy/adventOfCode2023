import {sampleOne } from "./sample";
import puzzleInput from "./puzzle";


function formatGames(games: string[]) {
	return games.map(game => {
		const data = game.split(': ');
		return {
			id: Number(data[0].match(/\d+/gms)),
			cubes: formatCubes(data[1])
		}
	})
}

function formatCubes(cubes: string) {
	// split each cube with '; ' and then replace green, red, blue with G, R, B then map to object with G, R, B as the keys and the values as the number of cubes

	const cubeArray = cubes.split('; ').map(cube => {
			const cubeObj = {
				G: 0,
				B: 0,
				R: 0
			}
		const cubeData = cube.split(', ');
		cubeData.forEach(cube => {

			const color = cube.match(/(green|red|blue)/g)?.toString().replace(/(green|red|blue)/g, (match) => {
				switch (match) {
				case 'green':
					return 'G';
				case 'red':
					return 'R';
				case 'blue':
					return 'B';
				default:
				}
			});
			const number = Number(cube.match(/\d+/gms));
			cubeObj[color] = number;
		});
		return cubeObj;
	});
	return cubeArray;
}

type Cube = {
	G: number,
	B: number,
	R: number
}
type Game = {
	id: number,
	cubes: Cube[]
}

function partOne(data: string[]) {
	const cubeLimits: Cube = {
		R: 12,
		G: 13,
		B: 14
	}
	const games = formatGames(data);
	// filter out games where the number of red, green, or blue cubes is greater than 12 red cubes, 13 green cubes, or 14 blue cubes
	const filteredGames: Game[] = [];
	games.forEach( (game: Game) => {
		const filteredCubes: boolean[] = [];
		game.cubes.map(cube => {
			filteredCubes.push((cube.R <= cubeLimits.R && cube.G <= cubeLimits.G && cube.B <= cubeLimits.B));
		});
		if (filteredCubes.every(cube => cube === true)) {
			filteredGames.push(game);
		}
	})
	
	let gamesTotal = 0;
	filteredGames.map(game => gamesTotal += game.id);
	return gamesTotal;
}

function partTwo(data: string[]) {
	const games = formatGames(data);
	let total: number = 0;
	games.forEach( (game: Game) => {
		const redMax = Math.max(...game.cubes.map(cube => cube.R));
		const greenMax = Math.max(...game.cubes.map(cube => cube.G));
		const blueMax = Math.max(...game.cubes.map(cube => cube.B));
		total += redMax * greenMax * blueMax;
	});
	return total;
}

export const load = () => {
	const lines = puzzleInput.split('\n');
	const result = partOne(lines);
	const result2 = partTwo(lines);
	console.log(result2);
	//console.log(result2);

	return { result, result2 };
}

