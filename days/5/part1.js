const data = require('fs').readFileSync(__dirname + '\\data.in').toString().split('\n');

const CONVERSION = {
    'F': '0',
    'B': '1',
    'R': '1',
    'L': '0'
}

function getId(seat){
    return parseInt([...seat.trim()].map(f => CONVERSION[f]).join(''), 2)
}

let seats = 
    data.map(getId)

let result = Math.max(...seats)
    

console.log(result);