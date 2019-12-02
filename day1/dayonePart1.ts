import fs from 'fs';

const data: string = fs.readFileSync('./day1/dayoneInput.txt','utf8')
const fuelSum = data.split(/\r?\n/)
.map( (f:string) => Number(f))
.filter( f => f > 0)
.map( (fuel:number) => Math.floor(fuel / 3) - 2)
.reduce( (total:number, fuel:number) => total + fuel, 0);
console.log({fuelSum})