const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

const result = data
    .map(e => {
        const match = e.match(/(\d+)-(\d+) ([a-z]): ([a-z]+)/);
        return {
            min: Number(match[1]),
            max: Number(match[2]),
            letter: match[3],
            password: match[4]
        }
    })
    .filter(e => {
        const occurences = [...e.password].filter(p => p === e.letter).length;
        return occurences >= e.min && occurences <= e.max;
    }).length

console.log(result);