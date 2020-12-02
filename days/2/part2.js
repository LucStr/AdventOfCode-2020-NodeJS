const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

const result = data
    .map(e => {
        const match = e.match(/(\d+)-(\d+) ([a-z]): ([a-z]+)/);
        return {
            min: Number(match[1]),
            max: Number(match[2]),
            letter: match[3],
            password: [...match[4]]
        }
    })
    .filter(e => {
        return [e.min, e.max].filter(p => e.password[p - 1] === e.letter).length === 1
    }).length

console.log(result);