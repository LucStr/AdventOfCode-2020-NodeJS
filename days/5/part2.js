const { mainModule } = require('process');

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

let max = Math.max(...seats)

let map = new Array(max).fill(false);

seats.forEach(seat => {
    map[seat] = true;
})

let result = 0;

for(var i = 0; i < map.length; i++){
    if(map[i]){
        continue;
    }

    if(i > 0 && map[i - 1] && map[i + 1]){
        result = i;
        break;
    }    
}
    

console.log(result);