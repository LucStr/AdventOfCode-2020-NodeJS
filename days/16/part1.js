let data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n\n');

const rules = data[0].split('\n').map(rule => {
    let {name, first, second} = rule.match(/(?<name>.+?) (?<first>(\d+)-(\d+)) or (?<second>(\d+)-(\d+))/).groups;
    first = first.split('-').map(Number);
    second = second.split('-').map(Number);

    return {
        name,
        ranges: [first, second]
    }
});

const ticket = data[1].split('\n')[1].split(',').map(Number);

const nearby_tickets = data[2].split('\n').slice(1).map(e => e.split(',').map(Number));

const ranges = rules.map(e => e.ranges).reduce((a, b) => [...a, ...b]);

const all_values = nearby_tickets.reduce((a, b) => [...a, ...b]);

const invalid_values = all_values.filter(e => ranges.every(r => r[0] > e || r[1] < e));

const result = invalid_values.reduce((a, b) => a + b);

console.log(result);