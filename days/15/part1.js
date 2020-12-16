let data = require('fs').readFileSync(__dirname + '/data.in').toString().split(',').map(Number);

const numbers = {};

data.map((e, i) => {
    numbers[e] = i + 1;
});

let spoken = 0;

for(var i = data.length + 1; i < 2020; i++){
    if(!numbers[spoken]){
        numbers[spoken] = i
        spoken = 0;
    } else {
        let n = numbers[spoken];
        numbers[spoken] = i;
        spoken = i - n;
    }
}


console.log(spoken);

