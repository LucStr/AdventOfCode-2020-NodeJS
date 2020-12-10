const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n').map(Number);

let stash = data.slice(0, 25);

for(var i = 25; i < data.length; i++){
    const number = data[i];

    if(!stash.find(e => stash.find(f => e + f == number))){
        console.log(number);
        break;
    };
    stash.shift();
    stash.push(number);
}