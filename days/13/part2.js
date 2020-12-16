let data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

let buses = data[1]
    .split(',')
    .map(Number)
    .map((e, i) => {
        return {
            bus: e,
            minute_offset: i
        }
    }).filter(e => e.bus)

let time = buses[0].bus;
let increase = buses[0].bus;

for(var i = 1; i < buses.length; i++){
    const {bus, minute_offset} = buses[i];
    
    while((time + minute_offset) % bus !== 0){
        time += increase;
    }

    increase *= bus;
}

console.log(time);