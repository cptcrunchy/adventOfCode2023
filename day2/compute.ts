export const compute = (a: number[], opcode?: number, action?: number, immutable = true): number => {
    const arr = immutable ? [...a] : a;
	if (opcode !== undefined) arr[1] = opcode;

	if (action !== undefined) arr[2] = action;
	
	let i = 0;
	while (true) {
		const currentPosition = arr[i % arr.length];

		if (currentPosition === 99) break;
        
        // Add
		if (currentPosition === 1){
			arr[arr[(i + 3) % arr.length]] = arr[arr[(i + 1) % arr.length]] + arr[arr[(i + 2) % arr.length]];
        }

        // Multiply
		if (currentPosition === 2) {
            arr[arr[(i + 3) % arr.length]] = arr[arr[(i + 1) % arr.length]] * arr[arr[(i + 2) % arr.length]];
        }

        // Step forward 4 positions
		i = (i + 4) % arr.length;
	}

	return arr[0];
}