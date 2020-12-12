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

const movement = {
    N: (number) => waypoint[0] += number,
    E: (number) => waypoint[1] += number,
    S: (number) => waypoint[2] += number,
    W: (number) => waypoint[3] += number,
    F: (number) => waypoint.forEach((multiplier, index) => {
        position.x += directions[index].x * multiplier * number;
        position.y += directions[index].y * multiplier * number;
    }),
    L: (number) => {
        for(var i = 0; i < number / 90; i++){
            waypoint.push(waypoint.shift());
        }
    },
    R: (number) => {
        for(var i = 0; i < number / 90; i++){
            waypoint.unshift(waypoint.pop());
        }
    }
}

const waypoint = [
    1,
    10,
    0,
    0
]

const position = {x: 0, y: 0};

instructions.forEach(({instruction, number}) => {
    movement[instruction](number);
    console.log(waypoint)
})

const result = Math.abs(position.x) + Math.abs(position.y)

console.log(result);