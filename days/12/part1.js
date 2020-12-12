const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

const instructions = data.map(e => [...e]).map(e => {
    let instruction = e[0];
    e.shift();

    return {
        instruction,
        number: Number(e.join(''))
    }
});

const directions = [
    {x: 0, y: 1},   //NORTH
    {x: 1, y: 0},   //EAST
    {x: 0, y: -1},  //SOUTH
    {x: -1, y: 0},  //WEST
];

let facing_index = 1; //EAST

const move = (position, steps, index) =>{
    position.x += directions[index].x * steps;
    position.y += directions[index].y * steps;
}

const movement = {
    N: (position, number) => move(position, number, 0),
    E: (position, number) => move(position, number, 1),
    S: (position, number) => move(position, number, 2),
    W: (position, number) => move(position, number, 3),
    F: (position, number) => move(position, number, facing_index),
    R: (position, number) => {
        facing_index = (directions.length + facing_index + number / 90) % directions.length;
    },
    L: (position, number) => {
        facing_index = (directions.length + facing_index - number / 90) % directions.length;
    }
}

const position = {x: 0, y: 0};

instructions.forEach(({instruction, number}) => {
    movement[instruction](position, number);
})

const result = Math.abs(position.x) + Math.abs(position.y)

console.log(result);