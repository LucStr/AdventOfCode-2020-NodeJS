const data = require('fs')
    .readFileSync(__dirname + '/data.in')
    .toString()
    .split('\n');

const numbers = data.map(Number);

const pair = numbers.map(a => {
    let result = numbers.map(b => {
        if(a + b > 2020){
            return;
        }

        c = numbers.find(c => a + b + c === 2020);
        if(c){
            return {a,b,c}
        }
    }).find(e => e);
    if(result){
        return result;
    }
}).find(e => e);

let result = pair.a * pair.b * pair.c;

console.log(result);