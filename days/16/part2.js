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

const ranges = rules.map(e => e.ranges).reduce((a, b) => [...a, ...b]);

const ticket = data[1].split('\n')[1].split(',').map(Number);

const nearby_valid_tickets = data[2]
    .split('\n')
    .slice(1)
    .map(e => e
        .split(',')
        .map(Number)
    )
    .filter(values => values
        .find(value => ranges
            .every(range => range[0] > value || range[1] < value)
        ) === undefined
    );


let possible = ticket.map((e, i) => {
    let values = nearby_valid_tickets.map(a => a[i]);

    let possibilities = rules.filter(rule => {
        return values.every(value => {            
            return rule.ranges.find(range => range[0] <= value && range[1] >= value)
        })
    });

    if(possibilities.length == 0){
        console.log(rules.map(rule => {
            return values.filter(value => {            
                return !rule.ranges.find(range => range[0] <= value && range[1] >= value)
            })
        }));
    }

    return {possibilities, index: i};
});
 


while(true) {
    let found = possible.find(e => e.possibilities.length === 1);

    if(!found){
        break;
    }

    let rule = found.possibilities[0];

    rule.index = found.index;
    
    possible = possible.filter(e => e != found);
    
    possible.forEach(e => {
        e.possibilities = e.possibilities.filter(e => e != rule);
    });
} 

let result = rules.filter(e => e.name.startsWith("departure")).map(e => ticket[e.index]).reduce((a, b) => a * b);

console.log(result)
