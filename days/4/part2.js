const data = require('fs').readFileSync(__dirname + '/data.in').toString();

const required_keys_functions = {
    byr: value => value >= 1920 && value <= 2002, 
    iyr: value => value >= 2010 && value <= 2020, 
    eyr: value => value >= 2020 && value <= 2030, 
    hgt: value => {
        const number = Number(value.match(/\d+/)[0])
        if(value.match(/\d+cm/)){
            return number >= 150 && number <= 193
        }
        if(value.match(/\d+in/)){
            return number >= 59 && number <= 76
        }
        return false;
    }, 
    hcl: value => value.match(/\#([a-f0-9]){6}/), 
    ecl: value => ['amb','blu','brn','gry','grn','hzl','oth'].includes(value), 
    pid: value => value.length == 9 && value.match(/\d{9}/),
    cid: value => true
}

const required_keys = Object.keys(required_keys_functions).filter(e => e !== 'cid');

var passports = data.split('\n\n').map(e => {
    return e.replace(/\n/g, ' ').split(' ').map(attribute => {
        const split = attribute.split(':');
        return {
            key: split[0],
            value: split[1]
        }
    })
})
.filter(e => required_keys.every(k => e.find(f => f.key == k)))
.filter(e =>  e.every(e => required_keys_functions[e.key](e.value)));


var result = passports.length;
console.log(result)