let jolts = require('fs')
    .readFileSync(__dirname + '/data.in')
    .toString()
    .split('\n')
    .map(Number)
    .sort((a, b) => b - a);

const jolts_max = jolts[0] + 3;

jolts.unshift(jolts_max);
jolts.push(0);

const length = new Array(jolts_max).fill(0);
length[jolts_max] = 1;

for(var i = 1; i < jolts.length; i++){
    jolts
        .filter(e => e > jolts[i] && e <= jolts[i] + 3)
        .forEach(jolt => {
            length[jolts[i]] += length[jolt];  
        });
}

var result = length[0]

console.log(result);