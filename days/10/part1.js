const jolts = require('fs')
    .readFileSync(__dirname + '/data.in')
    .toString()
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b);

const device_jolt = jolts[jolts.length - 1] + 3;

jolts.unshift(0);
jolts.push(device_jolt);

let differences = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
}

for(var i = 1; i < jolts.length; i++){
    differences[jolts[i] - jolts[i - 1]]++;
}


var result = differences[1] * differences[3]

console.log(differences, result);