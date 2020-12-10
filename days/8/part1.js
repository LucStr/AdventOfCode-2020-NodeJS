const data = require('fs').readFileSync(__dirname + '/data.in').toString().split('\n');

const program = data.map(e => {
    const split = e.split(' ');

    return {
        instruction: split[0],
        value: Number(split[1])
    }
});

let accumulator = 0;
let pointer = 0;

do {
    const line = program[pointer];
    line.executed = true;
    
    switch(line.instruction){
        case 'jmp':
            pointer += line.value;
            break;
        case 'acc':
            accumulator += line.value;
        case 'nop':
            pointer++;
            break;
        default:
            throw('INVALID INSTRUCTION: ' + line.instruction)
    }
} while(!program[pointer].executed)

const result = accumulator;

console.log(result);