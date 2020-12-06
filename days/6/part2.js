const data = require('fs').readFileSync(__dirname + '/data.in').toString();

const result = data
    .split('\n\n'
    ).map(group => {
        const people = group
            .split('\n');
        return [...people[0]].filter(e => people.every(p => p.includes(e))).length;
    })
    .reduce((a, b) => a + b);  

console.log(result);