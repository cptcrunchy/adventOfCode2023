import fs from 'fs';
import { parse } from './parse';
import { compute } from './compute';

const file = fs.readFileSync('./data/dayTwoPuzzle.txt','utf8');
const data = parse(file)//?
const reader = compute(data, 12, 2, false);
console.log(reader)//?