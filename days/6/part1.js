const data = require('fs').readFileSync(__dirname + '/data.in').toString();

const result = data
    .split('\n\n'
    ).map(group => 
        new Set(group
            .split('\n')
            .reduce((a, b) => 
                a.concat([...b]), [])
        ).size)
    .reduce((a, b) => a + b);  

console.log(result);