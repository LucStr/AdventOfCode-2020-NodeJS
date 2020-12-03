const map = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

const TREE = '#'
const LENGTHS = {
    y: map.length,
    x: map[0].length
}

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

result = check_encounters({x:3,y:1});

console.log(result);