let data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

const desired_timestamp = Number(data[0]);

const busses = data[1]
    .split(',')
    .map(Number)
    .filter(e => e)
    .map(e => {
        return {
            bus: e,
            time: e - (desired_timestamp % e)
        }
    }).sort((a, b) => a.time - b.time);

const result = busses[0].bus * busses[0].time;

console.log(busses, result);