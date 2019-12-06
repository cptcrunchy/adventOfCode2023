enum Modes {
	POSITION
}

export const getValue = (program: number[], params: number[], pointer: number,	index: number,) => {
	return program[ params[index] === Modes.POSITION
		? program[pointer + index + 1]
		: pointer + index + 1
	]
}