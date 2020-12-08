const data = require('fs').readFileSync(__dirname + '/data.in').toString();

const required_keys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

var passports = data.split('\n\n').map(e => {
    console.log(e.replace(/\n/g, ' ').split(' '))
    return e.replace(/\n/g, ' ').split(' ').map(attribute => {
        const split = attribute.split(':');
        return {
            key: split[0],
            value: split[1]
        }
    })
});

console.log(passports)

var result = passports.filter(e => required_keys.every(k => e.find(f => f.key == k))).length;
console.log(result)