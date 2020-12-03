const map = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

const TREE = '#'
const LENGTHS = {
    y: map.length,
    x: map[0].length
}

const directions = [
    {x:1,y:1},
    {x:3,y:1},
    {x:5,y:1},
    {x:7,y:1},
    {x:1,y:2},
]

function check_encounters(direction){
    let result = 0;

    for(var i = 0; i < map.length; i++){
        const row = map[i * direction.y];
        if(row && row[(i * direction.x) % LENGTHS.x] === TREE){
            result++;
        }
    }

    return result;
}

result = directions.map(check_encounters).reduce((a, b) => a * b);

console.log(result);