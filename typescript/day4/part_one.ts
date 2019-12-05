import fs from 'fs'

const [START, END]: number[] = fs.readFileSync('./data/dayFourPuzzle.txt','utf8').split("-").map(Number);

const countValidPassword = (start: number, end: number): number[] =>{
    let validPasswords: number = 0;
    let validPasswords2: number = 0;

    for(let i = start; i <= end; i++){
        let password: number[] = i.toString().split('').map(Number);
        let chunks: number[] = [];
        let decrease = false;
        password.reduce( (prev: number, curr: number) => {
            (prev === curr) ? chunks[chunks.length - 1]++ : chunks.push(1)
            
            if(curr < prev) decrease = true

            return curr
        }, -1)
        
        if(!decrease){
            // Part One Solution
            if(chunks.some(chunk => chunk >= 2)) validPasswords++;
            // Part Two Solution
            if(chunks.some(chunk => chunk === 2)) validPasswords2++;
        }
    }
    return [validPasswords, validPasswords2];
}

countValidPassword(START, END)//?

