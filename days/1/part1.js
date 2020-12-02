const data = require('fs')
    .readFileSync(__dirname + '/data.in')
    .toString()
    .split('\n');

const numbers = data.map(Number);

const pair = numbers.map(a => {
    return {
        a,
        b: numbers.find(b => b + a === 2020) 
    }
}).find(e => e.b);

let result = pair.a * pair.b;

console.log(result);