export const parse = (input: string, delimiter: string): number[] => {
	return input
		.split(delimiter)
		.filter(c => /^(\+|-)?[0-9]+/.test(c))
		.map(c => +c);
}